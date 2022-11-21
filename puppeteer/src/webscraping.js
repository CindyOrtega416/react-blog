const puppeteer = require("puppeteer");

const pageXHRPerros = 'https://www.mediakitt.net/api/animal/all?case_status[]=2&status[]=1&species=1&sex=&adult=&page=1&limit=9'
const pageXHRGatos = 'https://www.mediakitt.net/api/animal/all?case_status[]=2&status[]=1&species=2&sex=&adult=&page=1&limit=9'

let postsArr = [];
let data = [];
let hash = [];
let fullname = [];
let email = [];
let name = [];
let description = []
let sex = [];
let species = [];
let size = [];
let age = [];
let hair = [];
let has_collar = [];
let sterilized = [];
let city_name = [];
let img = [];
let posts;

const webscraping = async pageURL => {

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false
    })
    const page = await browser.newPage()    // new page = new tab
    await page.goto(pageURL)

    try {

        await page.click("a[id=btn-dogs]")
        await page.click("a[id=btn-stage-anyone]")
        await page.click("a[id=btn-sex-anyone]")

        /*------Scraper function (for refactoring)--------*/
        const scraper = async pageXHR => {
            let xhrCatcher = page.waitForResponse(r => r.request().url().includes(pageXHR) && r.request().method() != 'OPTIONS');
            // await page.waitForSelector('#animal-modal-body-modal > p')

            await page.waitForTimeout(6000)
            // await page.click('#b-animal-results > div > div > div > a')
            // and now we wait for the AJAX response!
            let xhrResponse = await xhrCatcher;
            // now get the JSON payload
            let xhrPayload = await xhrResponse.json();

            //Extract and clean data from xhr
            let generalData = Object.entries(xhrPayload.data['animals']['data'])
            for (let i = 0; i < generalData.length; i++) {
                let dynamicXhrPayload = xhrPayload.data['animals']['data'][i]
                // they all share a same xhr path (dynamicXhrPayload and then some specific code
                img[i] = Object.values(dynamicXhrPayload['images'])[0]
                hash[i] = Object.values(dynamicXhrPayload['hash']).toString().replace(/,/g, '')
                fullname[i] = Object.values(dynamicXhrPayload['fullname']).toString().replace(/,/g, '')
                email[i] = Object.values(dynamicXhrPayload['email']).toString().replace(/,/g, '')
                name[i] = Object.values(dynamicXhrPayload['name']).toString().replace(/,/g, '')
                description[i] = Object.values(dynamicXhrPayload['description']).toString().replace(/,/g, '')
                sex[i] = Object.entries(dynamicXhrPayload)[9][1]
                species[i] = Object.entries(dynamicXhrPayload)[13][1]
                //size[i] = Object.entries(dynamicXhrPayload)[14][1]
                age[i] = Object.entries(dynamicXhrPayload)[17][1]
                hair[i] = Object.entries(dynamicXhrPayload)[19][1]
                has_collar[i] = Object.entries(dynamicXhrPayload)[20][1]
                sterilized[i] = Object.entries(dynamicXhrPayload)[22][1]
                city_name[i] = Object.values(dynamicXhrPayload['city_name']).toString().replace(/,/g, '')

                switch (sex[i]) {
                    case 1:
                        sex[i] = 'Hembra';
                        break;
                    case 2:
                        sex[i] = 'Macho';
                        break;
                    default:
                        sex[i] = ''
                }

                switch (species[i]) {
                    case 1:
                        species[i] = 'Perro';
                        break;
                    case 2:
                        species[i] = 'Gato';
                        break;
                    default:
                        species[i] = ''
                }

                switch (hair[i]) {
                    case 1:
                        hair[i] = 'Corto';
                        break;
                    case 2:
                        hair[i] = 'Mediano';
                        break;
                    case 3:
                        hair[i] = 'Largo';
                        break;
                    default:
                        hair[i] = ''
                }

                switch (has_collar[i]) {
                    case 0:
                        has_collar[i] = 'No';
                        break;
                    case 1:
                        has_collar[i] = 'Si';
                        break;
                    default:
                        has_collar[i] = ''
                }

                switch (sterilized[i]) {
                    case 1:
                        sterilized[i] = 'No castrado';
                        break;
                    case 2:
                        sterilized[i] = 'Castrado';
                        break;
                    default:
                        sterilized[i] = ''
                }

                postsArr.push({
                    username: 'Anonimo',
                    category: 'Adopcion',
                    photo: img[i],
                    hiddenId: hash[i],
                    //fullname: fullname[i],
                    email: email[i],
                    title: name[i],
                    description: description[i] + '\n' + 'Para adoptar comunicate con' + ' ' + fullname[i],
                    gender: sex[i],
                    animalType: species[i],
                    //size: size[i],
                    age: age[i] + ' ' + 'años',
                    hair: hair[i],
                    idCollar: has_collar[i],
                    sterilized: sterilized[i],
                    city_name: city_name[i]
                })
                // console.log(postsArr)


            }
        }

        await scraper(pageXHRPerros)

        await page.click("a[id=btn-reset]")
        await page.waitForTimeout(1000)
        await page.click("a[id=btn-cats]")
        await page.click("a[id=btn-stage-anyone]")
        await page.click("a[id=btn-sex-anyone]")
        await scraper(pageXHRGatos)


    } catch
        (err) {
        console.log(err)
    }
    // console.log(scraper())
    await browser.close()
    return postsArr;
}


module.exports = webscraping;

