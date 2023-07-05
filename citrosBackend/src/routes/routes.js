//const RoleController = require('../controllers/RoleController');
const userRouter = require('./user');
const reportRouter = require('./report');
//const roleRouter = require('./role');
const projectRouter = require('./project');
const majorRouter = require('./major');
const accountRouter = require('./account');
const progressRouter = require('./progress');
const contacInfoRouter = require('./contactInfo');
const registrantRouter = require('./registrant');
const participateRouter = require('./participate');
const projectFileRouter = require('./projectFile');

function routers(app) {
    app.use('/user', userRouter);
    app.use('/report', reportRouter);
    //app.use('/role', roleRouter);
    app.use('/project', projectRouter);
    app.use('/major', majorRouter);
    app.use('/account', accountRouter);
    app.use('/progress', progressRouter);
    app.use('/contacInfo', contacInfoRouter);
    app.use('/registrant', registrantRouter);
    app.use('/participate', participateRouter);
    app.use('/projectFile', projectFileRouter);
}
    
// Export the router 
module.exports = routers;