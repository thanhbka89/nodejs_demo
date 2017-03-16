
//function-scoped : var => Avoid 'var'
// var x = 3;
// function func(randomize) {
//     if (randomize) {
//         var x = Math.random(); // (A) scope: whole function
//         return x;
//     }
//     return x; // accesses the x from line A
// }
// console.log(func(false)); // undefined

//ES6 : block-scoped: const, let
let x = 3;
function func(randomize) {
    if (randomize) {
        let x = Math.random();
        return x;
    }
    return x;
}
console.log(func(false)) // 3

/*
* From IIFEs to blocks
*/

//ES5: if you wanted to restrict the scope of a variable tmp to a block:
// (function () {  // open IIFE
//     var tmp = 'thanhbka';
// }());  // close IIFE
//
// console.log(tmp); // ReferenceError

//ES6: you can simply use a block and a let declaration (or a const declaration):
// {  // open block
//     let tmp = 'thanhnm';
// }  // close block
//
// console.log(tmp); // ReferenceError

/**
 * From concatenating strings to template literals
 */

 //ES6: tring interpolation
function printCoord(x, y) {
    console.log(`(${x}, ${y})`);
}
printCoord('thanh', 'nguyen')

/**
 * From function expressions to arrow functions
 */

//In ES5, such callbacks are relatively verbose:
// var arr = [1, 2, 3];
// var squares = arr.map(function (x) { return x * x });

//In ES6, arrow functions are much more concise:
const arr = [1, 2, 3];
const squares = arr.map(x => x * x);
console.log(squares);

/**
 * Handling multiple return values
 */

//Multiple return values via arrays
//In ES5, you need an intermediate variable (matchObj in the example below), even if you are only interested in the groups:
// var matchObj =
//     /^(\d\d\d\d)-(\d\d)-(\d\d)$/
//     .exec('2999-12-31');
// var year = matchObj[1];
// var month = matchObj[2];
// var day = matchObj[3];

//In ES6, destructuring makes this code simpler:
const [, year, month, day] =
    /^(\d\d\d\d)-(\d\d)-(\d\d)$/
    .exec('2999-12-31');
console.log(year);

// Multiple return values via objects
//In ES5, even if you are only interested in the properties of an object, you still need an intermediate variable (propDesc in the example below):
// var obj = { foo: 123 };
// var propDesc = Object.getOwnPropertyDescriptor(obj, 'foo');
// var writable = propDesc.writable;
// var configurable = propDesc.configurable;
// console.log(writable, configurable); // true true

//In ES6, you can use destructuring:
const obj = { foo: 123 };
const {writable, configurable} =
    Object.getOwnPropertyDescriptor(obj, 'foo');
console.log(writable, configurable); // true true
//{writable, configurable} is an abbreviation for:{ writable: writable, configurable: configurable }

/**
 * From for to forEach() to for-of
 */
const arr1 = ['a', 'b', 'c'];
for (const elem of arr1) {
    console.log(elem);
}

//If you want both index and value of each array element, for-of has got you covered, too, via the new Array method entries() and destructuring:
for (const [index, elem] of arr1.entries()) {
    console.log(index + '. ' + elem);
}

/**
 * Handling parameter default values
 */
// //In ES5, you specify default values for parameters like this:
// function foo(x, y) {
//     x = x || 0;
//     y = y || 0;
//     ···
// }
// ES6 has nicer syntax:
//
// function foo(x=0, y=0) {
//     ···
// }

/**
 * Handling named parameters
 */
// In ES5, you can implement selectEntries() as follows:
//
// function selectEntries(options) {
//     var start = options.start || 0;
//     var end = options.end || -1;
//     var step = options.step || 1;
//     ···
// }
// In ES6, you can use destructuring in parameter definitions and the code becomes simpler:
//
// function selectEntries({ start=0, end=-1, step=1 }) {
//     ···
// }

// Making the parameter optional
//
// To make the parameter options optional in ES5, you’d add line A to the code:
// function selectEntries(options) {
//     options = options || {}; // (A)
//     var start = options.start || 0;
//     var end = options.end || -1;
//     var step = options.step || 1;
//     ···
// }
//
// In ES6 you can specify {} as a parameter default value:
// function selectEntries({ start=0, end=-1, step=1 } = {}) {
//     ···
// }

/**
 * From arguments to rest parameters
 */
// In ES5, if you want a function (or method) to accept an arbitrary number of arguments, you must use the special variable arguments:
// function logAllArguments() {
//     for (var i=0; i < arguments.length; i++) {
//         console.log(arguments[i]);
//     }
// }
//
// In ES6, you can declare a rest parameter (args in the example below) via the ... operator:
// function logAllArguments(...args) {
//     for (const arg of args) {
//         console.log(arg);
//     }
// }

