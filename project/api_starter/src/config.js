const CONFIG = {
  port: 9000,
  secret: 'worldisfullofdevelopers',
  accessTokenLife: '7d', // 7 days
  refreshToken: {
    secret: '!@#refreshTokenSecret#$%',
    expire: '30d' // 30 days
  },
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456a@',
    database: 'sxmb',
    insecureAuth: true,
  },
  mongo: 'mongodb://vlscms:Fbecx4KjVsSFLyck@27.72.56.116:9528/vietlacso',
  redis: {
    host: '27.72.56.116',
    port: 6379,
    password: '',
    database: 9,
    prefix: 'vl:',
  },
  queue_url: 'amqp://edvkxabx:0WeXPv0Fsy1CzoM5cg8F9axd0PYm1C5c@salamander.rmq.cloudamqp.com/edvkxabx',
  vietlac_getfly_crm: {
    base_url: 'https://vietlac.getflycrm.com',
    api_key: 'iamapikeysecret',
  },
  gmail: {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'username@gmail.com',
    password: '123456a@',
    secure: false,
  },
  storage: {
    username: 'thanhnguyen',
    api_key: '326185179723966',
    secret: 'xVoXbHVA9P4hK45SpzN5XQz5aIQ',
  },
}

switch (process.env.NODE_ENV) {
  case 'test':
    CONFIG.port = 3000
    CONFIG.mongo = 'mongodb://vlscms:Fbecx4KjVsSFLyck@27.72.56.116:9528/vietlacso-test'
    break

  case 'dev':
    CONFIG.port = 3000
    CONFIG.mongo = 'mongodb://vlscms:Fbecx4KjVsSFLyck@27.72.56.116:9528/vietlacso-test'
    break

  case 'production':
    break
}

export default CONFIG
