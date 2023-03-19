const MySql = require('sync-mysql');
require('dotenv').config();


var connection = new MySql({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

});

const mysql = (query) => {
    return connection.query(query);
}

exports.mysql = mysql;