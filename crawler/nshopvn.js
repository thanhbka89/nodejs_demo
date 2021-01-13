const puppeteer = require('puppeteer')

let electronicUrl = 'https://nshopvn.com/'
;(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(electronicUrl)

    let electronicData = await page.evaluate(() => {
      console.log(`url is ${location.href}`)
      let products = []
      let product_wrapper = document.querySelectorAll('li.product')
      console.log('selector:', product_wrapper)
      product_wrapper.forEach((product) => {
        let dataJson = {}
        try {
          dataJson.img = product.querySelector('.image > img').src
          dataJson.title = product.querySelector(
            '.woocommerce-loop-product__title'
          ).innerText
          dataJson.price = product.querySelector('.price').innerText
          console.log('json:', dataJson)
        } catch (err) {
          console.log(err)
        }
        products.push(dataJson)
      })
      return products
    })

    console.log('data:', electronicData)
    await browser.close()
  } catch (error) {
    console.log('Catch : ' + error)
  }
})()
