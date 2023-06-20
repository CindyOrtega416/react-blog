const router = require("express").Router();
const Conversation = require("../models/Conversation");
const {Model} = require("mongoose");

//new conversation
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save()
        res.status(202).json(savedConversation)
    } catch (err) {
        res.status(500).json(err)
    }
})


//get conversations that include a certain user
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]},
        });
        res.status(202).json(conversation);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;