const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
        title: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        animalType: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
        },
        hair: {
            type: String,
        },
        eyes: {
            type: String,
        },
        idCollar: {
            type: String,
        },
        idChip: {
            type: String,
        },
        description: {
            type: String,
        },
        phone: {
            type: String,
        },
        photo: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
        hiddenId: {
            type: String,
            unique: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema)