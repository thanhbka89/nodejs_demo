const numbers = [1, 3, 20, 40, 45, 70];
// sử dụng function thông thường
const result1 = numbers.filter(function(value, index) {
    return value > 50;
});

// arrow function
const result2 = numbers.filter((value, index) => {
    return value > 50
});

const result3 = numbers.filter(value => {
    return value > 50
});

const result4 = numbers.filter(value => value > 50);

const result5 = numbers.map(() => 'everything');

const result6 = numbers.map((val, index) => `${index}-everything-${val}`);

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
console.log(result6);


//Có thể thấy là từ 3 dòng code, giờ ta chỉ còn lại đúng 1 dòng.
//Nhưng như tôi đã nói ở trên, việc lạm dụng arrow function sẽ đôi khi sẽ gây rắc rối cho chính bạn. Hãy nhìn vào ví dụ sau đây:

    // const person = {
    //     age: 20,
    //     increaseAge: () => {
    //         this.age++;
    //     }
    // }
    //
    // person.increaseAge();
    // person.increaseAge();
    // person.increaseAge();
    //
    // console.log(person.age); //20

//person.age vẫn ra kết quả là 20 ?? tại sao lại thế. Hãy cùng log this ra xem sao:

    //  const person = {
    //     age: 20,
    //     increaseAge: () => {
    //         console.log(this);
    //         //this.age++;
    //     }
    // }
    //
    // person.increaseAge(); // window

//Khi console.log(this) ta sẽ thu được Window. Tại sao lại là Window mà không phải là person? Đây chính là vấn đề của arrow function.
//Khi ta sử dụng arrow function, this sẽ không được bind cho person, mà là một object mà person kế thừa (chính là object Window)
//(đa phần trong các browser hiện nay sẽ là Window chứ không phải tất cả các bạn nhé).
//Khi này, hãy sử dụng function thông thường, vấn đề sẽ được giải quyết:

     const person = {
        age: 20,
        increaseAge: function() {
            console.log(this);
            this.age++;
        }
    }

    person.increaseAge(); // person
    console.log(person.age); //21
