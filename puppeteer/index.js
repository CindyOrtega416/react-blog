const express = require('express');

const getData = require('./index-cheerio')

const app = express();

app.get('/api/data', async (req, res) => {
    const getData = await getData()
    res.json(getData)
})

const port = process.env.PORT || 4242;
app.listen(4242, () => {
    console.log(`Listening at http://localhost:${port}`)
})