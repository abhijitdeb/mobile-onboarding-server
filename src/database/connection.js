const Sequelize = require("sequelize");

const sequelize = new Sequelize("appintake", "admin", "password", {
    host: "appintakedb.c0uazigudyie.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
});

module.exports = sequelize;
