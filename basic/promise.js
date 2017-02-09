//refer: https://kipalog.com/posts/Promise-la-khi-gi-

function tra_tien_em_anh_oi() {
  // tạo và trả về 1 Promise, khi này Promise ở trang thái pending
  //return new Promise(function(resolve, reject) {
  return new Promise( (resolve, reject) => {
    // tâm sinh lý ngẫu nhiên
    var isHappy = Math.random() >= 0.5;

    // nếu vui thì gọi resolve để trả tiền
    if (isHappy) {
      var tien = 1000;
      return resolve(tien); //  Promise dc fulfilled
    }

    // không vui quịt luôn
    // nhớ cho ng ta biết lý do vì chúng ta là lập trình viên lịch sự.
    var reason = 'lịt pẹ bố dek trả đấy làm gì nhau';
    reject(reason); //  Promise ở trạng thái reject
  });
}

tra_tien_em_anh_oi()
  .then((tien) => {
    console.log('da_tra_tien: ' + tien);
    return tien - 200;
  })
  .then((value) => {
    console.log(value);
    return value;
  })
  .then(() => {
    console.log('finished');
    return null;
  })
  .catch((err) => {
    console.log('ERR: ' + err);
  })


function foo() {
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve();
    }, 3000);
  });
}

function bar() {
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve();
    }, 5000);
  });
}


var start = Date.now();

Promise.all([
  foo(),
  bar()
])
.then(function() {
  console.log('Promise.all', Date.now() - start);
});


start = Date.now();
foo()
.then(bar)
.then(function(){
  console.log('chain .then', Date.now() - start);
});
