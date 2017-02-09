//refer: https://kipalog.com/posts/Callback-la-khi-gi-

// con thỏ cần 3s mới ăn cỏ và uống nước xong.
// function con_tho_an_co() {
//   setTimeout(function() {
//     console.log('con thỏ ăn cỏ, uống nước');
//   }, 3000);
// }
//
// // con thỏ chui vô hang
// function hotel() {
//   console.log('chui vô hotel');
// }
//
// con_tho_an_co();
// hotel();


/**
 * Output:
 * chui vô hotel
 * con thỏ ăn cỏ, uống nước
 */


function con_tho_an_co(callback007) {
  setTimeout(function() {
    console.log('con thỏ ăn cỏ, uống nước');
    callback007(); // đây là lúc điệp viên báo cáo cho sếp !
  }, 3000);
}

// con thỏ chui vô hang
function hotel() {
  console.log('chui vô hotel');
}

// điệp viên nằm vùng callback sẽ gọi hotel luôn dùm con thỏ.
var callback = function() {
  hotel();
}
con_tho_an_co(callback);
