var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);



// 引用linebot SDK
const linebot = require('linebot');

// 用於辨識Line Channel的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESSTOKEN
});

const linebotParser = bot.parser();

app.post('/linewebhook', linebotParser);

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  console.log(event);

// { type: 'message',
//   replyToken: '4d87d7da440f4c0ebbf5326979dac640',
//   source:
//   { userId: 'U05907e6c4214d59cf0be704fad0449ce',
//     type: 'user',
//     profile: [Function],
//     member: [Function]
//   },
//   timestamp: 1555846956722,
//   message:
//   { type: 'text',
//     id: '9731880187339',
//     text: '2',
//     content: [Function]
//   },
// reply: [Function] }

    // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者

  event.reply('沒錯! 就是'+ event.message.text + "!").then(function (data) {
    // 當訊息成功回傳後的處理
    console.log('Success', data);
  }).catch(function (error) {
    // 當訊息回傳失敗後的處理
    console.log('Error', error);
  });
});


// Bot所監聽的webhook路徑與port
app.listen( process.env.PORT || 3000 , function () {
    console.log('[BOT已準備就緒]');
});



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
