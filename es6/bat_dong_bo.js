//Xu ly bat dong bo : Hàm trả về (callback), promise và async/await.

//Callback
function callAPI(callback) {
    var url = "https://reqres.in/api/users?page=2";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            callback(data);
        }
    };

}

function handleData(data) {
    console.log(data);
}
callAPI(handleData);

//Promise
// fetch('https://reqres.in/api/users?page=2')
//     .then((response) => {
//         return response.json();
//     })
//     .then((json) => {
//         console.log(json);
//     });


//Async, Await
// const makeRequest = async () => {
//     const response = await fetch('https://reqres.in/api/users?page=2');
//     const json = await response.json();
//     console.log(json);
// };

// makeRequest();