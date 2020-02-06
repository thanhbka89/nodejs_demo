const puppeteer = require('puppeteer')

// Scrape a dynamic website using Puppeteer

(async () => { // IEFE
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://12bit.vn')

  const results = await page.evaluate(() => {
    let items = document.querySelectorAll('.article__title a')
    let links = []
    items.forEach((item) => {
      links.push({
        title: item.innerText,
        url: item.getAttribute('href'),
      })
    })
    return links
  });

  console.log(results)
  // Do what you want with the `results`

  await browser.close()
})()