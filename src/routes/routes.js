const RoleController = require('../controllers/RoleController');
const userRouter = require('./user');
const roleRouter = require('./role');
const majorRouter = require('./major');

function routers(app) {
    app.use('/user', userRouter);
    app.use('/role', roleRouter);
    app.use('/major', majorRouter)
}
    
// Export the router 
module.exports = routers;