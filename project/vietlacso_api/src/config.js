const CONFIG = {
  secret: 'worldisfullofdevelopers',
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456a@',
    database: 'sxmb',
    insecureAuth: true,
  },
  mongo: 'mongodb://127.0.0.1:27017/vietlacso',
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '',
    database: 9,
    prefix: 'vl:',
  },
  queue_url: 'amqp://user:password@localhost',
  vietlac_getfly_crm: {
    base_url: 'https://vietlac.getflycrm.com',
    api_key: 'iamapikeysecret',
  },
  gmail: {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'username@gmail.com',
    password: '123456a@',
    secure: false
  }
}

export default CONFIG
