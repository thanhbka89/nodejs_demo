"use strict";
module.exports = function(sequelize, DataTypes) {
    let Thuoc = sequelize.define("Thuoc", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripion : {
          type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
        }
    });

    return Thuoc;
};
