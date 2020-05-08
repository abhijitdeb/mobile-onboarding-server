const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Application", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: Sequelize.INTEGER(11),
    appTeamContactInfo: Sequelize.TEXT,
    appName: Sequelize.TEXT,
    appSponsorName: Sequelize.TEXT,
    appSponsorEmail: Sequelize.STRING(100),
    appSponsorPhoneNumber: Sequelize.TEXT,
    appDescription: Sequelize.TEXT,
    targetDeviceModels: Sequelize.TEXT,
    authMethod: Sequelize.TEXT,
    vpnTunnelNeeded: Sequelize.TEXT,
    networkAccessRequired: Sequelize.TEXT,
    securityScansCompleted: Sequelize.TEXT,
    deploymentDate: Sequelize.DATE,
    releaseCycle: Sequelize.TEXT,
    endUserGroups: Sequelize.TEXT,
    numberOfEndUsers: Sequelize.TEXT,
    mandatoryApplication: Sequelize.TEXT,
    addedSecurityStandards: Sequelize.TEXT,
    additionalComments: Sequelize.TEXT,
    rating: Sequelize.INTEGER(11),
});
