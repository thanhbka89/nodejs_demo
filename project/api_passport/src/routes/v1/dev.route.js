const express = require('express');
const catchAsync = require('../../utils/catchAsync');
const { instance, apiNoAuth, apiTest, apiGoogle, googleAccessToken, runAll } = require('../../services/api.service');

const router = express.Router();

router.get('/lab', (req, res) => {
  console.log('origin', req.get('host'));
  const username = 'thanhnm';
  const password = '123456a@';

  const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  res.json({ token });
});

router.get('/run-all', async (req, res) => {
  try {
    const [response1, response2] = await runAll([
      apiNoAuth({ method: 'get', url: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-18' }),
      apiNoAuth({ method: 'get', url: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-17' }),
    ]);
    console.log(response1.data);

    // console.log(response2.data.url);
    // console.log(response2.data.explanation);
  } catch (error) {
    console.log(error.response.body);
  }

  res.json('ok');
});

router.get(
  '/callout',
  catchAsync(async (req, res) => {
    const config = {
      method: 'get',
      url: 'http://webcode.me',
      data: {
        name: 'Jane',
        country: 'Canada',
      },
      headers: { 'User-Agent': 'Console app', 'x-rapidapi-host': 'example.com', 'x-rapidapi-key': 'iamkey' },
      params: {
        search: 'parameter',
      },
    };
    // let response = await apiNoAuth(config);
    let response = await apiTest(config);

    let data = response.data;
    res.json(data);
  })
);

router.get(
  '/verify-token',
  catchAsync(async (req, res) => {
    console.log('123');
    let token =
      'ya29.a0AfH6SMB5B7PTw9F947l-NyxlRlB40TNBs1ydwmRoeowFoIuc-hkhpjMo_4acdneKkrRRzLjrgTEfpO-P_ADw26MGhF73im2NGE3ODjPBpillEmrqiCa47C_Ms6I19iH3DMdhxCBm3s7wjzwVtoqXjAI0OQQKrgUhKOl1nvP1rXeCng';
    const ret = await googleAccessToken(token);
    console.log(ret.data);
    res.json('ret');
  })
);

module.exports = router;
