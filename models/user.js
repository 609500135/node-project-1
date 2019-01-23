// 用户模型文件
const db = require('../config/db');

const schema = new db.Schema({
  userName: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

module.exports = db.model('user', schema);