"use strict"

let student = require('./module_export_class');

let st = new student(); 
//let st = new student('thanhnm', 30);

st.setName('Vũ Thanh Tài');
st.setAge(22);

console.log(st.getName());
console.log(st.getAge());


