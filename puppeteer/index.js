const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://www.arcanoecordoba.es/animales?especie=perros&estado=en-adopcion'

async function getData() {
    const {data} = await axios.get(page_url)
    const $ = cheerio.load(data)
    const table = $('#wrapper > div > div > div.animals-list.col-12')
    const posts = [];
    const body = table.find('div.col-md-4.col-6.col-sm-4').each((i, element) => {
        const $element = $(element);
        const title = {}
        title.name = $element.find('div.animal-list h5').text()
        console.log(title)
    })

}

getData()