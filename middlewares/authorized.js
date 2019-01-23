// 专门处理验证 token 的一个中间件函数
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports = function (req, res, next) {
  // 1. 获取 token
  const token = req.get('X-Access-Token');

  if (!token) {
    res.status(400).json({
      code: -100,
      msg: 'token 未传递'
    });
  } else {
    jwt.verify(token, secret, (error, data) => {
      if (error) {
        res.status(401).json({
          code: -110,
          msg: 'token 验证失败'
        })
      } else {
        // 将 data 给设置到 req 对象上, 在后续的代码流程中，就可以范文到 req.authData
        req.authData = data;
        next();
      }
    })
  }
}