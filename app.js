const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const User = require('./src/models/User');
const Application = require('./src/models/Application');

User.hasMany(Application, {
	as         : 'Applications',
	foreignKey : 'userId'
});

Application.belongsTo(User, {
	as         : 'User',
	foreignKey : 'userId'
});

const errHandler = (err) => {
	console.error('Error: ', err);
};

const getUser = async (userName) => {
	const users = await User.findAll({
		where : { userName: userName }
	}).catch(errHandler);
	return users[0];
};

const getApplication = async (id) => {
	return await Application.findByPk(id).catch(errHandler);
};

const getApplications = async (appSponsorName) => {
	const users = await User.findAll({
		where   : { userName: appSponsorName },
		include : [ { model: Application, as: 'Applications' } ]
	}).catch(errHandler);
	return users[0].Applications;
};

const createApplication = async (input) => {
	return await Application.create({
		userId                 : input.userId,
		appTeamContactInfo     : input.appTeamContactInfo,
		appName                : input.appName,
		appSponsorName         : input.appSponsorName,
		appSponsorEmail        : input.appSponsorEmail,
		appSponsorPhoneNumber  : input.appSponsorPhoneNumber,
		appDescription         : input.appDescription,
		targetDeviceModels     : input.targetDeviceModels,
		authMethod             : input.authMethod,
		vpnTunnelNeeded        : input.vpnTunnelNeeded,
		networkAccessRequired  : input.networkAccessRequired,
		securityScansCompleted : input.securityScansCompleted,
		deploymentDate         : input.deploymentDate,
		releaseCycle           : input.releaseCycle,
		endUserGroups          : input.endUserGroups,
		numberOfEndUsers       : input.numberOfEndUsers,
		mandatoryApplication   : input.mandatoryApplication,
		addedSecurityStandards : input.addedSecurityStandards,
		additionalComments     : input.additionalComments,
		rating                 : input.rating
	}).catch(errHandler);
};

const updateApplication = async (input) => {
	await Application.update(
		{
			userId                 : input.userId,
			appTeamContactInfo     : input.appTeamContactInfo,
			appName                : input.appName,
			appSponsorName         : input.appSponsorName,
			appSponsorEmail        : input.appSponsorEmail,
			appSponsorPhoneNumber  : input.appSponsorPhoneNumber,
			appDescription         : input.appDescription,
			targetDeviceModels     : input.targetDeviceModels,
			authMethod             : input.authMethod,
			vpnTunnelNeeded        : input.vpnTunnelNeeded,
			networkAccessRequired  : input.networkAccessRequired,
			securityScansCompleted : input.securityScansCompleted,
			deploymentDate         : input.deploymentDate,
			releaseCycle           : input.releaseCycle,
			endUserGroups          : input.endUserGroups,
			numberOfEndUsers       : input.numberOfEndUsers,
			mandatoryApplication   : input.mandatoryApplication,
			addedSecurityStandards : input.addedSecurityStandards,
			additionalComments     : input.additionalComments,
			rating                 : input.rating
		},
		{
			where : { id: input.id }
		}
	).catch(errHandler);
	return await Application.findByPk(input.id).catch(errHandler);
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
        rating: Int
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
	user              : ({ userName }) => getUser(userName),
	application       : ({ id }) => getApplication(id),
	applications      : ({ appSponsorName }) => getApplications(appSponsorName),
	createApplication : ({ input }) => createApplication(input),
	updateApplication : ({ input }) => updateApplication(input)
};

const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('./sslcert/cbp-mobile-server.key', 'utf8');
const certificate = fs.readFileSync('./sslcert/cbp-mobile-server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(
	'/graphql',
	express_graphql({
		schema    : schema,
		rootValue : root,
		graphiql  : true
	})
);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => {
	console.log('HTTP server is up and running!');
});

//require("./src/bootstrap")();
