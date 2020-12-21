const puppeteer = require('puppeteer');
const download = require('image-downloader');
let DOMAIN = 'https://demo.tutorialzine.com/2009/09/simple-ajax-website-jquery';
let URL = DOMAIN + '/demo.html';

(async() => {
    try {
        const browser = await puppeteer.launch({headless: true});
        const version = await browser.version()
        console.log(version)
        const page = await browser.newPage();
        await page.goto(URL);

        // Mình sẽ click vào page 3. 
        // Sau đó chờ cho đến khi ảnh con mèo được load ra 
        // Lúc này ta mới dùng hàm evaluate để lấy được đường dẫn của ảnh
        await page.click('#navigation > li:nth-child(3) > a');
        await page.waitForSelector('div#pageContent img');

        const imgUrl = await page.evaluate(() => {
            return document.querySelector('div#pageContent img').getAttribute('src');
        });
        console.log(imgUrl);
        const options = {
            url: DOMAIN + '/' + imgUrl,
            dest: __dirname
        };
        const { filename, image } = await download.image(options);
        console.log(filename, image)
        
        await browser.close()
    } catch (error) {
        console.log("Catch : " + error);
    }
})();