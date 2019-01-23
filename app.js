// 项目入口文件
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const kuayu = require('./middlewares/kuayu');

app.use(kuayu);

// 引入的路由中间的文件
const indexRouter = require('./routes/index');
const bannerRouter = require('./routes/banner');
const userRouter = require('./routes/user');

// 设置 静态文件托管
app.use(express.static(path.resolve(__dirname, './public')));

// 使用中间件 - cookie
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置模板文件的路径与使用的什么模板引擎
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

// 路由中间件的使用
app.use('/', indexRouter);
app.use('/banner', bannerRouter);
app.use('/user', userRouter);


app.listen(3000);