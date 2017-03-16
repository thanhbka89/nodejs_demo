// You have to use strict to try this in Node
"use strict";

var foo = "foo";
function baz() {
    if (foo) {
        var bar = "bar";
        let foobar = foo + bar;
    }
    // Both foo and bar are visible here
    console.log("This situation is " + foo + bar + ". I'm going home.");

    try {
        console.log("This log statement is " + foobar + "! It threw a ReferenceError at me!");
    } catch (err) {
        console.log("You got a " + err + "; no dice.");
    }

    try {
        console.log("Just to prove to you that " + err + " doesn't exit outside of the above `catch` block.");
    } catch (err) {
        console.log("Told you so.");
    }
}

baz();

try {
    console.log(invisible);
} catch (err) {
    console.log("invisible hasn't been declared, yet, so we get a " + err);
}
let invisible = "You can't see me, yet"; // let-declared variables are inaccessible before declaration


// var languages = ['Danish', 'Norwegian', 'Swedish'];
// // Pollutes global namespace. Ew!
// for (var i = 0; i < languages.length; i += 1) {
//     console.log(`${languages[i]} is a Scandinavian language.`);
// }
//
// console.log(i); // 4
//
// for (let j = 0; j < languages.length; j += 1) {
//     console.log(`${languages[j]} is a Scandinavian language.`);
// }
//
// try {
//     console.log(j); // Reference error
// } catch (err) {
//     console.log(`You got a ${err}; no dice.`);
// }

// Simple & Clean
for (let i = 1; i < 6; i += 1) {
    setTimeout(function() {
        console.log("I've waited " + i + " seconds!");
    }, 1000 * i);
}

// Totally dysfunctional
for (var j = 0; j < 6; j += 1) {
        setTimeout(function() {
        console.log("I've waited " + j + " seconds for this!");
    }, 1000 * j);
}


//Block
{ let a = 'I am declared inside an anonymous block'; }
//console.log(a); // ReferenceError: a is not defined

//Map : A map can be thought of as a object for which the keys can be arbitrary objects.
const gods = [
  {name: 'Douglas Crockford'},
  {name: 'Guido van Rossum'},
  {name: 'Raffaele Esposito'}
];

let miracles = new Map();

miracles.set(gods[0], 'JavaScript');
miracles.set(gods[1], 'Python');
miracles.set(gods[2], 'Pizza Margherita');

// Prints "JavaScript"
console.log(miracles.get(gods[0]));
console.log(miracles);

//Set
let surveyAnswers = ['sex', 'sleep', 'sex', 'sun', 'sex', 'cinema'];

let pleasures = new Set();
surveyAnswers.forEach(function (pleasure) {
  pleasures.add(pleasure);
});

// Prints the number of pleasures in the survey, not counting duplicates
console.log(pleasures.size);
console.log(pleasures);
