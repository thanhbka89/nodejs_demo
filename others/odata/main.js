var http = require('http');
//var serviceRoot = 'http://services.odata.org/v4/TripPinServiceRW/';
var serviceRoot = 'http://services.odata.org/v4/(S(kfq44mj2cbpdi3j5s4tsylkd))/TripPinServiceRW/';
//getURL(serviceRoot + 'People');
//getURL(serviceRoot + "People('russellwhyte')"); //Requesting an individual resource
getURL(serviceRoot + 'People?$top=2 & $select=FirstName, LastName & $filter=Trips/any(d:d/Budget gt 3000)'); //Queries
function getURL(url) {
    var body = '';
    http.get(url, function (response) {
        response.on('data', function (chunk) {
            body+=chunk;
        });
        response.on('end', function () {
            console.log(body);
        });
    }).on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });
}
