const data = require("./utils/data");
const {pageURL} = data;
const cron = require("node-cron");

const webscraping = require("./webscraping");
const compareAndSaveResults = require("./resultAnalysis");
const webscraping_2 = require("./webscraping_2");

// cron executes this function explained below, every 24 hours
cron.schedule("0 0 * * *", function() {
    /* series of functions that take the data from webscraping and pass it to compareAndSaveResults.js 
    who evaluates if it posts the data or shows 'already scraped'*/
    webscraping(pageURL)
    .then(postsArr => {
        compareAndSaveResults(postsArr);
    })

    webscraping_2()
    .then(postsArr => {
        compareAndSaveResults(postsArr)
    })
    .catch(console.error);


})
