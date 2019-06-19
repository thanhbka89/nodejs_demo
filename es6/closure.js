function init() {
    let name = 'Tien Phat'; // name là biến cục bộ của hàm init
    function displayName() { // displayName() là hàm closure
        console.log(name); // sử dụng biến của hàm cha
        name = 'Hoa Phat'
    }
    displayName();
    console.log(name);
}
try {
    init();
    console.log(name);
} catch (error) {
    console.log(error); 
}