const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
});
