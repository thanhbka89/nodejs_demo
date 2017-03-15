"use strict";
module.exports = function(sequelize, DataTypes) {
    let DanhMuc = sequelize.define("danhmuc", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
        }
    });
    return DanhMuc;
};
