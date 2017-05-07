var Crawler = require("crawler");
var url = require('url');

var site_crawler = 'http://www.thuocbietduoc.com.vn/thuoc/drgsearch.aspx';

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
            console.log($('a', '#Tabl1').attr('href'));
        }
        done();
    }
});

// Queue just one URL, with default callback
c.queue('http://www.thuocbietduoc.com.vn/thuoc/drgsearch.aspx');

// Queue a list of URLs
// c.queue(['http://www.google.com/','http://www.yahoo.com']);
//
// // Queue URLs with custom callbacks & parameters
// c.queue([{
//     uri: 'http://parishackers.org/',
//     jQuery: false,
//
//     // The global callback won't be called
//     callback: function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Grabbed', res.body.length, 'bytes');
//         }
//         done();
//     }
// }]);


const cheerio = require("cheerio"),
      req     = require("tinyreq");

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

function get_link_thuoc(url, data, cb) {
    // 1. Create the request
    req(url, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body)
          , pageData = {}

        // 3. Extract the data
        Object.keys(data).forEach(k => {
            pageData[k] = $(data[k]).attr('href');
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}

let MAX_PAGE = 10;
let ITEM_PAGE = 20;
let starts = 0;
for (let i = 0; i < MAX_PAGE; i++) {
  var siteTemp = site_crawler;
  if(i > 0) {
    starts = i*20 + 1;
    siteTemp += '?start=' + starts;
  }
  console.log(siteTemp);
  get_link_thuoc(siteTemp,{                      
                      link: '#Tabl1 .textlink01_v'
                  }, (err, data) => {
                      console.log(i);
                      console.log(err || data);
                  }
  );
}
