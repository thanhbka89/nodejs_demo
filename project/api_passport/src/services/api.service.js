const axios = require('axios');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// Create instance called instance
const instance = axios.create({
  baseURL: 'https://example.com',
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'example.com',
    'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'iamkey',
  },
});

const apiNoAuth = (config) => axios(config);

const apiJwt = axios.create({
  baseURL: 'https://example.com',
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer YOUR_JWT_TOKEN_HERE',
  },
});

const apiTest = axios.create({
  baseURL: 'http://webcode.me',
  headers: {},
});

const apiGoogle = axios.create({
  baseURL: 'https://oauth2.googleapis.com',
});

//==========================================
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent,
    // like we're inserting a timeout for only requests with a particular baseURL
    if (config.baseURL === 'https://axios-app.firebaseio.com/users.json') {
      config.timeout = 4000;
    }
    // console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data like console.log,
    // change header, or as we did here just added a conditional behaviour, to change the route or pop up an alert box, based on the reponse status
    if (response.status === 200 || response.status === 201) {
      // router.replace('homepage');
    }
    // console.log(response);
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

//==========================================
const googleAccessToken = async (token) => {
  try {
    return await apiGoogle({
      method: 'GET',
      url: '/tokeninfo',
      params: {
        access_token: token,
      },
    });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, JSON.stringify(error.response.data));
  }
};

const runAll = async (request = []) => await axios.all(request);

module.exports = {
  instance,
  apiJwt,
  apiNoAuth,
  apiTest,
  apiGoogle,
  googleAccessToken,
  runAll,
};
