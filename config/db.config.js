const { required } = require('joi');
const Sequelize = require('sequelize');

const dbName = 'EMS';
const dbUser = 'root';
const dbPassword = 'root';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  port: 3306,
  logging: false,
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const userTypes = require('../models/userTypeModels')(sequelize, Sequelize);
const user = require('../models/userModels')(sequelize, Sequelize);
const userCredentials = require('../models/userCredentialsModels')(sequelize, Sequelize);
const userAddresses = require('../models/userAdressesModels')(sequelize, Sequelize);
const userEducationDetails = require('../models/userEducationDetailsModels')(sequelize, Sequelize);
const role = require('../models/rolesModels')(sequelize, Sequelize);
const userRoleMapper = require('../models/userRoleMapperModels')(sequelize, Sequelize);
const features = require('../models/featuresModels')(sequelize, Sequelize);
const featureRoleMapping = require('../models/featureRoleMappingModels')(sequelize, Sequelize);
const activityTypes = require('../models/activityTypesModels')(sequelize, Sequelize);
const activityStatus = require('../models/activityStatusModels')(sequelize, Sequelize);
const activities = require('../models/activitiesModels')(sequelize, Sequelize);
const pipeLinePhases = require('../models/pipeLinePhasesModel')(sequelize, Sequelize);
const courseTypes = require('../models/courseTypesModels')(sequelize, Sequelize);
const course = require('../models/courseModel')(sequelize, Sequelize);
const enquiries = require('../models/enquiriesModels')(sequelize, Sequelize);
const communicationLog = require('../models/communicationLogModels')(sequelize, Sequelize);
const subject = require('../models/subjectsModels')(sequelize, Sequelize);
const syllabus = require('../models/syllabusModels')(sequelize, Sequelize);
const admissions = require('../models/admissionsModels')(sequelize, Sequelize);
const feePayments = require('../models/feePaymentModels')(sequelize, Sequelize);
const weekDays = require('../models/weekDaysModels')(sequelize, Sequelize);
const timeTable = require('../models/timeTableModel')(sequelize, Sequelize)

//define relation
user.belongsTo(userTypes, { foreignKey: 'UserTypeId' });
user.hasOne(userCredentials, { foreignKey: 'UserId' });
user.hasMany(userAddresses, { foreignKey: 'UserId' });
user.hasMany(userEducationDetails, { foreignKey: 'UserId' });
userCredentials.belongsTo(user, { foreignKey: 'UserId' });
userAddresses.belongsTo(user, { foreignKey: 'UserId' });
userEducationDetails.belongsTo(user, { foreignKey: 'UserId' });

userRoleMapper.belongsTo(user, { foreignKey: 'UserId' });
userRoleMapper.belongsTo(role, { foreignKey: 'RoleId' });
user.hasMany(userRoleMapper, { foreignKey: 'UserId' });
role.hasMany(userRoleMapper, { foreignKey: 'RoleId' });

featureRoleMapping.belongsTo(features, { foreignKey: 'FeatureId' });
featureRoleMapping.belongsTo(role, { foreignKey: 'RoleId' });
features.hasMany(featureRoleMapping, { foreignKey: 'FeatureId' });
role.hasMany(featureRoleMapping, { foreignKey: 'RoleId' });

activities.belongsTo(activityTypes, { foreignKey: 'ActivityTypeId' });
activities.belongsTo(activityStatus, { foreignKey: 'ActivityStatusId' });
activities.belongsTo(user, { foreignKey: 'SalesRepresentativeId' });

course.belongsTo(courseTypes, { foreignKey: 'CourseTypeId' });

enquiries.belongsTo(course, { foreignKey: 'CourseId' });
enquiries.belongsTo(pipeLinePhases, { foreignKey: 'PipeLinePhaseId' });
enquiries.belongsTo(user, { foreignKey: 'SalesPersonId' });

communicationLog.belongsTo(enquiries, { foreignKey: 'EnquiryId' });
communicationLog.belongsTo(user, { foreignKey: 'CustomerId' });
communicationLog.belongsTo(activities, { foreignKey: 'ActivityId' });
communicationLog.belongsTo(activityStatus, { foreignKey: 'ActivityStatusId' });
communicationLog.belongsTo(user, { foreignKey: 'SalesRepresentativeId' });

syllabus.belongsTo(subject, { foreignKey: 'SubjectId' });
syllabus.belongsTo(courseTypes, { foreignKey: 'CourseTypeId' });

admissions.belongsTo(enquiries, { foreignKey: 'EnquiryId' });
feePayments.belongsTo(admissions, { foreignKey: 'AdmissionId' });

timeTable.belongsTo(user, { foreignKey: 'FacultyId' });
timeTable.belongsTo(syllabus, { foreignKey: 'SyllabusId' });
timeTable.belongsTo(weekDays, { foreignKey: 'WeekDayId' });

db.userTypes = userTypes;
db.user = user;
db.userCredentials = userCredentials;
db.userAddresses = userAddresses;
db.userEducationDetails = userEducationDetails;
db.role = role;
db.userRoleMapper = userRoleMapper;
db.features = features;
db.featureRoleMapping = featureRoleMapping;
db.activityTypes = activityTypes;
db.activityStatus = activityStatus;
db.activities = activities;
db.pipeLinePhases = pipeLinePhases;
db.courseTypes = courseTypes;
db.course = course;
db.enquiries = enquiries;
db.communicationLog = communicationLog;
db.subject = subject;
db.syllabus = syllabus;
db.admissions = admissions;
db.feePayments = feePayments;
db.weekDays = weekDays;
db.timeTable = timeTable;


module.exports = db;
