const puppeteer = require("puppeteer");
const autoScroll = require("./utils/autoScroll");

const webscraping_2 = async () => {

    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false
        })
        const page = await browser.newPage()    // new page = new tab
        await page.goto('https://www.adopterosargentina.com/perros-en-adopcion')
        await page.setViewport({
            width: 1200,
            height: 800
        });

        await autoScroll(page)

        await browser.close()

    } catch (err) {
        console.log(err)
    }

}

webscraping_2()