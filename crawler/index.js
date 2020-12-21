const isOnline = require('is-online')
const publicIp = require('public-ip')
const address = require('address')

console.log('ok')

isOnline()
  .then((r) => console.log('[R]online:', r))
  .catch((e) => console.error('[E]', e))

// es6
let name = 'machine name';
let machine = {
    [name]: 'server',
    'machine hours': 10000,
    age: 30,
    'address': 'hn',
    1: 'mot'
};

console.log('name:', machine[name], machine['machine name']); // server
console.log('hour:', machine['machine hours']); // 10000
console.log('age:', machine.age)
console.log('addr:', machine.address)
console.log('mot:', machine[1])

// promise all
//Lấy thông tin chi tiết của page
function getDetailPage() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('Thông tin chi tiết của page tips javascript')
    }, 300)
  })
}

//Lấy thông tin giới thiệu về page
function getInfoPage() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('lấy thông tin giới thiệu của page tips javascript')
    }, 400)
  })
}

//Lấy những bài viết mới nhất của page
function getArticlesPage() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('Lấy những bài viết mới nhất của page tips javascript')
    }, 500)
  })
}

function initLoad() {
  // loading.show() //hiên thị icon loading lên :D
  Promise.all([getDetailPage(), getInfoPage(), getArticlesPage()])
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

initLoad()

function verify1(content) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(true)
    }, 200)
  })
}

function verify2(content) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(true)
    }, 700)
  })
}

function verify3(content) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(true)
    }, 300)
  })
}

Promise.all([verify1('verify1'), verify2('verify2'), verify3('verify3')])
  .then((result) => {
    console.log(result) //[true, true, true]

    let verifyResult = result.every((item) => item)
    //check qua xem đúng hết chưa?
    console.log('verify:', verifyResult)
  })
  .catch((err) => {
    console.log(err)
  })

// get ip public
publicIp
  .v4()
  .then((r) => console.log('[R4]', r))
  .catch((e) => console.error('[E]', e))

publicIp
  .v6()
  .then((r) => console.log('[R6]', r))
  .catch((e) => console.error('[E]', e))

console.log('IPv4:', address.ip())
console.log('IPv6:', address.ipv6())
address.mac(function (err, addr) {
  console.log('MAC:', addr) // '78:ca:39:b0:e6:7d'
})

// Reduce
const numbers = [5, 10, 15, 3]
const total = numbers.reduce((accumulator, item) => {
  console.log(`round - ${accumulator}:${item}`)
  return accumulator + item
})
console.log('Total:', total)

const convertArrayToObject = (array, key) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    console.log(`obj: item: init:`, obj, item, initialValue, [item[key]], item[key]);
    return {
      ...obj,
      [item[key]]: item
    }
  }, initialValue)
}
const players = [
  { id: 11, name: 'Messi', age: 33 },
  { id: 12, name: 'Ronaldo', age: 34 },
  { id: 15, name: 'Salah', age: 24 },
]

const playersModified = convertArrayToObject(players, 'id')
console.log('modified:', playersModified)

const getMapFromArray = (data) => {
  return data.reduce((obj, item) => {
    obj[item.name] = { team: item.team }
    return obj
  }, {})
}
const playerProfile = [
    { name: "Ronaldo", team: "Juventus " },
    { name: "Messi", team: "Barcelona" },
    { name: "Mane", team: "Liverpool" }
  ];
const playerProfileModified = getMapFromArray(playerProfile)
console.log(playerProfileModified)
