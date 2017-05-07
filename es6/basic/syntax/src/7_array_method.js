//Mình giới thiệu ra đây 6 method mới của Array.

//2 cái đầu tiên đó là Array.from() và Array.of().
//Mục đích của 2 function này đều là để convert các object khác thành Array.
//Ví dụ như khi mình get 1 list các posts từ server về chẳng hạn. Dữ liệu ở dạng JSON.
//Vậy thì sẽ không thể sử dụng được các function kèm theo với Array như push, shift hay map được.
//Giải pháp rất đơn giản: ném listPost đó vào Array.from(listPost), ta sẽ thu được 1 Array chính hiệu với đầy đủ method ta cần.

const numberArr = Array.of(1, 2, 30, 50, 100);
console.log(numberArr); //[1, 2, 30, 50, 100]

//2 method tiếp là Array.find và Array.findIndex.
//2 method này giống với method filter trong jquery, khác biệt là Array.find sẽ chỉ trả lại item đầu tiên nó cho là đúng
//chứ không phải là trả lại mảng các item thỏa mãn điều kiện, cách làm việc tương tự với Array.findIndex, nhưng findIndex sẽ chả lại index của item.

const people = [
  {name: 'james', age: 18},
  {name: 'Anthony', age: 23},
  {name: 'Hanh America', age: 29}
]

const james = people.find(value => value.name == 'james');
const jamesIndex = people.findIndex(value => value.name == 'james');
console.log(james); //Object {name: "james", age: 18}
console.log(jamesIndex); //0
