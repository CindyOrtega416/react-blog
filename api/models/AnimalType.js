const mongoose = require("mongoose");

const AnimalTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AnimalType", AnimalTypeSchema)