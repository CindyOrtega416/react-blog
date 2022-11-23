const puppeteer = require("puppeteer");
const autoScroll = require("./utils/autoScroll");
const md5 = require('md5')

let posts2;
let postsArr2 = [];
let commonContactInfo = [];
const webscraping_2 = async () => {

    try {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: false
        })
        const page = await browser.newPage()    // new page = new tab
        await page.goto('https://www.adopterosargentina.com/perros-en-adopcion')
        await page.setViewport({
            width: 1200,
            height: 800
        });
        //Muy bueno el autoscroll!
        //await autoScroll(page)
        // await page.waitForTimeout(8000)

        posts2 = await page.evaluate(async () => {
            let titlesList2 = document.querySelectorAll('div.card-body h5.card-title');
            let descriptsList2 = document.querySelectorAll('div.card-body p.card-text');
            let age2 = document.querySelectorAll('div.card-body h5.card-subtitle')
            let contactInfoAdopteros = document.querySelector('#footer > div.footer-top > div > div > div.col-lg-3.col-md-6.footer-contact > p')
            let postsArray2 = []

            const srcs2 = Array.from(    //get img src
                document.querySelectorAll('div.card img.card-img-top.img-fluid'))
                .map((image) => image.getAttribute('src'))

            for (let i = 0; i < titlesList2.length; i++) {

                commonContactInfo = contactInfoAdopteros.textContent.trim().split(/\s+/)

                //postsArray2.push(commonContactInfo)
                postsArray2.push({
                    title: titlesList2[i].innerText.trim(),
                    category: "Adopcion",
                    animalType: "Perro",
                    description: descriptsList2[i].innerText.trim(),
                    age: age2[i].innerText.trim(),
                    username: "Anonimo",
                    gender: descriptsList2[i].innerText.trim().includes('vacunada' || 'castrada' || 'desparacitada') ? "Hembra" : "Macho",
                    email: commonContactInfo[14],
                    city_name: commonContactInfo[0],
                    province: commonContactInfo[1] + ' ' + commonContactInfo[2],
                    country: commonContactInfo[3],
                    phone: commonContactInfo[10] + ' ' + commonContactInfo[11] + ' ' + commonContactInfo[12],
                    photo: `https://www.adopterosargentina.com/${srcs2[i]}`,
                })


            }
            return postsArray2
        })

        for (let i = 0; i < posts2.length; i++) {

            const hashId = posts2[i].photo.toString() + posts2[i].description.toString()

            const strHash = md5(hashId)
            posts2[i].hiddenId = strHash

        }

        console.log(posts2)

        await browser.close()
        return posts2;

    } catch (err) {
        console.log(err)
    }

}

webscraping_2()
//module.exports = webscraping_2;