const router = require('express').Router();
const Post = require('../models/Post');

//CREATE POST - BASED ON SCRAPED DATA
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})


//UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {   // if true, then is our post and we can update
            try {
                const updatedPosts = await Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    },
                    {new: true}
                );
                res.status(200).json(updatedPosts);

            } catch (err) {
                res.status(500).json(err);
            }

        } else {
            res.status(401).json('Solo puedes actualizar tus publicaciones!')
        }


    } catch (err) {
        res.status(500).json(err);
    }
})

//DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {   // if true, then is our post and we can update
            try {
                await post.delete()
                res.status(200).json("La publicación se ha eliminado");

            } catch (err) {
                res.status(500).json(err);
            }

        } else {
            res.status(401).json('Solo puedes eliminar tus publicaciones!')
        }


    } catch (err) {
        res.status(500).json(err);
    }

})

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err);
    }
})
 //Las queries no vendran desde este lado? '/:query'
//GET ALL POSTS WITH FILTERS
router.get('/', async (req, res) => {

    const username = req.query.user || "";
    //Toma el valor que haya seleccionado el usuario en el filtro (req.query.category)
    //O toma un valor vacío si el usuario no seleecionó nada
    const category = req.query.category || "";
    const animalType = req.query.animalType || "";
    const gender = req.query.gender || "";
    const hair = req.query.hair || "";
    const eyes = req.query.eyes || "";
    const idCollar = req.query.idCollar || "";

    const page = parseInt(req.query.page);
    const limit = 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

   // const PAGE_SIZE = 10;
    //const page = parseInt(req.query.page || "1") + 1;

    try {
        
        let posts;
        let total;        
    
        if (username) {
            posts = await Post.find({username})
            /*    .limit(PAGE_SIZE)
                .skip(PAGE_SIZE * page);*/
            //How many pages we have based on how many documents passed the filter
            total = await Post.countDocuments({username});
        } else if (category || animalType || gender || hair || eyes || idCollar) {

            const categoryFilter = category ? {category} : {};
            const animalTypeFilter = animalType ? {animalType} : {};
            const genderFilter = gender ? {gender} : {};
            const hairFilter = hair ? {hair} : {};
            const eyesFilter = eyes ? {eyes} : {};
            const idCollarFilter = idCollar ? {idCollar} : {};

            posts = await Post.find({
                ...categoryFilter,
                ...animalTypeFilter,
                ...genderFilter,
                ...hairFilter,
                ...eyesFilter,
                ...idCollarFilter
            })
             /*   .limit(PAGE_SIZE)
                .skip(PAGE_SIZE * page);*/
            total = await Post.countDocuments({
                ...categoryFilter,
                ...animalTypeFilter,
                ...genderFilter,
                ...hairFilter,
                ...eyesFilter,
                ...idCollarFilter
            });

        } else {
            posts = await Post.find()
             /*   .limit(PAGE_SIZE)
                .skip(PAGE_SIZE * page);*/
            total = await Post.countDocuments({})
        }

        results.resultPosts = posts.slice(startIndex, endIndex);

        results.page = page;

        if(startIndex > 0){
            results.previous = {
            page: page - 1
            };
        }
    
        if(endIndex < posts.length){
            results.next = {
               page: page + 1
               }   
           };

        res.status(200).json({
            results,
            totalPages: Math.ceil(total / limit)
        });

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;