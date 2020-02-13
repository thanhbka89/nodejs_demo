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
	return moment(date)
		.subtract(1, 'months')
		.endOf('month')
		.format(format)
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

/** Trả về độ dài của String theo byte */
export const byteSize = str => new Blob([str]).size

/** Viết hoa chữ cái đầu tiên của câu */
export const capitalize = ([first, ...rest]) =>
	first.toUpperCase() + rest.join('')

// capitalize('fooBar') // 'FooBar'
// capitalize('fooBar', true) // 'Foobar'

/** Chữ cái viết thường */
export const decapitalize = ([first, ...rest]) =>
	first.toLowerCase() + rest.join('')

/** Viết hoa chữ cái đầu tiên của mỗi từ */
export const capitalizeEveryWord = str =>
	str.replace(/\b[a-z]/g, char => char.toUpperCase())

/** Tách một chuỗi nhiều dòng thành một mảng hàng */
export const splitLines = str => str.split(/\r?\n/)

// splitLines('This\nis a\nmultiline\nstring.\n')
// ['This', 'is a', 'multiline', 'string.' , '']

export const stripHTMLTags = str => str.replace(/<[^>]*>/g, '')
// stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'

/** Đoạn mã này có thể được sử dụng để sắp xếp theo thứ tự abc các ký tự trong một chuỗi. */
export const sortCharactersInString = str =>
	[...str].sort((a, b) => a.localeCompare(b)).join('')
// sortCharactersInString('cabbage'); // 'aabbceg'

/** Convert String thành một Array */
export const words = (str, pattern = /[^a-zA-Z-]+/) =>
	str.split(pattern).filter(Boolean)

// words('I love javaScript!!') // ["I", "love", "javaScript"]
// words('python, javaScript & coffee') // ["python", "javaScript", "coffee"]

/** Convert Number to String */
export const convertNumberToStringArr = arr => arr.map(String)

/** Convert String to Number */
export const convertStringToNumberArr = arr => arr.map(Number)
// convertStringToNumberArr(['1', '2', '3'])

/** Fomaet JSON */
export const formattedJson = obj => JSON.stringify(obj, null, 4)

/** Convert Object to Query string parameters */
export const objectToQueryString = obj =>
	Object.keys(obj)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
		.join('&')
// objectToQueryString({ name: 'Anonystick', age: 18, address: 'VietNam' })
// name=Anonystick&age=18&address=VietNam

/** Lấy elements chung của 2 arrays */
export const similarity = (arr, values) => arr.filter(v => values.includes(v))
// similarity([1, 2, 3], [1, 2, 4]); // [1,2]

/** Check loại thiết bị với javascript */
export const detectDeviceType = () =>
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(
		navigator.userAgent
	)
		? 'Mobile'
		: 'Desktop'

/** Chuyển đổi số thập phân */
export const toDecimalMark = num => num.toLocaleString('en-US')
// toDecimalMark(12305030388.9087) // "12,305,030,388.909"

/** Mảng đa chiều thành mảng một chiều */
export const deepFlatten = arr =>
	[].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))
// deepFlatten([1, [2], [[3], 4], 5]) // [1,2,3,4,5]

/** Khoảng cách giữa 2 ngày */
export const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
	(dateFinal - dateInitial) / (1000 * 3600 * 24)
// getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')) // 9

/** Copy mảng, check duplicate */
export const deDupe = myArray => [...new Set(myArray)]
// deDupe([1, 1, 2, 1, 3, 3, 4])
// [1, 2, 3, 4]

/** Check falsy values */
export const clean = arr => arr.filter(Boolean)
// clean([0, false, true, undefined, null, '', 12, 15])
// [true, 12, 15]

/** Unique elements in objects */
export const uniqueElementsBy = (arr, fn) =>
	arr.reduce((acc, v) => {
		if (!acc.some(x => fn(v, x))) acc.push(v)
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
export const validatePassword = password =>
	/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(password)
