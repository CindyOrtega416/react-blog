const puppeteer = require("puppeteer");
const md5 = require('md5')

const webscraping = async pageURL => {

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false
    })
    const page = await browser.newPage()    // new page = new tab
    await page.goto(pageURL)

    await page.click("a[id=btn-dogs]")
    await page.click("a[id=btn-stage-anyone]")
    await page.click("a[id=btn-sex-anyone]")

    await page.waitForTimeout(5000)
    let dataObj = {};
    let postArr = [];
    let posts;

    try {
        posts = await page.evaluate(async () => {
            let titlesList = document.querySelectorAll('div.card-body span.text-primary, div.card-body i');
            let descriptsList = document.querySelectorAll('div.card-body p.card-text');
            let postsArray = []

            const srcs = Array.from(    //get img src
                document.querySelectorAll('div.card a img.card-img-top'))
                .map((image) => image.getAttribute('src'))

            for (let i = 0; i < titlesList.length; i++) {

                postsArray.push({
                    title: titlesList[i].innerText.trim(),
                    category: "Adopcion",
                    animalType: "Perro",
                    description: descriptsList[i].innerText.trim(),
                    photo: srcs[i],
                    username: "Anonimo",
                })
            }

            return postsArray
        })


        for (let i = 0; i < posts.length; i++) {

            const hashImg = posts[i].photo.toString()

            const strHash = md5(hashImg)
            posts[i].hiddenId = strHash

        }
        //console.log(posts)

        // Push al objects inside Post array into dataObj to have only objects
        /*   for (let i = 0; i < posts.length + 1; i++) {

               dataObj = Object.assign({}, posts, posts[i])
               // console.log(dataObj)
           }*/

    } catch (err) {
        console.log(err)
    }
    console.log(posts)
    await browser.close();
    return posts;
}

module.exports = webscraping;


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
