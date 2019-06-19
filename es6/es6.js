// Ref: https://viblo.asia/p/es6-the-good-part-phan-1-L4x5xQ1mKBM

/**
 * var, const, let in ES6 (ES2015)
 * var: scope function -> dung trong function
 * let, const: scope block -> dung trong {} ma no dc khai bao
 */

let foo = 5
function printFoo(shouldDo) {
  if (shouldDo) {
    let foo = 2
    console.log('Value of foo in scope', foo) // 2
  }
  console.log('foo is out of block scope', foo) // 1
  return foo
}
console.log(printFoo(false)) // 1
console.log(printFoo(true)) // 1
console.log(foo);


// Khai bao thuoc tinh cho objetct 1 cach linh dong
const attr = 'foo'
const year = 2017
const obj = { [attr]: 1, ['now' + year]: 'wow' }
console.log(obj) // { foo: 1, now2017: 'wow' }

/**
 * Arrow function: anonymous function
 */
const numbers = [1, 3, 20, 40, 45, 70];
const result4 = numbers.filter(value => value > 40);
console.log(result4);
const result5 = numbers.map(() => 'everything');
console.log(result5);

const person = {
  age: 20,
  // increaseAge: function() {
  increaseAge: () => { // this o day khong phai la person, khi su dung arrow function
      console.log(this);
      this.age++;
  }
}
person.increaseAge(); // window
person.increaseAge();
console.log(person.age);

/**
 * Template string
 */
let tplStr = 'james'
const str1 = `This is my name ${tplStr}`;

/**
 * Phân rã biến – destructuring
 */
const user = { name: 'John', age: 21 } // object
const { name } = user
console.log(name) // 'John'

const arr = [1, 2, 3]  // mang
const [first, second] = arr
console.log(first, second) // 1, 2

const str = 'Hello' // string
const [first1, second1] = str
console.log(first1, second1) // 'H', 'e'

// function
function showInfor({firstName, lastName, age}) {
  return `Name: ${firstName} ${lastName} <br/> Age: ${age}`; 
}

const personf = {
  firstName: 'james',
  lastName: 'nguyen',
  age: 18
}
console.log(showInfor(personf))

/**
 * Rest
 */
const [first2, second2, ...others] = [1, 2, 3, 4, 5]
console.log(first2, second2, others)

/**
 * Spread : ket hop mang
 */
const arr1 = [3, 4, 5]
const newArr = [1, 2, ...arr1, 6]
console.log(newArr)

/**
 * For of : thực hiện loop với Array, Object, DOM nodes
 */
const currencies = ['Dong', 'USD', 'euro', 'yuan'];
console.log(currencies);
for (const value of currencies) {
    console.log(value);
}

// Class
class Foo {
    constructor(x) {
      this.x = x
    }

    get name() {
      console.log('GET X')
      return this.x
    }

    set name(newVal) {
      console.log('SET X')
      this.x = newVal
    }
  
    add(y) {
      return this.x + y
    }
  
    // Khai báo phương thức tĩnh (static method)
    static whoAmI() {
      return 'I am a Foo class'
    }
  }
  
  const f = new Foo(3)
  console.log(f.add(2)) // 5
  console.log(Foo.whoAmI()) // I am a Foo class
  console.log(f.name);
  f.name = 'Y'
  console.log(f.name);

  class Bar extends Foo {
    constructor(x, y) {
      // Gọi đến hàm dựng của lớp cha
      super(x)
      this.y = y
    }
  
    calculate() {
      return this.add(4) + this.y
    }
  }
  
  const f1 = new Bar(3, 4)
  console.log(f1.calculate()) // 11
  
  


