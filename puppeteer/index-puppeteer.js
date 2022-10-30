const puppeteer = require("puppeteer");
const constants = require("constants");

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false
    })
    const page = await browser.newPage()    // new page = new tab
    await page.goto("https://www.arcanoecordoba.es/animales?especie=perros&estado=en-adopcion");

    /*    await page.type('#email', 'cindyortega416@gmail.com')
        await page.type('#pass', '')
        await page.click('button[class="_42ft _4jy0 _6lth _4jy6 _4jy1 selected _51sy"]')
    */
    // function that allow us to click
    /*    await page.click('a[id="btn-dogs"]')
        await page.click('a[id="btn-stage-anyone"]')
        await page.click('a[id="btn-sex-anyone"]')
    */
    //  await page.waitForSelector('.col-xs-12.col-sm-6.col-md-3.col-lg-4')

    /*    const titles = await page.evaluate(() => {
            let title_elements = document.querySelectorAll("span.text-primary");
            let title_array = Array.from(title_elements);
            return title_array.map(title => title.textContent)
        });
        console.log(titles)*/

    /*-------------------------------------*/
    /*
    
        const enlaces = await page.evaluate(() => {
            const elements = document.querySelectorAll('.col-xs-12.col-sm-6.col-md-3.col-lg-4 span i')
    
            const links = [];
            for (let element of elements) {
                links.push(element)
            }
            return links
        });
        console.log(enlaces)
    */

    /*-------------------------------------*/
    /*  const grabQuotes = await page.evaluate(() => {
          const quotes = document.querySelectorAll('div.col-xs-12.col-sm-6.col-md-3.col-lg-4')
          let quotesArr = []
          console.log(quotes)
          quotes.forEach((quoteTag) => {
              const quoteInfo = quoteTag.querySelector('#b-animal-results > div:nth-child(1) > div > div > h5 > span > i')
              /!*const actualQuote = quoteInfo[0]
              console.log(quoteTag)*!/
              quotesArr.push({quote: quoteInfo.innerText})
          })
  
          return quotesArr;
      })
      console.log(grabQuotes)*/

    /*-------------------------------------*/
    /*    await page.waitForTimeout(5000)

        // Intercept API response and pass mock data for Puppeteer
        /*    await page.setRequestInterception(true);
            page.on('request', request => {
                if (request.url() === constants.API) {
                    request.respond({
                        content: 'application/json',
                        headers: {"Access-Control-Allow-Origin": "*"},
                        body: JSON.stringify(constants.biddersMock)
                    });
                } else {
                    request.continue();
                }
            });*//*
    let titles = await page.evaluate(() => {
        let titlesList = document.querySelectorAll('div.animal-content h5');
        let titleArr = [];
        for (let i = 0; i < titlesList.length; i++) {
            titleArr[i] = {
                title: titlesList[i].innerText.trim()
            };
        }
        return titleArr;
    })
    console.log(titles)
    */
    /*  let descrip = await page.evaluate(() => {
          let titlesList = document.querySelectorAll('p.card-text');
          let descripArr = [];
          for (let i = 0; i < titlesList.length; i++) {
              descripArr[i] = {
                  title: titlesList[i].innerText.trim()
              };
          }
          return descripArr;
      })
      console.log(descrip)
  */
    /*-------------------------------------*/
    // let's just call them publicationHandle
    /*    const publicationsHandles = await page.$$('div#animals-results.container-fluid'); // classname of parent

        // loop thru all handles
        for (const publicationHandle of publicationsHandles) { //looping through each child
            try {
                // pass the single handle below
                const title = await page.evaluate(
                    el => el.querySelectorAll("div > div > div > h5 > span").textContent,
                    publicationHandle)

                // do whatever you want with the data
                console.log(title)
            } catch (err) {
                console.log(err)
            }

        }

        console.log(publicationsHandles)
    */
    /*-------------------------------------*/

    /*    const h5 = await page.evaluate(() =>
            Array.from(document
                .querySelectorAll("div.card-body h5.card-title span.text-muted i"))
                .map(partner => partner.innerText.trim()
                )
        )
        console.log(h5)
        // await browser.close();*/
})();