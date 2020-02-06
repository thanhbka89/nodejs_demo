1. Giới thiệu về Regex
Nói qua một chút nhé, Regex (Regular Expressions), tạm dịch là “biểu thức chính quy” là một cách hiệu quả để làm việc với dữ liệu dạng chuối (string). Bằng cách tạo một regex, bạn có thể làm một số việc như:

Tìm kiếm một đoạn văn bản
Trích rút một đoạn văn bản
Thay thế một đoạn văn bản bằng một đoạn văn bản khác
Hầu hết các ngôn ngữ lập trình đều sử dụng được regex. Nhưng trong bài hôm nay, mình sẽ nói về regex với ngôn ngữ cụ thể là javascript.

Cú pháp chung

/pattern/modifiers
 
trong đó:

pattern là chuỗi regex
modifiers (có thể có hoặc không) là options so khớp, bao gồm:
i : so khớp không quan tâm đến chữ hoa chữ thường
g : so khợp toàn bộ chuỗi cần tìm
m : so khớp luôn cả các dữ liệu xuống dòng (multiline)

Ví dụ
Để tạo một regex trong js thì bạn có thể dùng 2 cách

Cách 1: tạo 1 object RegExp

const reg = new RegExp('hello', 'i')
 
Cách 2: sử dụng cú pháp //

const reg = /hello/i
 
Đây là một ví dụ đơn giản. Biểu thức reg được định nghĩa dùng để tìm kiếm các đoạn văn bản có chứa chuỗi hello, không phân biệt chữ hoa chữ thường. Bạn có thể dùng hàm RegExp.test(String) để kiểm tra xem đoạn văn bản đang xét có chứa reg mà bạn định nghĩa hay không.


reg.test('Hello')             // true
reg.test('haiha hello you')   // true

reg.test('he')                // false
reg.test('haiha')             // false

2. Một vài systax cần nhớ
Brackets
[abc]	Tìm các chữ cái a,b hoặc c
[^abc]  Tim cac ki tu khong phai a, b, c
[0-9] hoăc [a-z] 	Tìm các ký tự la so từ 0-9 hoặc từ a-z
(x|y)	Tìm ký tự x hoặc y


Metacharacters
.   Tim ki tu bat ky
\w  Tim ki tu chu cai [a-zA-Z_0-9]
\W  Tim cac ki tu khong phai chu cai
\d	Tìm các chữ số [0-9]
\s	Tìm khoảng trắng
\b  Tim so khop bat dau hoac ket thuc chuoi
\n  Tim ki tu xuong hang
\t  Tim ki tu Tab
\0  Tim ki tu NULL

Quantifiers
n+	Tìm 1 hoặc nhiều chữ n liên tiếp nhau
n*	Tìm 0 hoặc nhiều chữ n liên tiếp nhau
n?	Tìm 0 hoặc 1 chữ n
{X} Kiem tra ki tu xuat hien dung X lan
{X,Y} Kiem tra ki tu xuat hien toi thieu X lan va toi da Y lan
{X,} Kiem tra ki tu xuat hien it nhat X lan
^   Kiem tra ki tu bat dau chuoi
$   Kiem tra ki tu ket thuc chuoi

Ví dụ
Kí hiệu ^, khớp chuỗi bắt đầu bằng hello

/^hello/.test('hello')             // true
/^hello/.test('ahihi hello ahihi') // false
 
Kí hiệu $, khớp chuỗi kết thúc bằng hello

/hello$/.test('hey, guy ... hello')     // true
/hello$/.test('hello you')              // false
 
Và khi chúng ta kết hợp ^ và $ chúng ta sẽ có 1 yêu cầu khớp chuỗi chính xác với từ hello:

/^hello$/.test('hello') // true
 
 
Kí hiệu *, dùng để khớp với bất kì kí tự nào xuất hiện 0 lần trở lên ???

/^hey.*joe$/.test('hey joe')             // true (khớp dấu cách)
/^hey.*joe$/.test('heyjoe')              // true (khớp với trường hợp 0 có kí tự nào)
/^hey.*joe$/.test('hey how are you joe') // true (khớp với chuỗi văn bản con)
/^hey.*joe$/.test('hey joe!')            // false (kết thúc chuỗi là `!`)
 
