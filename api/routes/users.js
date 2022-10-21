const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

//UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {  // si mi userId es = al userId del perfil que estoy viendo
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json('Solo puedes actualizar tu cuenta!')
    }

})

//DELETE
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {  // si mi userId es = al userId del perfil que estoy viendo
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("El usuario ha sido eliminado");
            } catch (err) {
                res.status(500).json(err)
            }
        } catch (err) {
            res.status(404).json("Usuario no encontrado");
        }

    } else {
        res.status(401).json('Solo puedes eliminar tu cuenta!')
    }

})

//GET USER -> acá hubo modificaciones para hacer el chat
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;