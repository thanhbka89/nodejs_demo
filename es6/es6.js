let foo = 1
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

// Khai bao thuoc tinh cho objetct 1 cach linh dong
const attr = 'foo'
const year = 2017
const obj = { [attr]: 1, ['now' + year]: 'wow' }
console.log(obj) // { foo: 1, now2017: 'wow' }


// Phân rã biến – destructuring
const user = { name: 'John', age: 21 }
const { name } = user
console.log(name) // 'John'

const arr = [1, 2, 3]
const [first, second] = arr
console.log(first, second) // 1, 2

const str = 'Hello'
const [first1, second1] = str
console.log(first1, second1) // 'H', 'e'

// Rest
const [first2, second2, ...others] = [1, 2, 3, 4, 5]
console.log(first2, second2, others)

// spread : ket hop mang
const arr1 = [3, 4, 5]
const newArr = [1, 2, ...arr1, 6]
console.log(newArr)


// Class
class Foo {
    constructor(x) {
      this.x = x
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
  
  


