const data = require("./data");
const mongoose = require("mongoose");
const axios = require("axios");
/*
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));*/
const compareAndSaveResults = async dataObj => {
    try {
        await axios.post("/posts/", dataObj);
    } catch (err) {
        console.log(err)
    }
}

module.exports = compareAndSaveResults;
