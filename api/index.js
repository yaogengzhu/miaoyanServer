// 引入mysql数据库配置 
var conn = require('../db/db');

// 引入nodemailer 
var nodemailer = require('nodemailer');
// 配置邮箱验证信息 
var transporter = nodemailer.createTransport({
    host:'smtp.qq.com',
    server:'qq',
    surce:true,
    auth:{
        user:'455947455@qq.com',
        pass:'*******'
    }
})

// 用户登陆
var login = async (req, res) =>{
    // res.send('login')
    // console.log(req.session.email)
    // console.log(req.session.autoCode)
    res.json({
        email:req.session.email,
        autoCode:req.session.autoCode
    })
    
    
    // res.json(req.session)
}
// 用户注册接口  
var register = async (req, res) =>{
    //
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