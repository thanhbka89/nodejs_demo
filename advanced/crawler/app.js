"use strict";

const request = require('request'),
    cheerio = require('cheerio'),
    Crawler = require('crawler'),
    models = require('./app/models'),
    parse = require('url-parse'),
    helpers = require('./app/helpers'),
    ThuocService = require('./app/services/thuoc.srv.js');

//ThuocService.getAll();
//console.log(helpers.slugify('thành đại ka'));

//Tao table
// models.sequelize.sync({force: true}).then(
//     function(err) {
//         console.log('It worked!');
//     },
//     function(err) {
//         console.log('An error occurred while creating the table:', err);
//     }
// );

let site = 'http://www.thuocbietduoc.com.vn/thuoc/drgsearch.aspx';

var c = new Crawler({
    maxConnections : 100,
    // This will be called for each crawled page
    callback : function (err, res, done) {
        if(err){
            console.log(err);
        }else{
            //console.log(res.options.uri);
            var $ = res.$; // $ is Cheerio by default
            let thuoc = {};
            thuoc = {
              title: $('#neo-center-drug h1.drugtitle').text().toString().replace(/[\n\t\r]/g, ''),
              descripion: $('#neo-center-drug span.textdetaildrg').text(),
              status: true
            }
            console.log(`${thuoc.title} ::: ${thuoc.status}`);
        }
        done();
    }
});

let MAX_PAGE = 10;
let ITEM_PAGE = 20;
let starts = 0;
for (let i = 0; i < MAX_PAGE; i++) {
  let siteTemp = site;
  if(i > 0) {
    starts = i*20 + 1;
    siteTemp += '?start=' + starts;
  }
  console.log(`${i} ) ${siteTemp}`);
  get_link_thuoc(siteTemp, (err, data) => {
      if (!err) {
          data.forEach((elem) => {
              // get_detail_thuoc(elem.link, (err, result) => {
              //     if (!err) {
              //         console.log(result);
              //         //ThuocService.add(result);
              //     }
              // });

              //Cach 2:
              console.log(elem.link);
              c.queue(elem.link);
          });
      }
  });
}

function get_link_thuoc(site, cb) {
    // 1. Create the request
    request(site, (err, response, body) => {
        if (err) {
            return cb(err);
        }

        // 2. Parse the HTML
        let $ = cheerio.load(body),
            metadata = {},
            parsedResults = [];
        let url = parse(site, true);

        //3. Extract data
        $('#Tabl1 h2 a.textlink01_v').each(function(i, element) {
            //console.log($(this).attr('href'));
            metadata = {
                link: $(this).attr('href').replace('..', url.origin),
                title: $(this).text().toString().replace(/[\n\t\r]/g, '')
            };
            parsedResults.push(metadata);
        });
        cb(null, parsedResults);
    });
}

function get_detail_thuoc(link, cb) {
    request(link, (err, response, body) => {
        if (err) {
            return cb(err);
        }

        // 2. Parse the HTML
        let $ = cheerio.load(body),
            metadata = {};

        //3. Extract data
        metadata = {
            title: $('h1.drugtitle').text().toString().replace(/[\n\t\r]/g, ''),
            descripion: $('span.textdetaildrg').text(),
            status: true
        };

        cb(null, metadata);
    });
}

console.log('END ...');
