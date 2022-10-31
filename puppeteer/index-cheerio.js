const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://www.arcanoecordoba.es/animales?especie=perros&estado=en-adopcion'

async function getData() {
    const {data} = await axios.get(page_url)
    const $ = cheerio.load(data)
    const table = $('#wrapper > div > div > div.animals-list.col-12')
    const names = [];
    const images = []
    table.find('div.col-md-4.col-6.col-sm-4').each((i, element) => {

        const $row = $(element);
        const title = {}
        title.name = $row.find('div.animal-list h5').text().trim()
        const labels = ['Description']
        const labelsImg = ['img']
        $row.find('div.animal-list p ').each((i, element) => {
            const $col = $(element)
            const label = labels[i];
            title[label] = $col.text().trim().split(/\r?\n/)
            const gender = title[label][0]
            const age = title[label][1].trim()
            const category = title[label][2].trim()
            title.gender = gender
            title.age = age
            title.category = category


        })
        $row.find('div.animal-list > a ').each(function (i, element) {
            const $col = $(element)
            const label = labels[i];
            title[label] = $col.text().trim().split(/\r?\n/)
            const img = $col.find("img").attr("src")
            title.img = img
            //console.log(title[img])
        })

        names.push(title)
        console.log(names)


        //replace(/\s\s+/g, ' ')
        /*const description = {} split(/\r?\n/)
        description.data = $row.find('div.animal-list p').text().trim()
        console.log(description)*/
    })

}

getData()