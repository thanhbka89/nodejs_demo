console.log('Hello world!');
console.log('alo');
console.log('abc123');

//inherit 
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
Person.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
}

function Student(firstName, lastName) {
    Person.call(this, firstName, lastName);
}
Student.prototype = Object.create(Person.prototype); // hoặc có thể viết Student.prototype = new Person();
const john = new Student('John', 'Snow');
console.log(john);
console.log(john.getFullName());

let foo = 1
foo = 2 // Không thành vấn đề

const bar = 1
console.log(bar);
const obj = {
    name: 'foo'
}
//obj = { name: 'bar' } // Error: Assignment to constant variable.

// Nhưng bạn có thể...
obj.name = 'bar'
console.log(obj) // { name: 'bar' }

//array
const a = [1, 2, 3, 4, 5];
const b = a;
console.log(a === b); // true

const c = [...a];
console.log(a === c); // false 😃
console.log(a);
console.log(b);
console.log(c);
const d = [...a, 4]; //them phan tu vao mang
console.log(d);
const e = [...a, ...b]; //noi mang
console.log(e);

// if (true) {
//     let a1 = 10;
//     var a2 = 20;
// }
// console.log(a2); // in ra 20
// console.log(a1); // Lỗi: a is not defined

//Array includes
let a3 = ['not' , 'cuder' , 'is', 'awesome'];
//var existed = a3.indexOf('bad'); // kết quả sẽ là -1
let existed = a3.includes('is');
if(existed) {
  console.log('Found');
} else {
  console.log('Not found');
}

//Power
let x = 2;
let result = x ** 4;
console.log(result);