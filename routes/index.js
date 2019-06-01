var express = require('express');
var router = express.Router();
// var conn = require('../db/db');
// console.log(conn)
// 引入nodemailer 
// var nodemailer = require('nodemailer');
// // 配置邮箱验证信息
// var transporter = nodemailer.createTransport({
//   host:'smtp.qq.com',
//   server:'qq',
//   surce:true,
//   auth:{
//     user:'455947455@qq.com',
//     pass:'iingpluvojhpcafd'
//   }
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/register', (req, res) =>{
//   res.send('ok')
// })
// //验证信息
// router.post('/verify', (req, res) =>{
//   // 接收前端传递过来的数据 
//   var email = req.body.email;
//   // res.send(req.body)
//   res.send(email);

//   console.log(email)
//   //配置需要发送的内容  
//   var mailOptions = {
//     from:'455947455@qq.com',
//     to:email,
//     // 邮件主题
//     subject:'验证文件信息',
//     text:String(Math.random()).substr(2,4)
//   };
//   // 发送邮件并有回调函数 
//   transporter.sendMail(mailOptions, function(err, info){
//     // 判断邮件是否发送成功 
//     if (err) {
//       // 返回错误信息
//      return  console.log(err);
//     // console.log(eamil)
//     } else {
//       // res.send('邮件发送成功')
//       console.log('发送成功')
//     }
//   })
// })
module.exports = router;
