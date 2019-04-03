"use strict"

module.exports = class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    setName(name) {
        this.name = name;
    }
    setAge(age) {
        this.age = age
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
}