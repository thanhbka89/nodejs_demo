// https://pusher.com/tutorials/web-scraper-node

const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const url = 'https://www.reddit.com/r/news/'

puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
        return page.goto(url).then(function() {
            return page.content()
        })
    })
    .then(html => {
        const $ = cheerio.load(html)
        const newsHeadlines = []

        $('a[href*="/r/news/comments"] div > h3').each(function() {
            let link = 'https://www.reddit.com' + $(this).parent().parent().attr('href')
            newsHeadlines.push({
                title: $(this).text(),
                link
            })
        })

        console.log(newsHeadlines)
    })
    .catch(console.error)