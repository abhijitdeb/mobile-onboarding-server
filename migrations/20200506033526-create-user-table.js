"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Users", {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userName: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
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
                unique: true,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Users");
    },
};
