const functions = require("firebase-functions");
/*
const gcs = require('@google-cloud/storage')//() // means to execute this as a function
const os = require('os')    // node.js package - operating system specific functions
const path = require('path')
const spawn = require('child-process-promise').spawn    //for resizing (and useful for much more)
*/
const admin = require('firebase-admin')
const express = require('express')
const {use} = require("express/lib/router");
const {useState} = require("react");

const app = express()
admin.initializeApp({
    credential: admin.credential.cert('./credentials.json')
})
const db = admin.firestore()

/*app.get('/hello-world', (req, res)=> {
    return res.status(200).json({
        message: 'Hello world'
    })
})*/
/*
app.post('/api/products', async (req, res) => {
    try{
        await db.collection('products')
            .doc('/' + req.body.id + '/')
            .create({
                name: req.body.name
            })
        return res.status(200).json()
    }catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})*/

/*app.get('/api/products/:id', async (req, res) => {
    try {
       const doc = db.collection('products').doc(req.params.id)
       const item = await doc.get()    // doc.get trae tutti del documento

       // como de la bd me traes muchos datos, a mi me interesa solo la data. Así que pongo item.data()
       const response = item.data()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return  res.status(500).send(error)

    }
})*/
// https/firebase.adoptar.com/api/filter? activeCategory=adopcion
/*app.get('api/filter', async (req, res)=> {
/!*    //try{
        /!*let activeCategory = {}

        if(req.query.category) {
            activeCategory = {category: req.query.category}
        }*!/
        try{


            const response = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title
            }))

            return res.status(200).json(response)
        } catch(error) {
            console.log(error)
            return res.status(500).json()
        }*!/
})*/

exports.filter = functions.https.onRequest(async(req, res) =>{
//app.get('/api/filter', async (req, res) => {
    try{
        let querySnapshot
        let response = []

           const query = db.collection('blogs')
                .where('category', 'array-contains', req.query.category)
              /*  .where('gender', 'in', ['Hembra', 'Macho'])
                .where('type', '==', req.query.type)
                .where('hair', '!=', req.query.hair)*/
            querySnapshot = await query.get()
        //}

        querySnapshot.docs.forEach(doc => {
            response.push({
                id: doc.id,
                category: doc.data().category,
                type: doc.data().type,
                gender: doc.data().gender,
                title: doc.data().title
                //data: doc.data()
            })

           /* title: doc.data().title,
            category: doc.data().category,
            gender: doc.data().gender,
            type: doc.data().type,
            hair: doc.data().hair*/
        })

        let updatedList = response
        console.log("category", updatedList)

/*-------------------Animal type ----------------------*/
/*        updatedList?.filter((item) =>
            req.query.type ? req.query.type : item)*/


        if(req.query.type){
            updatedList = updatedList.filter(
                (item) => item.type.indexOf(req.query.type) >=0
            )
        }

/*-------------------Gender ----------------------*/

       if(req.query.gender){
            updatedList = updatedList.filter(
                (item) => item.gender.indexOf(req.query.gender) >=0
            )
        }
        /*updatedList?.filter((item) =>
            req.query.gender ? req.query.gender : item)*/

/*-------------------Hair Type ----------------------*/
       if(req.query.hair) {
            updatedList = updatedList.filter(
                (item) => item.hair.indexOf(req.query.hair) >= 0
            )
        }/*
        updatedList?.filter((item) =>
        req.query.hair ? req.query.hair : item)*/

/*-------------------Eyes Type ----------------------*/
        if(req.query.eyes) {
            updatedList = updatedList.filter(
                (item) => item.eyes.indexOf(req.query.eyes) >= 0
            )
        }

        /*
        updatedList?.filter((item) =>
            req.query.eyes ? req.query.eyes : item)
*/
/*-------------------Has collar ----------------------*/
 if(req.query.idCollar) {
            updatedList = updatedList.filter(
                (item) => item.idCollar.indexOf(req.query.idCollar) >= 0
            )
        }/*
        updatedList?.filter((item) =>
            req.query.idCollar ? req.query.idCollar : item)*/

        return res.status(200).json(updatedList)
    } catch(error) {
        console.log(error)
        return res.status(500).json()
    }
})
/*

app.delete('/api/products/:id', async (req, res) => {
    try{
        const document = db. collection('products').doc(req.params.id)
        await document.delete()
        return res.status(200).json()

    } catch(error) {
        return res.status(500).json()
    }
})

app.put('/api/products/:id', async(req, res)=> {
    try{
        const document = db.collection('products').doc(req.params.id)    // voy a buscar el id que coincida que
                                                                //viene de req.params.id
        await document.update({
            name:req.body.name  // es el body que me va a pasar el cliente. Por eso hago una req a ese body y busco especificamente el name
        })

        return res.status(200).json()
    }catch(error) {
        return res.status(500).json()
    }
})
*/

exports.app = functions.https.onRequest(app)

//onChange triggers the information whenever something changes
/*exports.onFileChange = functions.storage.object().onMetadataUpdate(event => {
    const object = event.data
    const bucket = object.bucket
    const contentType = object.contentType
    const filePath = object.name

    if(object.resourceState === 'not_exists') {
        console.log('We deleted a file, exist...')
        return
    }

    if(path.basename(filePath).startsWith('resized-')){
        console.log('We already renamed that file')
        return; // if true that means that the file changed, is the file I just renamed
        // so I don't want to trigger the function again
    }

    const destBucket = gcs.bucket(bucket)
    // where I'll temporally download it.

    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath)) // os.tmpdir = temporary path of the operat. system
    // join temporary path of... with filePath. However filePath is the full path and I just want to get the name
    // so I do with 'path' package and 'basename' method

    /!* In firebase cloud functions we have
    // a small temporary storage which will be cleaned up whenever the function's execution is done
     essentially, which you can use during the function execution*!/

    // Once I store my file, metadata will have an object that contains the original contentType, we'll keep it
    const metadata = { contentType: contentType }
    return destBucket.file(filePath).download({  // .file allows me to execute an operation on a file
        destination: tmpFilePath
        // In order to download I need to pass some configuration
            // destionation => tells me where I want to download it => tmpFilePath
                // tmpFilePath. I make sure that I download the file  from my bucket
                // into my temporary folder
    }) .then(() => {
            //resize image
        return spawn('convert', [tmpFilePath, '-resized', '-500x500', tmpFilePath]) //las tmpFile is where to store it
                                            // so we'll be overwriting the tmpFilePath with the image with a new size
        }).then(()=> {
        return destBucket.upload(tmpFilePath, {
            // rename it and re upload it
            destination: 'resized-' + path.basename(filePath),
            metadata: metadata  // defines the contentType which should be the same contentType as before
        })
    })

})*/

/*
exports.uploadFile = functions.https.onRequest((request, response)=> {
    response.status(200).json({
        message: 'It worked!'
    })
})*/
