"use strict";

const models = require(__dirname + '/../models');

module.exports = {
    getAll() {
        models.Thuoc.findAll()
            .then(function(thuocs) {
                //console.log(thuocs);
                thuocs.forEach((thuoc) => {
                  console.log(thuoc.title);
                });
            })
            .catch(function(error) {
                console.log('getAll_Thuoc: ' + error);
            });
    },
    add(thuoc) {
        models.Thuoc.create(thuoc).then(function(todos) {
            console.log(todos.dataValues);
        }).catch(function(error) {
            console.log('add_Thuoc: ' + error);
        });
    }

}
