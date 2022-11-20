const puppeteer = require("puppeteer");
const md5 = require('md5')
const {waitFor} = require("@testing-library/react");
const flatten = require("flat")


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


    try {
        function delay(time) {
            return new Promise(function (resolve) {
                setTimeout(resolve, time)
            });
        }

        let xhrCatcher = page.waitForResponse(r => r.request().url().includes('https://www.mediakitt.net/api/animal/all?case_status[]=2&status[]=1&species=1&sex=&adult=&page=1&limit=9') && r.request().method() != 'OPTIONS');
        await page.waitForSelector('#animal-modal-body-modal > p')

        await page.waitForTimeout(6000)
        await page.click('#b-animal-results > div > div > div > a')


        // console.log(xhrCatcher)
        // and now we wait for the AJAX response!
        let xhrResponse = await xhrCatcher;

        // now get the JSON payload
        let xhrPayload = await xhrResponse.json();
        //let response = JSON.stringify(xhrPayload)
        //console.log(xhrPayload.data.length)
        // dataObj = response

        /*    for (const [key, value] of Object.keys(xhrPayload.data['animals']['data'][0]['sterilized'])) {
                console.log(key, value)
            }*/
        let generalData = Object.entries(xhrPayload.data['animals']['data'])
        for (let i = 0; i < generalData.length; i++) {
            data[i] = generalData[i]
            img[i] = Object.values(xhrPayload.data['animals']['data'][i]['images'])[1]
            hash[i] = Object.values(xhrPayload.data['animals']['data'][i]['hash']).toString().replace(/,/g, '')
            fullname[i] = Object.values(xhrPayload.data['animals']['data'][i]['fullname']).toString().replace(/,/g, '')
            email[i] = Object.values(xhrPayload.data['animals']['data'][i]['email']).toString().replace(/,/g, '')
            name[i] = Object.values(xhrPayload.data['animals']['data'][i]['name']).toString().replace(/,/g, '')
            description[i] = Object.values(xhrPayload.data['animals']['data'][i]['description']).toString().replace(/,/g, '')
            sex[i] = Object.entries(xhrPayload.data['animals']['data'][i])[9][1]
            species[i] = Object.entries(xhrPayload.data['animals']['data'][i])[13][1]
            size[i] = Object.entries(xhrPayload.data['animals']['data'][i])[14][1]
            age[i] = Object.entries(xhrPayload.data['animals']['data'][i])[17][1]
            hair[i] = Object.entries(xhrPayload.data['animals']['data'][i])[19][1]
            has_collar[i] = Object.entries(xhrPayload.data['animals']['data'][i])[20][1]
            sterilized[i] = Object.entries(xhrPayload.data['animals']['data'][i])[22][1]
            city_name[i] = Object.values(xhrPayload.data['animals']['data'][i]['city_name']).toString().replace(/,/g, '')

            postsArr.push({
                img: img[i],
                hash: hash[i],
                fullname: fullname[i],
                email: email[i],
                name: name[i],
                description: description[i],
                sex: sex[i],
                species: species[i],
                size: size[i],
                age: age[i],
                hair: hair[i],
                has_collar: has_collar[i],
                sterilized: sterilized[i],
                city_name: city_name[i]
            })
            console.log(postsArr)
        }
        // console.log(Object.entries(xhrPayload.data['animals']['data'][0]))
        // console.log('xhrPayload', Object.entries(xhrPayload.data['animals']['data'][0]['images']));
        // const [a] = Object.values(dataObj.data.animals.data)

        //  console.log(postArr)


        /*
                for (let i = 0; i < posts.length; i++) {

                    const hashImg = posts[i].photo.toString()

                    const strHash = md5(hashImg)
                    posts[i].hiddenId = strHash

                }*/
        //console.log(posts)

        // Push al objects inside Post array into dataObj to have only objects
        /*   for (let i = 0; i < posts.length + 1; i++) {

               dataObj = Object.assign({}, posts, posts[i])
               // console.log(dataObj)
           }*/

    } catch
        (err) {
        console.log(err)
    }
    // console.log(posts)
    //await browser.close();
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
