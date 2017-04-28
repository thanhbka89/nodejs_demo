/**
 * Đây là một kỹ thuật giúp chúng ta tạo ra các variable bằng cú pháp ngắn gọn, bớt lặp code hơn. Hãy cùng đi vào ví dụ sau:
 */

/**
 * Destructuring Object
 */

const animal = {
    dog: 'James',
    cat: {
        bigger: 'Anthony',
        smaller: 'Mimi'
    },
    turtle: 'Knox'
}

// normal way
// const dog = animal.dog;
// const cat = animal.cat;
// const turtle = animal.turtle;

//es6 - destructuring
const {dog, turtle} = animal;
const {bigger, smaller} = animal.cat;

console.log(dog, turtle); //James, Knox
console.log(bigger, smaller); //Anthony, Mimi

/**
 * Thực hiện gán tên và gán giá trị mặc định trong Destructuring
 * Ta dùng dấu : để gán tên khác cho biến khi không muốn dùng tên trùng với property của object.
 * và dùng dấu = để gán giá trị mặc định. Ở đây tôi không hề khai báo giá trị cho publish bên trong dictionary, nên publish sẽ nhận một giá trị mặc định cho nó là '2017-01-10'.
 */

const dictionary = {
    subject: {
        farmily: {
            farther: 'cha',
            mother: 'mẹ',
            son: 'con trai'
        },
        city: {
            house: 'nhà cửa',
            road: 'đường đi',
            'traffic light':  'đèn giao thông'
        }
    },
    quantity: 200,
    title: 'James Nguyen Dictionary'
}

const {subject: sub, quantity: quan, publish: pub = '2017-01-10'} = dictionary;
console.log(quan); // 200
//console.log(publish); //2017-01-10
console.log(pub); //2017-01-10


/**
 * Destructuring Array
 */

//Ở trên, ta đã được thấy Destructuring áp dụng với object. Ngoài ra thì kĩ thuật này còn áp dụng được với cả array nữa. Cách thức áp dụng thì tương tự.

const itCompany = ['framgia', 'evolable', 'fpt'];
const [japan, america, vietnam] = itCompany;

console.log(japan); //framgia
console.log(america); //evolable
console.log(vietnam); //itCompany

//Có một vài khác biệt khi ta sử dụng Destructuring với Object và Array. Khi sử dụng với Object,
//các biến được khai báo sẽ tương ứng với property của Object bị Destructuring, còn với Array thì các biến được khai báo sẽ tương ứng với các vị trí.
//Nhìn vào ví dụ trên, ta thấy là variable japan sẽ tương ứng với phần tử ở vị trí đầu tiên của Array itCompany nên nó sẽ nhận giá trị là framgia.
//Khác biệt thứ 2 là syntax. Với Object, ta sử dụng dấu dóng mở ngoặc nhọn: {}, còn với Array, ta sử dụng ngoặc vuông.


/**
 * Destructuring Function
 */

//Ngoài ra, bạn cũng có thể thực hiện Destructoring với function:

function showInfor({firstName, lastName, age}) {
    return `Name: ${firstName} ${lastName}
            Age: ${age}`;
}

const person = {
    firstName: 'james',
    lastName: 'nguyen',
    age: 18
}

let tempInfo = showInfor(person);
console.log(tempInfo);
//Name: james nguyen
//Age: 18

//Có thể thấy việc sử dụng Destructuring với function sẽ rất tiện lợi khi ta sử dụng function đó nhiều lần và biến truyền vào ở dạng object.
//Đặc biệt khi tôi làm việc với React JS, state và props rất hay được sử dụng và cả 2 đều là object.
//Khi này muốn sử dụng bất cứ object nào trong state hoặc props, tôi chỉ việc áp dụng destructuring vào function và truyền state hoặc props vào là xong.
//Dưới đây là một ví dụ khác khi ta return multiple value.

function operate(a, b) {
    return {
        sum1: a + b,
        sub1: a - b,
        mul1: a * b
    };
}

const {sum1, mul1, sub1} = operate(20, 10);
console.log(sum1, sub1, mul1); //30, 10, 200
