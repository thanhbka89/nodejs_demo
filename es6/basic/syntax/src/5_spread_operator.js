//... là một toán tử nhận các item bên trong một iterable object
//(tức là các object có thể loop được như Array, nodes, DOM, hoặc thậm chí là một object có iterator) và apply các item này vào containing object.

const android = [ 'galaxy s7', 'nokia 1020', 'xiaomi mi5'];
const iphone = ['iphone 7 ', 'iphone8', 'iphone9'];
const phones = [android, ...iphone, 'viettel phone 100'];
console.log(phones);
//[ 'galaxy s7', 'nokia 1020', 'xiaomi mi5', 'iphone 7 ', 'iphone8', 'iphone9',  'viettel phone 100'];

//Ở đây, iterable object chính là android và iphone, các item bên trong các Array này đã được apply vào containing object là phones.
//Và lưu ý là các item trong phones và các item trong android, iphone là riêng biệt.
//Tức là spread operator thực hiện clone chứ không đơn thuần là copy các value này.
//Chính vì vậy nếu ta thay đổi giá trị galaxy s7 bên trong phones,
//thì giá trị galaxy s7 trong android sẽ không bị thay đổi gì. Vì 2 variable này là 2 biến tham chiếu khác nhau.


//Một lưu ý khác, và đã được tôi nhắc đến ở trên, đó là spread operator sử dụng được với tất cả iterator, tức là bao gồm cả string, nodes, DOM objects. Ví dụ với string chẳng hạn:

const str = 'Hello';
const strArray = [...str];
console.log(strArray);
//["H", "e", "l", "l", "o"]


//Ngoài ra, spread operator còn có một ứng dụng khác gọi là rest params. Hãy cùng đi vào ví dụ sau đây:

const people = ['Tahei', 'Tran Duc Thang', 'Nguyen My Hanh', 'Nguyen Phuc Luong'];
const [CEO, CFO, ...staffs] = people;
console.log(CEO); // Tahei
console.log(CFO); //Tran Duc Thang
console.log(staffs); // ['Nguyen My Hanh', 'Nguyen Phuc Luong'];

//Khi sử dụng spread operator với biến staffs thì nó sẽ nhận tất cả các item còn lại trong people kể từ item Nguyen My Hanh trở đi.
