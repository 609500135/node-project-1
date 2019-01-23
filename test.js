const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 调用 multer 得到一个 upload 对象
// upload 对象 他有很多方法
// upload.single('input-name-value')  单个文件上传，返回的是一个中间件函数
// upload.array('input-name-value', maxCount)   多个文件上传，返回的也是一个中间件函数
// upload.fields([{name: 'input-name-value', maxCount: 1}, {name: 'input-name-value', maxCount: 2}])  多个文件上传，返回。。。。
const upload = multer({
  dest: 'c:/tmp', // 设置文件的存放目录
})

const app = express();

// 单个文件的上传操作
app.post('/upload', upload.single('avatar'), (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  // res.send(req.file);

  // 为了要将图片生成一个url地址给到客户端页面进行访问。
  // 1. 将文件移动到当前项目的public文件夹下。
  // 2. 对文件名做一些个修改。

  // 命令规则：当前时间戳 + '_' + 源文件名
  let newFileName = new Date().getTime() + '_' + req.file.originalname;
  
  // 新的存放完整路径
  let newFilePath = path.resolve(__dirname, './public/uploads/' + newFileName);

  try {
    let data = fs.readFileSync(req.file.path);
    fs.writeFileSync(newFilePath, data);
    fs.unlinkSync(req.file.path);
    // TODO
    // 将 图片的路径存到数据库中就好了。
  } catch (error) {
    res.json({
      code: -1,
      msg: error.message
    })
  }
  
})

app.listen(3000);