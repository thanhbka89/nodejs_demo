setTimeout(function() {
    console.log('HELLO WORLD');
    setTimeout(function() {
        console.log('Yeah');
        setTimeout(function() {
            console.log('Hollaboy');
        }, 1000);
    }, 2000);
}, 5000);

console.log('thanhbka running before 5s');

//oop in javascript
var obj = {
    name: 'thanhnm',
    age: 24,
    show: function() {
        return console.log(this.name + ' : ' + this.age);
    }
};

obj.show();

//multi params
var plus = function() {
    sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }

    return console.log(sum);
};

plus(1, 3, 4, 2);

//Declare method
function A() {
    this.a = 24;
    this.funcA = function() {
        return console.log(this.a);
    };
}
A.prototype.funcB = function() {
    return console.log(this.a + ': ' + 1989);
};

var objA = new A();
objA.funcA();
objA.funcB();

//Inheritance
function B() {
    this.b = 12;
}
B.prototype = new A();
var objB = new B();
objB.funcA();
console.log(objB.b);
console.log(A.prototype);
console.log(B.prototype);

//Overriding method
B.prototype.funcB = function() {
    return console.log(this.b);
};
objB.funcB();

//static method: don't use keyword 'prototype'
B.formData = function(data) {
    var b = new B();
    b.a = data.a;
    b.b = data.b;

    return b;
};
var objB2 = B.formData({
    a: 21,
    b: 07
});
objB2.funcA();

/* Mau class day du */
function Rectangular(width, high, deep) {
    /// Định nghĩa Private Property
    var _width, _high, _deep;

    /// Định nghĩa Private Method
    function isPositive(x) {
        return x > 0;
    }

    /// Định nghĩa Public Property
    this.width = function(value) {
        if (value === undefined) return _width;
        if (!isPositive(value)) throw "Value phải là số dương";
        _width = value;
    };
    this.high = function(value) {
        if (value === undefined) return _high;
        if (!isPositive(value)) throw "Value phải là số dương";
        _high = value;
    };
    this.deep = function(value) {
        if (value === undefined) return _deep;
        if (!isPositive(value)) throw "Value phải là số dương";
        _deep = value;
    };

    /// Định nghĩa Public Method
    this.getVolume = function() {
        return this.width() * this.high() * this.deep();
    };

    /// Định nghĩa CONSTRUCTOR
    (function() {
        this.width(width);
        this.high(high);
        this.deep(deep);
    }).call(this);
};

var rec = new Rectangular(1, 2, 3);
console.log('Volume: ' + rec.getVolume());
rec.width(4);
console.log('Volume 2: ' + rec.getVolume());

//demo
var scores = [84, 99, 91, 65, 87, 55, 72, 68, 95, 42],
    topScorers = [],
    scoreLimit = 90;

for (i = 0; i <= scores.length; i++) {
    if (scores[i] > scoreLimit) {
        topScorers.push(scores[i]);
    }
}

console.log(topScorers);

(function() {
    /// Định nghĩa NAMESPACE
    window.vn = window.vn || {};
    vn.eten = vn.eten || {};
    vn.eten.tek = vn.eten.tek || {};

    // khai báo static class, singleton
    vn.eten.tek.Detector = new Detector();

    // private static construction
    function Detector() {
        var os, width, height, cookie, canvas;

        // property os: readonly
        this.os() = function() {
            return os;
        };
        // property width: readonly
        this.width() = function() {
            return width;
        };
        // property height: readonly
        this.height() = function() {
            return height;
        };

        this.supportCanvas = function() {
            return canvas;
        };
        this.supportCookie = function() {
            return cookie;
        };

        (function() {
            width = window.screen.width;
            height = window.screen.height;

            if (navigator.appVersion.indexOf("Win") != -1) os = "Windows";
            else if (navigator.appVersion.indexOf("Mac") != -1) os = "MacOS";
            else if (navigator.appVersion.indexOf("X11") != -1) os = "UNIX";
            else if (navigator.appVersion.indexOf("Linux") != -1) os = "Linux";
            else if (navigator.userAgent.indexOf("iPhone")) os = "iPhone/iPod";
            else os = "Unknown";

            cookie = window.navigator.cookieEnabled;
            canvas = !!document.createElement('canvas').getContext;
        })();
    }
})();

console.log("OS = " + vn.eten.tek.Detector.os());
console.log("Width x Height = " + vn.eten.tek.Detector.width() + " x " + vn.eten.tek.Detector.height());
console.log("Support Canvas: " + vn.eten.tek.Detector.supportCanvas());
console.log("Support Cookie: " + vn.eten.tek.Detector.supportCookie());
