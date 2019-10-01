var mysql = require('mysql')
var util = require('util')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Welcome1@2019',
    database: 'grubhub'
});

pool.query = util.promisify(pool.query);

pool.getConnection((err, connection) => {
    if (err) {

    }
    if (connection) {
        connection.release();
    }
    return
});

module.exports = pool