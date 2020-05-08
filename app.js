const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const User = require("./src/models/User");
const Application = require("./src/models/Application");

User.hasMany(Application, {
    as: "Applications",
    foreignKey: "userId",
});

Application.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
});

const errHandler = (err) => {
    console.error("Error: ", err);
};

const getUser = async (userName) => {
    const users = await User.findAll({
        where: { userName: userName },
    }).catch(errHandler);
    return users[0];
};

const getApplication = async (id) => {
    return await Application.findByPk(id).catch(errHandler);
};

const getApplications = async (appSponsorName) => {
    const users = await User.findAll({
        where: { userName: appSponsorName },
        include: [{ model: Application, as: "Applications" }],
    }).catch(errHandler);
    return users[0].Applications;
};

const createApplication = async (input) => {
    return await Application.create({
        userId: input.application.userId,
        appTeamContactInfo: input.application.appTeamContactInfo,
        appName: input.application.appName,
        appSponsorName: input.application.appSponsorName,
        appSponsorEmail: input.application.appSponsorEmail,
        appSponsorPhoneNumber: input.application.appSponsorPhoneNumber,
        appDescription: input.application.appDescription,
        targetDeviceModels: input.application.targetDeviceModels,
        authMethod: input.application.authMethod,
        vpnTunnelNeeded: input.application.vpnTunnelNeeded,
        networkAccessRequired: input.application.networkAccessRequired,
        securityScansCompleted: input.application.securityScansCompleted,
        deploymentDate: input.application.deploymentDate,
        releaseCycle: input.application.releaseCycle,
        endUserGroups: input.application.endUserGroups,
        numberOfEndUsers: input.application.numberOfEndUsers,
        mandatoryApplication: input.application.mandatoryApplication,
        addedSecurityStandards: input.application.addedSecurityStandards,
        additionalComments: input.application.additionalComments,
        rating: input.application.rating,
    }).catch(errHandler);
};

const updateApplication = async (input) => {
    await Application.update(
        {
            userId: input.application.userId,
            appTeamContactInfo: input.application.appTeamContactInfo,
            appName: input.application.appName,
            appSponsorName: input.application.appSponsorName,
            appSponsorEmail: input.application.appSponsorEmail,
            appSponsorPhoneNumber: input.application.appSponsorPhoneNumber,
            appDescription: input.application.appDescription,
            targetDeviceModels: input.application.targetDeviceModels,
            authMethod: input.application.authMethod,
            vpnTunnelNeeded: input.application.vpnTunnelNeeded,
            networkAccessRequired: input.application.networkAccessRequired,
            securityScansCompleted: input.application.securityScansCompleted,
            deploymentDate: input.application.deploymentDate,
            releaseCycle: input.application.releaseCycle,
            endUserGroups: input.application.endUserGroups,
            numberOfEndUsers: input.application.numberOfEndUsers,
            mandatoryApplication: input.application.mandatoryApplication,
            addedSecurityStandards: input.application.addedSecurityStandards,
            additionalComments: input.application.additionalComments,
            rating: input.application.rating,
        },
        {
            where: { id: input.application.id },
        }
    ).catch(errHandler);
    return await Application.findByPk(input.application.id).catch(errHandler);
};

//GraphQL Schema
const schema = buildSchema(`
    type User {
        id: Int,
        userName: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
    }

    type Application {
        id: Int
        userId: Int,
        appTeamContactInfo: String,
        appName: String,
        appSponsorName: String,
        appSponsorEmail: String,
        appSponsorPhoneNumber: String,
        appDescription: String,
        targetDeviceModels: String,
        authMethod: String,
        vpnTunnelNeeded: String,
        networkAccessRequired: String,
        securityScansCompleted: String,
        deploymentDate: String,
        releaseCycle: String,
        endUserGroups: String,
        numberOfEndUsers: Int,
        mandatoryApplication: String,
        addedSecurityStandards: String,
        additionalComments: String,
        rating: Int, 
    }

    input ApplicationInput {
        application: Application
    }

    type Query {
        user(userName: String!) : User
        application(id: Int!) : Application
        applications(appSponsorName: String) : [Application]
    }

    type Mutation {
        createApplication(input: ApplicationInput!)  : Application
        updateApplication(input: ApplicationInput!)  : Application 
    }
`);

//Root resolver
const root = {
    user: ({ userName }) => getUser(userName),
    application: ({ id }) => getApplication(id),
    applications: ({ appSponsorName }) => getApplications(appSponsorName),
    createApplication: ({ input }) => createApplication(input),
    updateApplication: ({ input }) => updateApplication(input),
};

const app = express();

app.use(
    "/graphql",
    express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen(3000, () => {
    console.log("Server is Up and Running!");
});

//require("./src/bootstrap")();
