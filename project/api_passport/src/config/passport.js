const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { userService } = require('../services');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await userService.getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/v1/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const data = {
        name: profile.displayName,
        email: profile.emails[0].value,
        password: '123456a@',
        OAuthProvider: 'Google',
        OAuthId: profile.id,
      };
      console.log('callback', data, 'accessToken', accessToken);
      const currentUser = await userService.findOne({ OAuthId: profile.id });
      if (currentUser) {
        // if we already have a record with the given profile ID
        done(null, currentUser);
      } else {
        // if not, create a new user
        const newUser = await userService.createUser(data);
        done(null, newUser);
      }
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = {
  jwtStrategy,
  googleStrategy
};
