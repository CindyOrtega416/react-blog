const data = require("./utils/data");
const {pageURL} = data;

const webscraping = require("./webscraping");
const compareAndSaveResults = require("./resultAnalysis");
const webscraping_2 = require("./webscraping_2");

webscraping(pageURL)
    .then(postsArr => {
        compareAndSaveResults(postsArr);
    })

webscraping_2()
    .then(postsArr => {
        compareAndSaveResults(postsArr)
    })
    .catch(console.error);

