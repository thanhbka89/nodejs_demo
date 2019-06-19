const PI = 3.141593
PI > 3.0
console.log(PI)

//Block-Scoped Variables
let callbacks = []
for (let i = 0; i <= 2; i++) {
    callbacks[i] = function () { return i * 2 }
}
console.log(callbacks[0]() === 0)
console.log(callbacks[1]() === 2)
console.log(callbacks[2]() === 4)


//let
if(true)
{
    let x = 12;
    console.log(x); //alert's 12
}
//console.log(x); //x is undefined here


//Function Return Multiple Values
function function_name()
{
    return [1, 6, 7, 4, 8, 0]; //here we are storing variables in an array and returning the array
}

var q, w, e, r, t, y;

//Here we are using ES6's array destructuring feature to assign the returned values to variables.
//Here we are ignoring 2 and 4 array indexes
[q, w, , r, , y] = function_name()

console.log(y);//y is 0

//Default Function Arguments Values
function myFunction(x = 1, y = 2, z = 3)
{
     console.log(x, y, z); // Output "6 7 3"
}
myFunction(6,7);

//“…” Operator
//args variable is an array holding the passed function arguments
function function_one(...args)
{
    console.log(args);
    console.log(args.length);
}

function_one(1, 4);
function_one(1, 4, 7);
function_one(1, 4, 7, 0);

var jsFuture = "es6";
(function () { // ham tu chay
  if (!jsFuture) { var jsFuture = "es5"; }
  console.log(jsFuture);
}());
