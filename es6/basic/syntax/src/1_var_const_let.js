/**
 * var ở trong javascript thì có lẽ ai cũng biết. var đứng đằng trước nhằm khai báo cho variable, tương tự với const và let.
 * Nếu giống nhau thế thì tại sao ES6 lại sinh ra thêm 2 thanh niên kia để làm gì. Có 2 điều cần lưu ý ở đây, thứ nhất, var là function scope, còn const và let là block scope.
 * function scope tức là miễn bạn khai báo biến ở trong một function, bạn có thể dùng nó ở bất cứ đâu trong function đó.
 */
function run() {
    var m = 100;
    console.log("you ran " + m + "meters");
    if (m > 20) {
        console.log(m + "meters !!");
    }
}
run();  //you ran 100 meters;
        //100meters !!
//console.log(m); //undefined

function run1() {
    if (100 > 20) {
        var m = 210;
        console.log(m + "meters !!");
    }
    console.log("you ran " + m + "meters");
}
run1();

/**
 * Tôi đã đảo thứ tự khai báo variable m đi một chút, nhưng function run() vẫn hoạt động êm ru, sao lại thế?
 * Bởi var là function scope, nên dù khai báo bên trong mệnh đề if nó vẫn được vô tư sử dụng bên ngoài, miễn là còn nằm trong function (không thể hư cấu hơn :D ).
 * Giải pháp ở đây chính là const và let (block scope). Tương tự với function scope, miễn là variable khai báo với const hoặc let,
 * ta sẽ dùng được nó tại bất cứ đâu bên trong { } (bên trong dấu đóng mở ngoặc)
 */

 function run2() {
     if (100 > 20) {
         let m = 100;
         console.log(m + "meters !!");
     }
     console.log("you ran " + m + "meters");
 }
 //run2();  //100meters !!
             //Reference error: m is not defined


//Lưu ý thứ 2: bạn có thể khai báo cùng 1 biến với từ khóa var bao nhiêu lần bạn thích.
//Nhưng với const và let, sẽ chỉ có 1 lần khai báo thôi, nếu không sẽ ăn lỗi ngay.
var m = 10;
var m = 20; //ok
let n = 10;
let n = 20; //báo lỗi n đã được defined trước đó
// tương tự với const


//2 lưu ý cũng chính là lợi ích trên đã giúp bạn quyết định dùng const, let thay cho var hay chưa. Nếu rồi, thì chắc hẳn bạn sẽ thắc mắc rốt cuộc const khác gì với let.
//const và let chỉ có một khác biết duy nhất, đó là các biến được khai báo với let có thể thay đổi được, còn với const thì không.
let a = 1;
a = 100; // ok
const b = 1;
b = 100 //error

//Nhưng lưu ý với const là một object. Ta hoàn toàn có thể thay đổi value của các property bên trong nó.
const pets = {
    dog: 'ursa',
    cat: 'ladygaga'
}
pets.dog = 'ron'; // ok
pets = 100; // error
pets = {1, 2, 3}; //error

console.log('ok');