Kí hiệu |, dùng để khớp với 2 hoặc nhiều chuỗi khác nhau

/hey|ho/.test('hey') // true
/hey|ho/.test('ho')  // true

 
Kí hiệu +, so khớp 1 kí tự xuất hiện nhiều hơn 1 lần

/^\d+$/.test('144343') //true (các chữ số xuất hiện nhiều lần)
/^\d+$/.test('ahihi')  //false (không có chữ số nào trong chuỗi)

 
nhưng nếu là *, ta sẽ có true, true nhé


/^\d+$/.test('144343') //true
/^\d+$/.test('ahihi')  //true

 
KÍ hiệu ?, lại so khớp cho kí hiệu không xuất hiện hoặc xuất hiện duy nhất 1 lần

/^\d{3}\w?$/.test('123')   // true (chứa 0 chữ cái)
/^\d{3}\w?$/.test('123a')  // true (chứa 1 chữ cái)
/^\d{3}\w?$/.test('123ab') // false (chứa 2 chữ cái)

 
{n}, khớp chuỗi có kí tự xuất hiện đúng n lần:

/^\d{3}$/.test('123')  // true
/^\d{3}$/.test('12')   // false
/^\d{3}$/.test('1234') // false

/^[A-Za-z0-9]{3}$/.test('Abc') // true

 
{m, n}, cái này thì là xuất hiện từ m đến n lần, không ít hơn m lần và không nhiều quá n lần

/^\d{3,5}$/.test('123')    // true
/^\d{3,5}$/.test('1234')   // true
/^\d{3,5}$/.test('12345')  // true
/^\d{3,5}$/.test('123456') // false

 
Dấu ngoặc tròn (...), để tạo các nhóm kí tự. Bằng cách này bạn có thể quy ước số lần lặp lại của một chuỗi thay vì một kí tự.

/^(\d{2})+$/.test('12')   // true
/^(\d{2})+$/.test('123')  // false
/^(\d{2})+$/.test('1234') // true

 
3. Các hàm js regex bạn nên biết
Ví dụ:
String.match(RegExp) và RegExp.exec(String)
Hai hàm khớp chuỗi này sẽ trả về mảng (Array) các chuỗi con khớp với mẫu regex. Trường hợp không có chuỗi khớp, hàm sẽ trả về kết quả null


'123s'.match(/^(\d{3})(\w+)$/)
//Array [ "123s", "123", "s" ]

/^(\d{3})(\w+)$/.exec('123s')
//Array [ "123s", "123", "s" ]

'hey'.match(/(hey|ho)/)
//Array [ "hey", "hey" ]

/(hey|ho)/.exec('hey')
//Array [ "hey", "hey" ]

/(hey|ho)/.exec('ha!')
//null
 
String.replace(RegExp, closure): Đây là một hàm khá hay ho nè.
Bình thường bạn có hay dùng String.replace(String s1, String s2)? và truyền vào 2 string để thay thế những đoạn văn bản s1 xuất hiện trong chuỗi bằng đoạn văn bản s2


"Hello world!".replace('world', 'you') //Hello you!
"My dog is a good dog!".replace('dog', 'cat') //My cat is a good dog!
 
nhưng bạn cũng có thể truyền regex để thay thế cácđoạn văn bản có cấu trúc như regex bạn định nghĩa, để thay thế các các đoạn văn bản đó bằng một chuỗi khác.


"My dog is a good dog!".replace(/dog/g, 'cat') //My cat is a good cat!
 
hoặc truyền 1 closure để xử lý tại mỗi vị trí có đoạn văn bản cần sửa đổi. Hàm này cho phép bạn kết hợp hàm match() và replace().


"Hello, world!".replace(/(\w+), (\w+)!/, (matchedString, first, second) => {
  console.log(first);
  console.log(second);

  return `${second.toUpperCase()}: ${first}!!!`
})
//"WORLD: Hello!!!"
