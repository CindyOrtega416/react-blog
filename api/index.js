const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require("./routes/categories");
const animalTypeRoute = require("./routes/animals");
const genderRoute = require("./routes/gender");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require('multer');
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json("Archivo subido con éxito")
})

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/category', categoryRoute);
app.use('/api/animalType', animalTypeRoute);
app.use('/api/gender', genderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);


app.listen('5000', () => {
    console.log("Backend is running");
})