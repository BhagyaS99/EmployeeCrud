const mysql = require('mysql2/promise')
const mysqlpool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'employeeinfo',
    port:3306

})

module.exports = mysqlpool