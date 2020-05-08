"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Applications", {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: Sequelize.INTEGER(11),
            appTeamContactInfo: Sequelize.TEXT,
            appName: {
                type: Sequelize.STRING(100),
                unique: true,
            },
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
            numberOfEndUsers: Sequelize.INTEGER(11),
            mandatoryApplication: Sequelize.TEXT,
            addedSecurityStandards: Sequelize.TEXT,
            additionalComments: Sequelize.TEXT,
            rating: Sequelize.INTEGER(11),
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Applications");
    },
};
