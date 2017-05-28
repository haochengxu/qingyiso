const path = require('path')
var express = require('express');
var app = express();
var config = require('config-lite')
var mongoClient = require('./lib/mongo').MongoClient
var indexRouter = require('./routes/index');

app.use('/', indexRouter);
app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs
app.use(express.static('public'));



app.listen(9200, function() {
    console.log(123)
});