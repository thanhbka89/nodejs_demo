//Module là các đoạn code được đóng gói lại với nhau,...
//Code trong một Module thường là private – nghĩa là các hàm, biến được định nghĩa và truy cập bởi bên trong của Module.
//Để "chìa ra" các hàm hoặc biến để sử dụng bên ngoài Module bạn cần sử dụng exports.

module.exports = {
  sayHelloInEnglish: function() {
    return "HELLO";
  },

  sayHelloInSpanish: function() {
    return "Hola";
  }
};
