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
    host:'smtp.qq.com',
    server:'qq',
    surce:true,
    auth:{
        user:'455947455@qq.com',
        // 加密处理
        pass:'********'
    }
})
// 用户登陆
var login = async (req, res) =>{
    //登陆接口。暂时不测试 
}

// 用户注册接口  
var register = async (req, res) =>{
    var code = req.body.autoCode;
    //首先接收用户传递过来的数据 
    // console.log(req.body)
    var users = {} // 用来装用户数据
    users.username = req.body.username;
    users.email = req.body.email;
    users.password = md5(req.body.password);
    // users.date = moment().format('L');

    conn.query('select * from users', (err, result) =>{
        if(err) return console.log(err)
        // console.log(result)
    })
    if (users.email === req.session.email && code === req.session.autoCode){
        // 
        res.send('数据一致，可以注册')
        var sqr = 'insert into users set?';
        conn.query(sqr,users, (err,result) =>{
            if (err) return console.log(err)
            // res.send('ok')
            console.log(result)
        })
    }
}

// 用户邮箱验证接口 
var verify = async (req, res) =>{
    // 首先需要拿到用户注册邮箱 
    var email = req.body.email;
    // 验证码  
    var autoCode = String(Math.random()).substr(2,4);

    // // 数据持久化，对数据存到season中 
    req.session.email = email;
    req.session.autoCode = autoCode;

    // 配置用户要发送的内容 
    var mailOption = {
        // 设置发件人信息 
        from:'"test"<455947455@qq.com>',
        // 设置收件人信息
        to:email,
        subject:'注册验证信息',
        // 随机验证码
        text:autoCode
    };
    // 发送邮件，并有回调函数 
    transporter.sendMail(mailOption, (err,info) =>{
        if (err) return res.send('发送失败');
        res.send('发送成功！')
    })

}

module.exports = {
    login,
    register,
    verify
}