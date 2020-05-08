module.exports = async () => {
    const User = require("./models/User");
    const Application = require("./models/Application");

    User.hasMany(Application, {
        as: "AllApplications",
        foreignKey: "userId",
    });

    Application.belongsTo(User, {
        as: "MyUser",
        foreignKey: "userId",
    });

    const errHandler = (err) => {
        console.error("Error: ", err);
    };

    const user = await User.create({
        userName: "abhideb",
        password: "12345678",
        firstName: "Abhijit",
        lastName: "Deb",
        email: "abhijit.deb@caci.com",
    }).catch(errHandler);

    const application = await Application.create({
        appTeamContactInfo: "TIO Team",
        appName: "Application Test 1",
        appSponsorName: "Abhijit Deb",
        appSponsorEmail: "abhijit.deb@caci.com",
        appSponsorPhoneNumber: "7033001784",
        appDescription: "This is a test application",
        targetDeviceModels: "IOS 12",
        authMethod: "SAML2.0",
        vpnTunnelNeeded: "Yes",
        networkAccessRequired: "Yes",
        securityScansCompleted: "N/A",
        deploymentDate: "4/12/2020",
        releaseCycle: "Every three weeks",
        endUserGroups: "Border Patrol",
        numberOfEndUsers: "1000",
        mandatoryApplication: "NA",
        addedSecurityStandards: "RFC2341",
        additionalComments: "Can we get it approved by tomorrow?",
        rating: 5,
        userId: user.id,
    }).catch(errHandler);

    const users = await User.findAll({
        where: { userName: "abhideb" },
        include: [{ model: Application, as: "AllApplications" }],
    });

    console.log("abhideb Applications", users);
};
