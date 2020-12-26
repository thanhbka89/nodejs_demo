const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const cookieSession = require('cookie-session');

const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy, googleStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// Simple cookie-based session middleware
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // milliseconds of a day (24h)
    keys: [process.env.COOKIE_SESSION],
  })
);

// jwt authentication
app.use(passport.initialize());
app.use(passport.session());
// used to serialize the user for the session
passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log('deserialize', user);
  done(null, user);
});
passport.use('jwt', jwtStrategy);
passport.use(googleStrategy);

app.get('/', (req, res) => {
  // res.json('API v1')
  // res.send('Done')
  res.send({ success: true });
  // res.send(Buffer.from('whoop'))
});

app.get('/auth/current_user', (req, res) => {
  res.json({ google: req.user });
});
app.get('/auth/logout', (req, res) => {
  req.logout(); //remove the req.user property and clear the login session (if any)
  res.redirect('/');
});

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
