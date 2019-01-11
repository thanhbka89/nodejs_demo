//import * as myModule from './module_file.js';
var myModule = require("./module_file.js");

console.log(myModule.HELLO); // Hello Everybody
console.log(myModule.BYE); // Goodbye!

myModule.sayHello("Tom"); // Hello Tom

myModule.sayGoodbye("Tom"); // Goodbye Tom


// /*=========Array==========*/
// // let fruits = ["Acerola", "Apple", "Banana", "Breadfruit", "Carambola"];
// // for (var index = 0; index < fruits.length; index++) {
// //     console.log("Index: " + index + " Element value: " + fruits[index]);
// // }
// /*=========End Array==========*/

// /*========Loop==============*/
// console.log("While loop example");
// // Tạo một biến x và gán giá trị 2 cho nó.
// let x = 0;
// while (x < 1000) {
//     console.log("Value of x = ", x);
//     ++x;
// }
// // Dòng lệnh này nằm ngoài khối lệnh while.
// console.log("Finish while");

// console.log("For loop example");
// for (let i = 0; i < 10; i = i + 3) {
//     console.log("i= " + i);
// }
// console.log("Finish for");

// //for ...in : Lap property of object
// var myObject = {
//     name: "John",
//     age: 25,
//     gender: "Male",
//     greeting: function () {
//         return "Hello";
//     }
// };
// for (myProp in myObject) {
//     console.log(myProp);
// }

// //for...of : lặp trên một Collection (Tập hợp), chẳng hạn Map, Set
// var fruits = new Set(["Apple", "Banana", "Papaya", "Apple"]);
// for (let fruit of fruits) {
//     console.log(fruit);
// }
// /*========End Loop==============*/

// /*========Function==============*/
// function calculateTax(salary) {

//     if (salary >= 1000) {
//         // The function will end here
//         return salary * 20 / 100;
//     }
//     if (salary >= 500) {
//         // The function will end here
//         return salary * 10 / 100;
//     }
//     return 0;
// }

// let tax = calculateTax(2000);
// console.log("Salary: 2000, tax: " + tax);
// console.log(calculateTax());

// //Anonymous Function
// var f = function (name) {
//     return "Hello " + name;
// }
// // Call it.
// var value = f("Tom");
// console.log(value);
// // Create anonymous function and call immediately
// (function () {
//     var now = new Date();

//     console.log("Now is " + now);
// })();

// //Lambda (Arrow)
// var func = (a, b) => {
//     return a * b;
// }
// console.log(func(5, 6));

// /*========End Function==============*/

/*========Error==============*/
// console.log("Three");
// let myObj = {};
// console.log("Two");
// console.log("One");
// try {
//     //throw error
//     let myNumber = 100;
//     throw myNumber;
//     // Đối tương myObj không có phương thức showMe().
//     // Nhưng chúng ta gọi phương thức showMe().
//     // Và lỗi xẩy ra tại đây.
//     myObj.showMe(); // ==> Error!
//     // Code này sẽ bị bỏ qua
//     console.log("!!!");

// } catch (e) {
//     console.log("Catched error: " + e);
//     console.log("OK continue...");
// } finally {
//     // Khối finally luôn luôn được thực thi.
//     console.log("Code in finally block");
// }
// console.log("Let's go!");
/*========End Error==============*/

//ES6 Template String
let name = 'Lam Pham';
let greeting = `I'm "JavaScript Lover". ${name}`;
console.log(greeting);

//Rest và spread
const [first, second, ...others] = [1, 2, 3, 4, 5]
console.log(first, second, others)