// let cheerio = require('cheerio')
// let $ = cheerio.load('<h2 class="title">Hello world</h2>')
//
// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')
//
// console.log($.html())

// const tinyreq = require("tinyreq")
// tinyreq({
//     url: "https://vinclub.vn/"
//   , headers: {
//         "user-agent": "Crawler/1.0"
//     }
// }, (err, body) => {
//     console.log(err || body);
// });

const cheerio = require("cheerio"),
      req = require("tinyreq")

// Define the scrape function
function scrape(url, data, cb) {
    // 1. Create the request
    req(url, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body)
          , pageData = {}

        // 3. Extract the data
        Object.keys(data).forEach(k => {
            pageData[k] = $(data[k]).text();
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}

// Extract some data from my website
// scrape("http://ionicabizau.net", {
//     // Get the website title (from the top header)
//     title: ".header h1"
//     // ...and the description
//   , description: ".header h2"
// }, (err, data) => {
//     console.log(err || data);
// });

scrape("https://vinclub.vn", {
    // Get the website title (from the top header)
    title: "#header-page .slg",
    description: ".link-footer .head"
}, (err, data) => {
    console.log(err || data);
});
