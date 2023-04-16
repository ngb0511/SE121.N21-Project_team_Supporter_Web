var mysql = require('mysql'); // get mysql

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Jerrynguyen05.14',
    database: 'citrosweb'
});

db.connect(function(err){
    if(err){
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + db.threadId);
});

module.exports = db;
