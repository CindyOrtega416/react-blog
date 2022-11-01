const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://www.arcanoecordoba.es/animales?especie=perros&estado=en-adopcion'

async function getData() {
    /* const {data} = await axios.get(page_url)
     const $ = cheerio.load(data)
     let results = []
     const table = $('#wrapper > div > div > div.animals-list.col-12')
     table.find('div.col-md-4.col-6.col-sm-4').each((i, el) => {
         const labels = ['Description']
         const label = labels[i];
         results[label] = $(el).text().trim().split(/\r?\n/)
         results.push({
             img: $(el).find("img").attr("src"),
             name: $(el).find('div.animal-list h5').text().trim(),
             gender: results[label][0],
             age: results[label][1],
             category: results[label][2]
         })
     })
     console.log(results)*/
    const {data} = await axios.get(page_url)
    const $ = cheerio.load(data)
    const table = $('#wrapper > div > div > div.animals-list.col-12')
    let names = {};
    const title = {}
    let descriptString;
    let nameString;
    let imgString;
    table.find('div.col-md-4.col-6.col-sm-4').each((i, element) => {

            const $row = $(element);

            title.name = $row.find('div.animal-list h5').text().trim()
            const labels = ['Description']
            const labelsImg = ['img']
            nameString = title.name //saves the name to variable 'name'


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
                descriptString = title[label].toString().replace(/\s\s+/g, ' ')


            })
            $row.find('div.animal-list > a ').each(function (i, element) {
                const $col = $(element)
                const img = $col.find("img").attr("src")
                title.img = img //adds to object, attribute 'img' with title.img features
                imgString = img

                //console.log(title[img])
            })
            let concatString = descriptString.concat('\n' + nameString + '\n' + imgString)
            //TODO: shows all strings in a single string, find a way to show single string
            console.log(concatString)

            //names.data = title
            //  console.log(names.length)
            // console.log(names)
            //  console.log(title)

//replace(/\s\s+/g, ' ')
            /*const description = {} split(/\r?\n/)
            description.data = $row.find('div.animal-list p').text().trim()
            console.log(description)*/
        }
    )

}

getData()