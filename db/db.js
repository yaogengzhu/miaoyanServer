// 引入数据库
const mysql = require('mysql');
// 连接数据库 
let conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    // 密码为12345678
    password:'12345678',
    database:'miaoyan'
})

// 连接数据库
conn.connect();
module.exports = conn;