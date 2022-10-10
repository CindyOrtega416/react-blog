const mongoose = require("mongoose");

const GenderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Gender", GenderSchema)