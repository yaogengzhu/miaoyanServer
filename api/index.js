// 引入mysql数据库配置 
var conn = require('../db/db');
// 引入md5加密方式
var md5 = require('md5');
// 引入时间
var moment = require('moment');
// 引入nodemailer 
var nodemailer = require('nodemailer');
// 配置邮箱验证信息 
var transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    server: 'qq',
    surce: true,
    auth: {
        user: '455947455@qq.com',
        // 加密处理
        pass: 'iingpluvojhpcafd'
    }
})

// 用户邮箱验证接口 
var verify = async (req, res) => {
    // 首先需要拿到用户注册邮箱 
    var email = req.body.email;
    // 验证码  
    var autoCode = String(Math.random()).substr(2, 4);
    // // 数据持久化，对数据存到season中 
    req.session.email = email;
    req.session.autoCode = autoCode;
    // 配置用户要发送的内容 
    var mailOption = {
        // 设置发件人信息 
        from: '"test"<455947455@qq.com>',
        // 设置收件人信息
        to: email,
        subject: '注册验证信息',
        // 随机验证码
        text: autoCode
    };
    // 发送邮件，并有回调函数 
    transporter.sendMail(mailOption, (err, info) => {
        if (err) return res.send('发送失败');
        res.send('发送成功！')
    })

}

// 用户注册接口  
var register = async (req, res) => {
    var code = req.body.autoCode;
    //首先接收用户传递过来的数据 
    // console.log(req.body)
    var userInfo = {} // 用来装用户数据
    userInfo.username = req.body.username;
    userInfo.email = req.body.email;
    userInfo.password = md5(req.body.password);
    userInfo.date = moment().format('YYYY-MM-DD hh:mm:ss');
    if (userInfo.email === req.session.email && code === req.session.autoCode) {
        // 增加数据
        var sqr = 'insert into users set?';
        conn.query(sqr, userInfo, (err, result) => {
            if (err) return console.log(err)
            if (result.affectedRows === 0) {
                return res.json({
                    message:'注册失败',
                    status:400
                })
            }
            res.json({
                message: '注册成功',
                status: 200
            })
        })
    }
}

// 用户登陆
var login = async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body;
    //数据库的查找数据（条件查找）
    var str = 'SELECT * from users WHERE username = ?'
    conn.query(str, username, (err, result) => {
        if (err) throw err;
        // 判断数据库是否存在数据,不存在，则给出用户密码不存在
        if (!result[0]) {
            return res.json({
                message: '用户名不存在',
                status: 400
            })
        }
        // 如果数据存在，则需要进行判断
        if (username === result[0].username && md5(password) ===result[0].password) {
            return res.json({
                message: "登陆成功",
                result: { username: result[0].username, email: result[0].email },
                status: 200
            })
        }
        res.json({
            message: '用户名或密码错误',
            status: 201
        })
    })
}

// 修改密码，首先得校验邮箱和用户名,邮箱校验成功之后，发送邮件，修改密码 
// var checkEmail = async (req, res) =>{
//     console.log(req.body)
//     const {username , email} = req.body;
//     // 数据库获取
//     let str = 'SELECT * from users WHERE email = ?';
//     conn.query(str, email , (err, result) =>{
//         // if (err) throw err ;
//         console.log(result);
//     })
// }



module.exports = {
    login,
    register,
    verify,
    checkEmail
}