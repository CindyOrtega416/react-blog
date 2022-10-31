const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://www.mundocanino.com.ar/pages/perdencon.html'

async function getData() {
    const {data} = await axios.get(page_url)
    const $ = cheerio.load(data)
    const table = $('#\\38 28957834 > div > table > tbody')
    const names = [];
    table.find($('#doc-title > span')).each((i, element) => {
        const $row = $(element);
        const title = {}
        title.name = $row.find('TR').text().trim()
        console.log(title)
        names.push(title)
        /* const description = {}
         description.data = $row.find('div.animal-list p').text().trim()
         console.log(description)*/
    })

}

getData()