import moment from 'moment'

export function formatDate({ date = new Date(), format = 'YYYY-MM-DD' }) {
  return moment(date).format(format)
}

/** Lấy số ngày trong 1 tháng */
export function getDaysInMonth(month, year) {
  // Here January is 1 based
  // Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate()
}

/** Trả về ngày cuối cùng tháng trước của ngày cần thực hiện  */
export function getPreviousMonth({ date = new Date(), format = 'YYYY-MM-DD' }) {
  return moment(date).subtract(1, 'months').endOf('month').format(format)
}

/** Lấy ngày đầu tiên của tháng */
export function getFirstDayInMonth(date = null) {
  if (date) {
    date = new Date(date)
  } else {
    date = new Date()
  }

  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/** Lấy ngày cuối cùng của tháng */
export function getLastDayInMonth(date = null) {
  if (date) {
    date = new Date(date)
  } else {
    date = new Date()
  }

  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/** Increment day */
export function incrementDay(date = new Date(), increment = 1) {
  return moment(date).add(increment, 'days')
}

/** Decrement day */
export function decrementDay(date = new Date(), increment = 1) {
  return moment(date).subtract(increment, 'days')
}

export function getObjDate(dateStr, format = 'YYYY-MM-DD') {
  return moment(dateStr, format)
}

/** Tra ve so ngay giua 2 ngay */
export const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24)
// getDaysDiffBetweenDates(new Date('2019-01-13'), new Date('2019-01-15')) // 2

/** Ktra ngay A > ngay B */
export const isAfterDate = (dateA, dateB) => dateA > dateB
// isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)) // true

export const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString()
// isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)) // true

export const maxDate = (...dates) => new Date(Math.max.apply(null, ...dates))
// const array = [
//   new Date(2017, 4, 13),
//   new Date(2018, 2, 12),
//   new Date(2016, 0, 10),
//   new Date(2016, 0, 9),
// ]
// maxDate(array) // 2018-03-11T22:00:00.000Z

export const minDate = (...dates) => new Date(Math.min.apply(null, ...dates))

export const tomorrow = () => {
  let t = new Date()
  t.setDate(t.getDate() + 1)
  return t.toISOString().split('T')[0]
}
// tomorrow() // 2019-09-08 (if current date is 2018-09-08)
//====================================================================

/** Trả về độ dài của String theo byte */
export const byteSize = (str) => new Blob([str]).size

/** Viết hoa chữ cái đầu tiên của câu */
export const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join('')

// capitalize('fooBar') // 'FooBar'
// capitalize('fooBar', true) // 'Foobar'

/** Chữ cái viết thường */
export const decapitalize = ([first, ...rest]) =>
  first.toLowerCase() + rest.join('')

/** Viết hoa chữ cái đầu tiên của mỗi từ */
export const capitalizeEveryWord = (str) =>
  str.replace(/\b[a-z]/g, (char) => char.toUpperCase())

/** Tách một chuỗi nhiều dòng thành một mảng hàng */
export const splitLines = (str) => str.split(/\r?\n/)

// splitLines('This\nis a\nmultiline\nstring.\n')
// ['This', 'is a', 'multiline', 'string.' , '']

export const stripHTMLTags = (str) => str.replace(/<[^>]*>/g, '')
// stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'

/** Đoạn mã này có thể được sử dụng để sắp xếp theo thứ tự abc các ký tự trong một chuỗi. */
export const sortCharactersInString = (str) =>
  [...str].sort((a, b) => a.localeCompare(b)).join('')
// sortCharactersInString('cabbage'); // 'aabbceg'

/** Convert String thành một Array */
export const words = (str, pattern = /[^a-zA-Z-]+/) =>
  str.split(pattern).filter(Boolean)

// words('I love javaScript!!') // ["I", "love", "javaScript"]
// words('python, javaScript & coffee') // ["python", "javaScript", "coffee"]

/** Convert Number to String */
export const convertNumberToStringArr = (arr) => arr.map(String)

/** Convert String to Number */
export const convertStringToNumberArr = (arr) => arr.map(Number)
// convertStringToNumberArr(['1', '2', '3'])

/** Fomaet JSON */
export const formattedJson = (obj) => JSON.stringify(obj, null, 4)

/** Convert Object to Query string parameters */
export const objectToQueryString = (obj) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
// objectToQueryString({ name: 'Anonystick', age: 18, address: 'VietNam' })
// name=Anonystick&age=18&address=VietNam

/** Lấy elements chung của 2 arrays */
export const similarity = (arr, values) => arr.filter((v) => values.includes(v))
// similarity([1, 2, 3], [1, 2, 4]); // [1,2]

/** Check loại thiết bị với javascript */
export const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop'

/** Chuyển đổi số thập phân */
export const toDecimalMark = (num) => num.toLocaleString('en-US')
// toDecimalMark(12305030388.9087) // "12,305,030,388.909"

/** Mảng đa chiều thành mảng một chiều */
export const deepFlatten = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)))
// deepFlatten([1, [2], [[3], 4], 5]) // [1,2,3,4,5]

