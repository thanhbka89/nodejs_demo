const puppeteer = require('puppeteer')

;(async () => {
  try {
    const URL = 'https://www.24h.com.vn/'
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    page.setViewport({ width: 1280, height: 720 })
    await page.goto(URL)

    const articles = await page.evaluate(() => {
      let titles = document.querySelectorAll('div.colLeft span.news-title a')
      let ar_title = []
      titles.forEach((item) => {
        ar_title.push({
          href: item.getAttribute('href').trim(),
          title: item.getAttribute('title').trim(),
        })
      })
      return ar_title
    })

    console.log(articles)
    // chứa danh sách những promise
    const promises = []
    for (let i = 0; i < articles.length; i++) {
      promises.push(await getTitle(articles[i].href, page, i))
    }

    async function getTitle(link, page, key) {
      await page.goto(URL + link, {
        // Set timeout cho page
        timeout: 3000000,
      })
      // Chờ 2s sau khi page được load để tránh overload
      await page.waitFor(2000)

      let title = await page.evaluate(() => {
        let header = document.querySelector('p.baiviet-sapo')
        if (header === null) {
          header = document.querySelector('div.imageTitle a')
        }
        return header.innerText
      })

      console.log('Page ID Spawned', key, title)
      return page
    }

    await browser.close()
  } catch (error) {
    console.log('Catch : ' + error)
  }
})()
