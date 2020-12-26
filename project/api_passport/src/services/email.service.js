const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

/**
 * Trước khi gửi thư, nếu sử dụng gmail thì 
 * bạn phải cài đặt cho phép ứng dụng truy cập gmail bằng cách click link:
 * https://myaccount.google.com/lesssecureapps 
 * và bật tính năng bên dưới
 */

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((e) =>
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env ' + e.message)
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  try {
    const msg = { from: config.email.from, to, subject, text };
    await transport.sendMail(msg);
  } catch (e) {
    console.error('[Error_Send_Email]', e);
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verify email when register new user
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerifyEmail = async ({ to, token, origin }) => {
  const endpoint = `${origin}/v1/auth/verify-email`;
  const subject = 'Verify email';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${endpoint}?token=${token}`;
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerifyEmail,
};
