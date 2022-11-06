const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
const axios = require("axios");
const constants = require("constants");
const bcrypt = require("bcrypt");

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false
    })
    const page = await browser.newPage()    // new page = new tab
    await page.goto("http://www.patitasdeperros.com/en-adopcion")

    await page.click("a[id=btn-dogs]")
    await page.click("a[id=btn-stage-anyone]")
    await page.click("a[id=btn-sex-anyone]")

    //await page.waitForTimeout(5000)


    /*-------------------------------------*/
    /*  await page.waitForTimeout(5000)
      const grabQuotes = await page.evaluate(() => {
          const data = document.querySelectorAll('.col-xs-12 col-sm-6 col-md-3 col-lg-4')
          let dataArr = []
          data.forEach((quoteTag) => {
              const titleInfo = quoteTag.querySelectorAll(' span.text-primary, div.card-body i')
              const quoteInfo = quoteTag.querySelectorAll('p.card-text')
              dataArr.push({
                  title: titleInfo.innerText.trim(),
                  description: quoteInfo.innerText.trim()
              })
          })

          return dataArr;
      })
      console.log(grabQuotes)
  */
    /*-------------------------------------*/


    await page.waitForTimeout(5000)

    // await page.click('div.animal-list a')


    const title = await page.evaluate(async () => {
        let titlesList = document.querySelectorAll('div.card-body span.text-primary, div.card-body i');
        let descriptsList = document.querySelectorAll('div.card-body p.card-text');
        let titleArray = []

        const srcs = Array.from(    //get img src
            document.querySelectorAll('div.card a img.card-img-top'))
            .map((image) => image.getAttribute('src'))

        for (let i = 0; i < titlesList.length; i++) {

            titleArray.push({
                title: titlesList[i].innerText.trim(),
                category: "Adopcion",
                animalType: "Perro",
                description: descriptsList[i].innerText.trim(),
                photo: srcs[i],
                username: "Externo",
            })
        }

        return titleArray
    })


    let hashImgs = []

    for (let i = 0; i < title.length; i++) {

        const hashImg = title[i].photo.toString()

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(hashImg, salt);
        title[i].hiddenId = hashedPass
        /*hashImgs.push({
            hash: hashedPass,
        })*/

    }
    console.log(title)

    try {
        const res = await axios.post("/posts/puppeteer", title[0]);
        window.location.replace("/posts")
    } catch (err) {
        console.log(err)
    }
})();