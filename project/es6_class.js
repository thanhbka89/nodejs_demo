class MyClass {

    constructor(name = 'thanhnm') {
        this.name = name;
        this.age = 30;
    }

    //getter, setter : ko cho phep thay doi property tu ben ngoai lop

    sayHello() {
        console.log('Hello world');
        return 'OK';
    }

    showName() {
        console.log(this.name);
    }
    add(y) {
        return this.age + y
    }
}
let obj = new MyClass('thanhbka');
console.log(obj);
obj.name = 'Thanh Ngyen';
console.log(obj.name);
console.log(obj.sayHello());
obj.showName();

class Bar extends MyClass {
    constructor(x, y) {
        // Gọi đến hàm dựng của lớp cha
        super(x)
        this.y = y
    }
    calculate() {
        return this.add(4) + this.y
    }
}

const f = new Bar(3, 4)
console.log(f.calculate()) // 11