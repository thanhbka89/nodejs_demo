const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const { googleAccessToken } = require('../services/api.service');

const register = catchAsync(async (req, res) => {
  const body = { ...req.body, verificationToken: tokenService.randomTokenString() };
  const user = await userService.createUser(body);
  const tokens = await tokenService.generateAuthTokens(user);
  await emailService.sendVerifyEmail({to: user.email, token: user.verificationToken, origin: req.get('host')});
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  req.logout(); //remove the req.user property and clear the login session (if any)
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const callbackGoogle = catchAsync(async (req, res) => {
  const user = req.user;
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ authen: req.isAuthenticated(), user, tokens });
});

const googleVerifyToken = catchAsync(async (req, res) => {
  const response = { user: null, tokens: null };
  const info = await googleAccessToken(req.body.token);
  const user = await userService.findOne({ email: info.data.email, OAuthId: info.data.sub });
  if (user) {
    response.user = user;
    response.tokens = await tokenService.generateAuthTokens(user);
  }
  res.send(response);
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query);
  res.json({ message: 'Verification successful, you can now login' });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  callbackGoogle,
  verifyEmail,
  googleVerifyToken,
};
