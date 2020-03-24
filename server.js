const compression = require('compression');
const cors = require('cors');
const emoji = require('node-emoji');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const responseTime = require('response-time');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

var limiter = new rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.disable('x-powered-by');

app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(helmet());
app.use(limiter);
app.use(morgan('dev'));
app.use(responseTime());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.set('port', process.env.PORT || 3000);
app.set('ipaddr', '0.0.0.0');

app.listen(app.get('port'), app.get('ipaddr'), function () {
  console.log(
    emoji.get('heart'),
    'The server is running @ ' + 'http://localhost/' + app.get('port'),
    emoji.get('heart')
  );
});
