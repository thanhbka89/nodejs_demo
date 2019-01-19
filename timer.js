function myFunc(arg) {
  console.log('arg was => ' + arg);
}

setTimeout(myFunc, 1500, 'funky');

console.log('before immediate');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('after immediate');

console.log('1989');