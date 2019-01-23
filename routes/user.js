const express = require('express');
const UserModel = require('../models/user');
const router = express.Router();

// 登录接口 http://localhost:3000/user/login
router.post('/login', (req, res) => {
  // 1. 得到用户发来的用户名与密码
  let userName = req.body.userName;
  let password = req.body.password;

  // 2. 验证数据库
  UserModel.findOne({
    userName: userName,
    password: password
  }).then(data => {
    console.log(data);
    // 创建 token 
    res.json({
      code: 0,
      msg: 'ok',
      data: data
    })
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

module.exports = router;