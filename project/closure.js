function init() {
    var name = 'Tien Phat'; // name là biến cục bộ của hàm init
    function displayName() { // displayName() là hàm closure
        console.log (name); // sử dụng biến của hàm cha
    }
    displayName();
}
init();