/** Khoảng cách giữa 2 ngày */
export const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24)
// getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')) // 9

/** Copy mảng, check duplicate */
export const deDupe = (myArray) => [...new Set(myArray)]
// deDupe([1, 1, 2, 1, 3, 3, 4])
// [1, 2, 3, 4]

/** Check falsy values */
export const clean = (arr) => arr.filter(Boolean)
// clean([0, false, true, undefined, null, '', 12, 15])
// [true, 12, 15]

/** Unique elements in objects */
export const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some((x) => fn(v, x))) acc.push(v)
    return acc
  }, [])

// uniqueElementsBy(
// 	[
// 		{ id: 1, name: 'Jhon' },
// 		{ id: 2, name: 'sss' },
// 		{ id: 1, name: 'Jhon' },
// 	],
// 	(a, b) => a.id == b.id
// )
// [{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}]

/** Độ mạnh của mật khẩu phải là sự kết hợp giữa chữ in hoa và chữ thường và số. Các ký tự đặc biệt được bỏ qua và độ dài nằm trong khoảng từ 8-10.
 */
export const validatePassword = (password) =>
  /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(password)

/** This snippet converts a non-array value into array */
export const castArray = (val) => (Array.isArray(val) ? val : [val])
// castArray('foo') // ['foo']
// castArray([1]) // [1]

/** removes false values from an array */
export const compact = (arr) => arr.filter(Boolean)
// compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]) // [ 1, 2, 3, 'a', 's', 34 ]

/** counts the occurrences of a value in an array */
export const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
// countOccurrences([1, 1, 2, 1, 2, 3], 1) // 3

export const currentURL = () => window.location.href

/** gets the day of the year  */
export const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
// dayOfYear(new Date())

/** finds the difference between two arrays */
export const difference = (a, b) => {
  const s = new Set(b)
  return a.filter((x) => !s.has(x))
}
// difference([1, 2, 3], [1, 2, 4]) // [3]

/** gets a number as input and returns an array of its digits. */
export const digitize = (n) => [...`${n}`].map((i) => parseInt(i))
// digitize(431) // [4, 3, 1]

/** the distance between two points by calculating the Euclidean distance */
export const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)
// distance(1, 1, 2, 3) // 2.23606797749979

/** returns a new array with n elements removed from the left */
export const drop = (arr, n = 1) => arr.slice(n)
// drop([1, 2, 3]) // [2,3]
// drop([1, 2, 3], 2) // [3]
// drop([1, 2, 3], 42) // []

/** returns a new array with n elements removed from the right */
export const dropRight = (arr, n = 1) => arr.slice(0, -n)
// dropRight([1, 2, 3]) // [1,2]
// dropRight([1, 2, 3], 2) // [1]
// dropRight([1, 2, 3], 42) // []

