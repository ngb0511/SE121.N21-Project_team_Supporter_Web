// Require packages and set the port 
const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
let ejs = require('ejs');
const routes = require('./routes/routes');

//Use cors to unlock 
app.use(cors());

// Use Node.js body parsing middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Start the server 
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});


// module.exports = roles;

routes(app);