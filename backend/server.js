import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';
import emoji from 'node-emoji';
import responseTime from 'response-time';
import favicon from 'serve-favicon';
import indexRouter from './routes/index';
import playerRouter from './routes/player';
import userRouter from './routes/user';

const app = express();

// secure the server by setting various HTTP headers
app.use(helmet());

// only parse JSON
app.use(express.json());

// only parse urlencoded bodies
app.use(express.urlencoded({ extended: false }));

// protect against HTTP parameter pollution attacks
app.use(hpp());

// gzip/deflate/br compression outgoing responses
app.use(compression());

// parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// allow AJAX requests to skip the Same-origin policy and access resources from remote hosts
app.use(cors());

// serve a visual favicon for the browser
app.use(favicon(__dirname + '/favicon.ico'));

// request logger | (dev) output are colored by response status
app.use(morgan('dev'));

// records the response time for HTTP requests
app.use(responseTime());

// limit repeated requests to endpoints such as password reset
app.use(
  new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: 'Too many requests from this IP, please try again in 15 minutes'
  })
);

// loads environment variables from a config.env file into process.env
dotenv.config({ path: 'config.env' });

// prevent MongoDB operator injection by sanitizing user data.
app.use(mongoSanitize());

// mongodb connection
mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.MONGO_PORT}/${process.env.DATABASE}`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log(emoji.get('heavy_check_mark'), 'MongoDB connection success');
  });

// routes
app.use('/', indexRouter);
app.use('/player', playerRouter);
app.use('/user', userRouter);

// setup ip address and port number
app.set('port', process.env.PORT || 3000);
app.set('ipaddr', '0.0.0.0');

// start express server
app.listen(app.get('port'), app.get('ipaddr'), function () {
  console.log(emoji.get('heart'), 'The server is running @ ' + 'http://localhost/' + app.get('port'), emoji.get('heart'));
});