/** removes duplicate values in an array */

export const filterNonUnique = (arr) =>
  arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i))
// filterNonUnique([1, 2, 2, 3, 4, 4, 5]) // [1, 3, 5]

/** Lay phan chung giua 2 mang */
export const intersection = (a, b) => {
  const s = new Set(b)
  return a.filter((x) => s.has(x))
}
// intersection([1, 2, 3], [4, 3, 2]) // [2, 3]

export const isBoolean = (val) => typeof val === 'boolean'
// isBoolean(null) // false
// isBoolean(false) // true

export const isNil = (val) => val === undefined || val === null
// isNil(null) // true
// isNil(undefined) // true

export const isNull = (val) => val === null
// isNull(null) // true

export const isNumber = (val) => typeof val === 'number'
// isNumber('1') // false
// isNumber(1) // true

export const isObject = (obj) => obj === Object(obj)
// isObject([]) // true
// isObject({ a: 1 }) // true
// isObject({}) // true
// isObject(true) // false

export const isString = (val) => typeof val === 'string'
// isString('10') // true

export const isSymbol = (val) => typeof val === 'symbol'
// isSymbol(Symbol('x')) // true

export const isUndefined = (val) => val === undefined

export const isValidJSON = (str) => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
// isValidJSON('{"name":"Adam","age":20}') // true
// isValidJSON('{"name":"Adam",age:"20"}') // false
// isValidJSON(null) // true

export const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n)
// maxN([1, 2, 3]) // [3]
// maxN([1, 2, 3], 2) // [3,2]

export const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n)

export const pad = (str, length, char = ' ') =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char)
// pad('cat', 8) // ' cat '
// pad(String(42), 6, '0') // '004200'
// pad('foobar', 3) // 'foobar'

export const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + n.slice(0, 6)
}
// randomHexColorCode() // "#e34155"

export const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  )
// randomIntArrayInRange(12, 35, 10) // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

export const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
// randomIntegerInRange(0, 5) // 3

export const randomNumberInRange = (min, max) =>
  Math.random() * (max - min) + min
// randomNumberInRange(2, 10) // 6.0211363285087005

export const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url)
// redirect('https://google.com')

export const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
// round(1.005, 2) // 1.01

/** get a random number from an array */
export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
// sample([3, 7, 9, 11]) // 9

export const sampleSize = ([...arr], n = 1) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr.slice(0, n)
}
// sampleSize([1, 2, 3], 2) // [3,1]
// sampleSize([1, 2, 3], 4) // [2,3,1]

export const sortCharactersInString = (str) =>
  [...str].sort((a, b) => a.localeCompare(b)).join('')
// sortCharactersInString('cabbage') // 'aabbceg'

export const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0)
// sum(1, 2, 3, 4) // 10
// sum(...[1, 2, 3, 4]) // 10

export const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: 'currency',
    currency: curr,
  }).format(n)
// toCurrency(123456.789, 'EUR') // €123,456.79 | currency: Euro | currencyLangFormat: Local
// toCurrency(123456.789, 'USD', 'en-us') // $123,456.79 | currency: US Dollar | currencyLangFormat: English (United States)
// toCurrency(123456.789, 'USD', 'fa') // ۱۲۳٬۴۵۶٫۷۹ ؜$ | currency: US Dollar | currencyLangFormat: Farsi
// toCurrency(322342436423.2435, 'JPY') // ¥322,342,436,423 | currency: Japanese Yen | currencyLangFormat: Local
// toCurrency(322342436423.2435, 'JPY', 'fi') // 322 342 436 423 ¥ | currency: Japanese Yen | currencyLangFormat: Finnish

export const validateNumber = (n) =>
  !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n
// validateNumber('10') // true

export function toVND(number = 0) {
  let x = number
  x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  return x
}
