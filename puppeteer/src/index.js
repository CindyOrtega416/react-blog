const data = require("./data");
const {pageURL} = data;
const dotenv = require('dotenv');

const webscraping = require("./webscraping");
const compareAndSaveResults = require("./resultAnalysis");

dotenv.config();
webscraping(pageURL)
    .then(dataObj => {
        compareAndSaveResults(dataObj);
    })
    .catch(console.error);