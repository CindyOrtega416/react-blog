const express = require('express');
const app = express();
const data = require("./utils/data");
const mongoose = require("mongoose");
const {disconnect} = require("mongoose");
const dotenv = require('dotenv')

const Post = require("../models/Post");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    })
    .then(console.log("Connected to MongoDB via Puppeteer"))
    .catch((err) => console.log(err));


const compareAndSaveResults = postsArr => {
    try {
        const Post = require("../models/Post")
        //console.log(postsArr)

        postsArr.forEach((value) => {
            //console.log('value', value)
            if (value.hiddenId) {
                Post.find({hiddenId: value.hiddenId}, function (err, newPost) { //buscar un hiddenId en la BD que sea = al hiddenId de la publicación que quiero postear en la BD
                    if (!err) {
                        if (newPost.length > 0) {   //Si encuentra un hiddenId con ese valor en la BD, me lo va a devolver y length > 0
                            console.log('Post already scraped')
                        } else if (newPost.length == 0) {    //Si no existe ese hiddenId en la BD el length = 0, entonces podemos postear
                            const newPost = new Post(value)
                            console.log(newPost)
                            return newPost.save().catch(err => console.log(err))
                        }
                    }
                })
            }

        })

        //dataObj = Object.assign({}, posts, posts[i])
        // console.log(dataObj)


        /*        const newPost = new Post(dataObj)
                return newPost.save().catch(err => console.log(err))
                console.log(dataObj.length)*/
    } catch (err) {
        console.log(err)
    }
}

module.exports = compareAndSaveResults;
