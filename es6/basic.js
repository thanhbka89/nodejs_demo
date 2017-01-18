var url = 'thanhbka.com';

console.log('Hello');
console.log(url);

// let 
var a = 12;
var b = 20;
 
if (a < b)
{
    let tmp = a;
    a = b;
    b = tmp;
}
 
console.log("a: " + a);
console.log("b: " + b);
console.log("tmp: " + tmp); //error

/**
 * arrow function 
 */

var hello = (name, message) => {
    console.log("Chào " + name + ", bạn là " + message);
}; 
hello('Cường', 'admin freetuts.net');

//Cau lenh don 
var hello = (name, message) => console.log("Chào " + name + ", bạn là " + message);

//1 tham so 
var hello = message => {
    console.log(message);
};     
hello('Chào mừng bạn đến với freetuts.net');

//khong tham so 
var hello = () => {
    console.log('Chào mừng bạn đến với freetuts.net');
};
hello();

/**
 * Destructuring Assignments
 */
let domain = ['freetuts.net'];
let [main, sub = 'qa.freetuts.net'] = domain;
// Xem kết quả
console.log(main);
console.log(sub);

/**
 * Default Parameters
 */
function sayHello(domain = 'freetuts.net')
{
    return domain;
}
 
// Sử dụng
console.log("KHÔNG truyền tham số: " + sayHello());
console.log("CÓ truyền tham số: " + sayHello('facebook.com'));

/**
 * Rest Parameters: khai báo một hàm với số lượng tham số không xác định
 */
// Khai báo hàm
let domainList = (main, sub, ...other) =>
{
    console.log("Main: " + main);
    console.log("Sub: " + sub);
    console.log("Other");
    console.log(other);
}
 
// Gọi hàm
domainList('freetuts.net', 'facebook.com', 'google.com', 'zalo.com', 'iphone.com');

/**
 * const : chua so, string, mang, doi tuong. Giong voi "let"
 */
const info = {
    name : "Nguyen Van Cuong",
    domain : "Freetuts.net"
};
 
console.log(info);

/**
 * Set : các giá trị không được trùng
 */
//Khoi tao
var numbers = new Set([1, 2, 3, 4]);
numbers.add(5); // numbers = Set {1, 2, 3, 4 ,5}

for (let number of numbers){
    console.log(number);
}

//Chuyen doi Set sang Array 
let numbers = new Set([1, 2, 3, 4]);
let arr_numbers = [...numbers]; //chu ý dau "..." truoc ten Set

//Chuyen doi Array sang Set 
let arr_numbers = [1, 2, 3, 4];
let set_numbers = new Set(arr_numbers);

/**
 * Map : key => value. key không được trùng
 */
// Tạo một map gồm 3 thông tin
 let map = new Map([
     ["Name", "Nguyen Van Cuong"],
     ["Email", "thehalfheart@gmail.com"],
     ["Website", "freetuts.net"]
]);
 
console.log(map);

// Xử lý key
for (var key of map.keys())
{
    console.log(key);
}

// Xử lý value
for (var value of map.values())
{
    console.log(value);
}

// Xử lý key, value
for (var entry of map.entries())
{
    console.log(entry[0] + ' - ' + entry[1]);
}

//Loop map 
//way 1 
for (var [key, value] of map)
{
    console.log(key + ' - ' + value);
}

//way 2 
map.forEach((value, key) => {
    console.log(key + ' - ' + value);
});

/**
 * Collection WeakMap : giong Map, nhung key phai la Object
 */
// Khởi tạo
var weak = new WeakMap();
 
// Danh sách key 
var key1 = {};
var key2 = {};
 
// Thêm phần tử
weak.set(key1, "Giá trị 01");
weak.set(key2, "Giá trị 02");
 
// Lấy giá trị
console.log(weak.get(key1)); // Giá trị 01
console.log(weak.get(key2)); // Giá trị 02

/**
 * Collection WeakSet: dữ liệu truyền vào luôn phải là một đối tượng (object, class, function) và bạn phải tạo một giá trị (key) trước khi lưu vào
 */
// Khởi tạo
var weak = new WeakSet();
 
// Danh sách key 
var key1 = {
    name : "thehalfheart"
};
var key2 = {
    website: "freetuts.net"
};
 
// Thêm phần tử
weak.add(key1);
weak.add(key2);


/**
 * Kiem tra kieu cua bien : console.log(typeof symbol1); 
 */

/**
 * Symbol : nó sẽ tạo ra các ký tự duy nhất (unique) và không trả về một chuỗi mà nó chỉ là một dạng được gọi như một function, vì vậy bạn sẽ không thể thấy được ký tự nó generate là gì.
 */
const MY_KEY = Symbol();
let map = new Map();
map.set(MY_KEY, 'freetuts.net');
console.log([...map]);

/**
 * Template String 
 */
var website = 'freetuts.net';
 
let temp = `
    Chào mừng bạn đến với ${website}
`;
 
console.log(temp);

/**
 * Promise
 * resolve là một hàm callback xử lý cho hành động thành công.
 * reject là một hàm callback xử lý cho hành động thất bại.
 */
var promise = new Promise(function(resolve, reject){
     
});