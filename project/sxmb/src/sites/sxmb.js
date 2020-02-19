const _ = require('lodash')
const axios = require('axios')
const cheerio = require('cheerio')

import * as __helper from '../utils'
import service from '../services'

let currentDay = new Date()

const fetchHTML = async url => {
	try {
		const { data } = await axios.get(url)

		return cheerio.load(data)
	} catch (err) {
		throw err
	}
}

async function scapeXSKT(url, runOfDay = '01-01-2000') {
	const sxmb = []
	let result = [],
		city = 'N/A'
	const $ = await fetchHTML(url)
	$('table#MB0 tbody > tr').each((idx, el) => {
		sxmb.push($(el).text())
	})
	sxmb.forEach((val, idx) => {
		let row = val.replace(/\n/g, ' ').trim() // remove all character \n
		let data = row.split(' ')
		let giai = data[0] || 'N#A'
		let tmp = [],
			ketqua = []

		// get giai DB
		switch (giai) {
			case 'XSMB>': // get city
				city = row.split('(')[1].split(')')[0] || 'N/A'
				break
			case 'ĐB':
			case 'G1':
				ketqua = [data[1]]
				break
			case 'G2':
				ketqua = [data[1], data[2]]
				break
			case 'G3':
				tmp = data[3].match(/.{5}/g)
				ketqua = [data[1], data[2], tmp[0], tmp[1], data[4], data[5]]
				break
			case 'G4':
				ketqua = [data[1], data[2], data[3], data[4]]
				break
			case 'G5':
				tmp = data[3].match(/.{4}/g)
				ketqua = [data[1], data[2], tmp[0], tmp[1], data[4], data[5]]
				break
			case 'G6':
				ketqua = [data[1], data[2], data[3]]
				break
			case 'G7':
				ketqua = [data[1], data[2], data[3], data[4]]
				break
			default:
		}
		if (ketqua.length) result.push({ giai, ketqua: ketqua.join(' ') })
	})
	let objDate = new Date(__helper.getObjDate(runOfDay, 'DD-MM-YYYY'))
	let data = {
		date: runOfDay,
		dayOfMonth: objDate.getDate(),
		month: objDate.getMonth(),
		year: objDate.getFullYear(),
		dayOfWeek: objDate.getDay(),
		city,
		data: JSON.stringify(result),
	}
	// console.log('[RAW]', sxmb, data)
	const response = await service.masterService.modify(data)
	console.log(runOfDay, response)

	return response
}

async function runXSKT(isFull = false) {
	// default = current date - 3 day ago
	let beginDay = __helper.decrementDay(new Date(), 3)
	if (isFull) beginDay = new Date(2006, 3, 4) // 05.04.2006
	let initDay = beginDay
	const chunk = 50
	let promiseAll = []
	let index = 0
	while (initDay < currentDay) {
		++index
		initDay = __helper.incrementDay(initDay)
		let formatedDay = __helper.formatDate({
			date: initDay,
			format: 'DD-MM-YYYY',
		})
		let url = `https://xskt.com.vn/ket-qua-xo-so-theo-ngay/mien-bac-xsmb/${formatedDay}.html`

		promiseAll.push(scapeXSKT(url, formatedDay))
		if (index === chunk) {
			// console.log(promiseAll)
			index = 0 // reset
			await Promise.all(promiseAll).catch(e => console.error(e))
			promiseAll = [] // reset
		}
	}

	// console.log('OUT', promiseAll)
	await Promise.all(promiseAll).catch(e => console.error(e))
}

async function runXSKT_error() {
	const url = 'https://xskt.com.vn/ket-qua-xo-so-theo-ngay/mien-bac-xsmb/'
	// get error
	const { data } = await service.masterService.query({
		limit: 365,
		content: '[]',
	})
	const len = data.length
	const chunk = 100
	for (let i = 0; i < len; i += chunk) {
		const requests = data.slice(i, i + chunk).map(item => {
			return scapeXSKT(`${url + item.date}.html`, item.date)
		})

		await Promise.all(requests)
			.then(result => {
				console.log(`${i}:`, result)
			})
			.catch(e => console.error(e))
	}
}

async function runSOXO() {
	const url = 'https://xoso.com.vn/xsmb-14-02-2000.html'
	const $ = await fetchHTML(url)

	const sxmb = []
	$('div.box-ketqua tbody > tr').each((idx, el) => {
		sxmb.push($(el).text())
	})

	console.log('SOXO', sxmb)
}

const main = async (runFull = false) => {
	let start = Date.now()
	console.time('[runtimeSXMB]')
	await runXSKT(runFull).catch(e => console.error(e))
	console.timeEnd('[runtimeSXMB]')
	let end = Date.now()
	service.masterService
		.writeLog({
			milisecond: end - start,
		})
		.then(x => console.log('[AppendLog]', x))
		.catch(e => console.error('[AppendLog_ERR]', e))

	// Chay cac ngay bi loi, ko co ket qua
	runXSKT_error()

	// runSOXO()
}

export default main
