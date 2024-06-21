const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const db = require('./config/db.config');
const userTypeRoute = require('./route/userTypeRoute');
const userRoute=require('./route/userRoute');
const userCredentialsRoute=require('./route/userCredentialsRoute');
const userAddressRoute=require('./route/userAddressRoute');
const userEducationDetailsRoute=require('./route/userEducationDetailsRoute');
const roleRoute=require('./route/roleRoute');
const userRoleMapperRoute=require('./route/userRoleMapperRoute');
const featuresRoute=require('./route/featuresRoute');
const featureRoleMappingRoute=require('./route/featureRoleMappingRoute');
const activityTypeRoute=require('./route/activityTypeRoute');
const activityStatusRoute=require('./route/activityStatusRoute');
const activitiesRoute=require('./route/activitiesRoute');
const pipeLinePhasesRoute=require('./route/pipeLinePhasesRoute');
const courseTypeRoute=require('./route/courseTypeRoute');
const courseRoute=require('./route/courseRoute');
const enquiriesRoute=require('./route/enquiriesRoute');
const communicationLogRoute=require('./route/communicationLogRoute');
const subjectRoute=require('./route/subjectRoute');
const syllabusRoute=require('./route/syllabusRoute');
const admissionRoute=require('./route/admissionRoute');
const feePaymentRoute=require('./route/feePaymentRoute');
const weekDaysRoute=require('./route/weekDaysRoute');
const timeTableRoute=require('./route/timeTableRoute');
const authRoute=require('./route/authRoute');

const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

db.sequelize.sync({force:false});

app.use(bodyParser.json());
app.use(cors());

app.use('/userType', userTypeRoute);
app.use('/user',userRoute);
app.use('/userCredentials', userCredentialsRoute);
app.use('/userAddress', userAddressRoute);
app.use('/userEducationDetails',userEducationDetailsRoute);
app.use('/role',roleRoute);
app.use('/userRoleMapper',userRoleMapperRoute);
app.use('/features',featuresRoute);
app.use('/featureRole',featureRoleMappingRoute);
app.use('/activityType',activityTypeRoute);
app.use('/activityStatus',activityStatusRoute);
app.use('/activities',activitiesRoute);
app.use('/pipeLinePhases',pipeLinePhasesRoute);
app.use('/courseType',courseTypeRoute);
app.use('/course',courseRoute);
app.use('/enquiries',enquiriesRoute);
app.use('/communicationLog',communicationLogRoute);
app.use('/subject',subjectRoute);
app.use('/syllabus',syllabusRoute)
app.use('/admissions',admissionRoute);
app.use('/feePayments',feePaymentRoute);
app.use('/weekDays',weekDaysRoute);
app.use('/time',timeTableRoute);
app.use('/auth',authRoute);


app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});
