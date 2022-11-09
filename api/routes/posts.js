const router = require('express').Router();
const Post = require('../models/Post');

//CREATE POST - BASED ON SCRAPED DATA
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    const findPost = await Post.findOne({hiddenId: req.body.hiddenId})

    try {
        if (findPost) {
            return res.status(400).json('Post already scraped')
        }
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

//GET ALL POSTS WITH FILTERS
router.get("/", async (req, res) => {
    const username = req.query.user || "";
    const category = req.query.category || "";
    const animalType = req.query.animalType || "";
    const gender = req.query.gender || "";
    const hair = req.query.hair || "";
    const eyes = req.query.eyes || "";
    const idCollar = req.query.idCollar || "";

    try {
        let posts;
        if (username) {
            posts = await Post.find({username})
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

        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;