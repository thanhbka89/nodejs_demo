//for of mới được sử dụng trong es6 còn for in thì đã được sử dụng trong javascript từ trước.
//for of giống với spread operator, cũng chỉ sử dụng được với các iterable object.
//(Muốn biết object nào là iterable, thì bạn hãy console.log nó ra, nếu thấy có prototype là Symbol.iterator tức là có thể sử dụng được với for of hoặc spread operator ....

const currencies = ['Dong', 'USD', 'euro', 'yuan'];

for (const index in currencies) {
    console.log(index, currencies[index]);
}

for (const value of currencies) {
    console.log(value);
}

//for of bao gồm cả key, value:
for (const [index, value] of currencies.entries()) {
    console.log(index, value);
}