/**
 * From function expressions in object literals to method definitions
 */

// In JavaScript, methods are properties whose values are functions.
//
// In ES5 object literals, methods are created like other properties. The property values are provided via function expressions.
// var obj = {
//     foo: function () {
//         ···
//     },
//     bar: function () {
//         this.foo();
//     }, // trailing comma is legal in ES5
// }
//
// ES6 has method definitions, special syntax for creating methods:
// const obj = {
//     foo() {
//         ···
//     },
//     bar() {
//         this.foo();
//     },
// }

/**
 * From constructors to classes
 */

 // ES6 classes are mostly just more convenient syntax for constructor functions.
 //
 // 4.13.1 Base classes
 //
 // In ES5, you implement constructor functions directly:
 //
 // function Person(name) {
 //     this.name = name;
 // }
 // Person.prototype.describe = function () {
 //     return 'Person called '+this.name;
 // };
 //
 // In ES6, classes provide slightly more convenient syntax for constructor functions:
 class Person {
     constructor(name) {
         this.name = name;
     }
     describe() {
         return 'Person called ' + this.name;
     }
 }

// 4.13.2 Derived classes
//
// Subclassing is complicated in ES5, especially referring to super-constructors and super-properties. This is the canonical way of creating a sub-constructor Employee of Person:
//
// function Employee(name, title) {
//     Person.call(this, name); // super(name)
//     this.title = title;
// }
// Employee.prototype = Object.create(Person.prototype);
// Employee.prototype.constructor = Employee;
// Employee.prototype.describe = function () {
//     return Person.prototype.describe.call(this) // super.describe()
//            + ' (' + this.title + ')';
// };

//ES6 has built-in support for subclassing, via the extends clause:
class Employee extends Person {
    constructor(name, title) {
        super(name);
        this.title = title;
    }
    describe() {
        return super.describe() + ' (' + this.title + ')';
    }
}

let emp = new Employee('thanhnm', 'username')
console.log(emp);
console.log(emp.describe());

/**
 * New string methods
 */
// The ECMAScript 6 standard library provides several new methods for strings.
//
// From indexOf to startsWith:
//
// if (str.indexOf('x') === 0) {} // ES5
// if (str.startsWith('x')) {} // ES6
// From indexOf to endsWith:
//
// function endsWith(str, suffix) { // ES5
//   var index = str.indexOf(suffix);
//   return index >= 0
//     && index === str.length-suffix.length;
// }
// str.endsWith(suffix); // ES6
// From indexOf to includes:
//
// if (str.indexOf('x') >= 0) {} // ES5
// if (str.includes('x')) {} // ES6
// From join to repeat (the ES5 way of repeating a string is more of a hack):
//
// new Array(3+1).join('#') // ES5
// '#'.repeat(3) // ES6

/**
 * New Array methods
 */
 // There are also several new Array methods in ES6.
 //
 // 4.17.1 From Array.prototype.indexOf to Array.prototype.findIndex
 //
 // The latter can be used to find NaN, which the former can’t detect:
 //
 // const arr = ['a', NaN];
 //
 // arr.indexOf(NaN); // -1
 // arr.findIndex(x => Number.isNaN(x)); // 1

// 4.17.2 From Array.prototype.slice() to Array.from() or the spread operator
//
// In ES5, Array.prototype.slice() was used to convert Array-like objects to Arrays. In ES6, you have Array.from():
//
// var arr1 = Array.prototype.slice.call(arguments); // ES5
// const arr2 = Array.from(arguments); // ES6
// If a value is iterable (as all Array-like DOM data structure are by now), you can also use the spread operator (...) to convert it to an Array:
//
// const arr1 = [...'abc'];
//     // ['a', 'b', 'c']
// const arr2 = [...new Set().add('a').add('b')];
//     // ['a', 'b']
// 4.17.3 From apply() to Array.prototype.fill()
//
// In ES5, you can use apply(), as a hack, to create in Array of arbitrary length that is filled with undefined:
//
// // Same as Array(undefined, undefined)
// var arr1 = Array.apply(null, new Array(2));
//     // [undefined, undefined]
// In ES6, fill() is a simpler alternative:
//
// const arr2 = new Array(2).fill(undefined);
//     // [undefined, undefined]
// fill() is even more convenient if you want to create an Array that is filled with an arbitrary value:
//
// // ES5
// var arr3 = Array.apply(null, new Array(2))
//     .map(function (x) { return 'x' });
//     // ['x', 'x']
//
// // ES6
// const arr4 = new Array(2).fill('x');// ['x', 'x']
