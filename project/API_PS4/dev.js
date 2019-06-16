//ref : https://viblo.asia/p/tu-javascript-thuan-den-rxjs-phan-1-m68Z0OJzKkG
//https://viblo.asia/p/tu-javascript-thuan-den-rxjs-phan-2-Ljy5Vx2GZra

//ML and AI
// https://viblo.asia/p/dung-thu-xem-machine-learning-co-gi-ghe-gom-m68Z08jMZkG

function run() { 
    var width = 200 
    console.log(width)// 200 
}

try {
    run()
    console.log(width)
    console.log(express1)
} catch (e) {
    console.error(e.message) 
}

let greeting = "say Hi"
if (true) {
    let greeting = "say Hello instead"
    console.log(greeting) // "say Hello instead"
}
console.log(greeting) // "say Hi"

let msg = 'Tester'
let response = { msg }
console.log(response)

let obj = {id: 1, username: 'thanhnm', age: 30}
let { username, age } = obj
console.log(obj, username, age)

/**
 * Destructuring Assignments
 */
let domain = ['freetuts.net'];
let [main, sub = 'qa.freetuts.net'] = domain;
// Xem kết quả
console.log(main);
console.log(sub);

/**
 * Rest Parameters: khai báo một hàm với số lượng tham số không xác định
 */
// Khai báo hàm
let domainList = (main, sub, ...other) =>
{
    console.log("Main: " + main);
    console.log("Sub: " + sub, typeof sub);
    console.log("Other", typeof other);
    console.log(other);
}
// Gọi hàm
domainList('freetuts.net', 'facebook.com', 'google.com', 'zalo.com', 'iphone.com');

// Arrow function
const myObj = {
    name: 'Name1',
    method: function(){
        this.name = 'Name2'
        console.log('IN1:::', this)

        var changeName = function(newname) {
            this.name = newname
            console.log('OUT1:::', this); 
        }
        var changeName2 = newname => {
            this.name = newname
            console.log('OUT2:::', this); 
        }
        changeName('Name3')
        changeName2('Name5')
        console.log('IN2:::', this); 
    },
    setName(name) {
        this.name = name
    },
    show() {
        console.log(this.name);
        
    }
}
// myObj.method();
// myObj.show()
// myObj.setName('Name4')
// myObj.show()


// Async-await
//https://techblog.vn/callback-promise-async-await-hay-observable-cho-xu-ly-bat-dong-bo
function wait(ms) { 
    return new Promise(r => setTimeout(r, ms)) 
} 
// console.log( wait());
async function runner(err = false) { 
    console.log('sắp rồi...') 
    await wait(2007) 
    console.log('chờ tí...') 
    await wait(2012) 
    console.log('thêm chút nữa thôi...') 
    await wait(2016) 
    if (err) {
        throw new Error(2016) 
    }
    console.log('xong rồi đấy!')
}
async function mainRun() { 
    try { 
        await runner(err = true) 
        console.log('Done!') 
    } 
    catch (e) { 
        console.log(`có vấn đề tại ${ e }`) 
    } 
}
// const resM = mainRun()
// console.log(typeof resM);
// mainRun()



// Kết quả trả ra của hàm async luôn là một Promise 
// dù bạn có gọi await - có xử lý bất đồng bộ hay không. 
// Promise này sẽ ở trạng thái thành công với kết quả được trả ra với từ khóa return của hàm async, 
// hoặc trạng thái thất bại với kết quả được đẩy qua từ khóa throw trong hàm async.
async function testA(err = false) {
    if(err) throw new Error('2019')
    return 'AAA';  
}
// testA(true)
//     .then(data => { console.log('DATA - ', data) })
//     .catch(error => console.log('ERR - ', error.message))

// Observable

//Self-Executing Anonymous Functions : gop dinh nghia va goi ham
(() => console.log('123123'))()

function SoSanh(n) { 
    return function NhoHon10() { return n < 10; };
  }
  console.log(SoSanh(9)());
  console.log(SoSanh(10)());
  console.log(SoSanh(11)());
