import request from 'request';
const URL = 'http://anythingjs123.com';

const getHTML = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (err, resp, body) => {
            if(err || resp.statusCode != 200) {
                reject(url + ' : Has error');
            }
            resolve(body);
        });
    });
}

console.log('run promise');
getHTML(URL).then(html => {
    console.log(html);
}).catch(err => {
    console.error('Err => ' + err);
});
console.log('end promise');

// Ba hàm này phải được thực hiện "cùng lúc"
// chứ không phải "lần lượt"
var sờ_trên = new Promise((resolve, reject) => {
    resolve("Phê trên");
});
var sờ_dưới = new Promise((resolve, reject) => {
    resolve("Phê dưới");
});
var sờ_tùm_lum = new Promise((resolve, reject) => {
    resolve("Phê tùm lum chỗ");
});

// Truyền 1 array chứa toàn bộ promise vào hàm Promise.all
// Hàm này trả ra 1 promise, tổng hợp kết quả của các promise đưa vào
Promise.all([sờ_trên, sờ_dưới, sờ_tùm_lum])
  .then(function(result) {
    console.log(result); // ["Phê trên", "Phê dưới", "Phê tùm lum chỗ"]
    // Phê xong làm gì ai biết
  })


//try catch trong promise
var promise = new Promise(function(resolve, reject){
    reject('Error!');
});

promise.then(function(message){
    console.log(message);
})
.catch(function(message){
    console.log(message);
});
