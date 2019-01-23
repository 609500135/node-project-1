const express = require('express');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const authorized = require('../middlewares/authorized');
const router = express.Router();

// 登录接口 http://localhost:3000/user/login
router.post('/login', (req, res) => {
  // 1. 得到用户发来的用户名与密码
  let userName = req.body.userName;
  let password = req.body.password;

  console.log(userName);
  console.log(password);

  // 2. 验证数据库
  UserModel.findOne({
    userName: userName,
    password: password
  }).then(data => {
    console.log(data);
    if (data) {
      // 创建 token 
      const token = jwt.sign({
        userName: data.userName
      }, secret);
  
      res.json({
        code: 0,
        msg: 'ok',
        data: {
          token: token
        }
      })
    } else {
      res.json({
        code: -1, 
        msg: '用户名或密码错误'
      })
    }
  
  }).catch(error => {
    res.json({
      code: -1,
      msg: error.message
    })
  })
  
})

// 注册接口 http://localhost:3000/user/register
router.post('/register', (req, res) => {
  // 1. 得到用户发来的用户名与密码
  let userName = req.body.userName;
  let password = req.body.password;

  // 注册
  var user = new UserModel({
    userName: userName,
    password: password
  });

  user.save().then(() => {
    res.json({
      code: 0,
      msg: 'ok'
    })
  }).catch(error => {
    res.json({
      code: -1,
      msg: error.message
    })
  })
})

router.post('/getMe', authorized, (req, res) => {
  res.send('hello world');
})

module.exports = router;