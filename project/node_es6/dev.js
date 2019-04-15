
function run() { 
    var width = 200 
    console.log(width)// 200 
}

try {
    run()
    console.log(width)
    console.log(express1)
} catch (e) {
    console.log(e.message) 
}

let greeting = "say Hi"
if (true) {
    let greeting = "say Hello instead"
    console.log(greeting) // "say Hello instead"
}
console.log(greeting) // "say Hi"