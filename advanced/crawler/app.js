"use strict";

const request = require('request'),
    cheerio = require('cheerio'),
    models = require('./app/models'),
    parse = require('url-parse'),
    helpers = require('./app/helpers'),
    ThuocService = require('./app/services/thuoc.srv.js');

ThuocService.getAll();
console.log(helpers.slugify('thành đại ka'));
// models.sequelize.sync({
//     force: true
// }).then(
//     function(err) {
//         console.log('It worked!');
//     },
//     function(err) {
//         console.log('An error occurred while creating the table:', err);
//     }
// );


let site = 'http://www.thuocbietduoc.com.vn/thuoc/drgsearch.aspx';
get_link_thuoc(site, (err, data) => {
    //console.log(err || data);
    if (!err) {
        data.forEach((elem) => {
            //console.log(elem);
            get_detail_thuoc(elem.link, (err, result) => {
                if (!err) {
                    console.log(result);
                    //ThuocService.add(result);
                }
            });
        });
    }
});



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
