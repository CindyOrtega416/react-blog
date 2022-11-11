const data = require("./data");
const mongoose = require("mongoose");
const axios = require("axios");
const {disconnect} = require("mongoose");

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

const compareAndSaveResults = async dataObj => {
    try {
        const Post = require('../models/Post')

        Post.find({}, function (err, postsList) {
            return postsList;
        })
            .then(postsList => {
                if (postsList == "") {
                    console.log(`A new data was created:\n${JSON.stringify(dataObj)}`);
                    const newPostArray = new Post(dataObj);
                    return newPostArray.save().catch(err => console.log(err))
                }
                const {hiddenId, posts} = dataObj;

                const dbId = postsList[0]._id;
                const dbHiddenId = postsList[0].hiddenId;
                const dbPosts = postsList[0].posts;

                let catchDifference = false;

                if (dbHiddenId !== hiddenId) {
                    catchDifference = true;
                } else {
                    dbPosts.forEach((post, i) => {
                        if (post != posts[i]) catchDifference = true
                    })
                }

                if (catchDifference) {
                    console.log("A new evidence was found, updating database...");
                    mongoose.set('useFindAndModify', false);
                    return Post.findOneAndUpdate({_id: dbId}, dataObj);
                }
                console.log("File is equal to page, no news to report");
            })
            .then(() => {
                mongoose.disconnect()
            })
            .catch(err => console.log(err))

    } catch (err) {
        console.log(err)
    }
}

module.exports = compareAndSaveResults;
