import { getFirstDayInMonth, getPreviousMonth, formatDate } from '../helpers'
import {
	queryKiemKe,
	queryInventory,
	queryTransDetail,
	queryItem,
	modifyKiemKe,
} from './mmService'

const demo = async () => 'abc'

/**
 * Auto run TonCuoiKy
 * Ex: Dang ở ngày 15/2/2020 -> chạy tự đống tính tồn kho cho kỳ 1/2020
 */
async function runTonCuoiKy({ date = new Date() }) {
	let page = 1,
		limit = 50000
	let ton_dau_ky = [],
		nhap_trong_ky = [],
		xuat_trong_ky = [],
		services = [],
		data = []

	// get last day of previous month
	let lastDay = getPreviousMonth({ date })
	// get first day of previous month
	let firstDay = formatDate({ date: getFirstDayInMonth(lastDay) })
	let lastPeriod = formatDate({ date: lastDay, format: 'MM/YYYY' })
	let lastPreviousPeriod = getPreviousMonth({
		date: lastDay,
		format: 'MM/YYYY',
	})

	const [res1, res2, res3, res4] = await Promise.all([
		queryItem({ page, limit, status: 1 }),
		queryKiemKe({ page, limit, period: lastPreviousPeriod }),
		queryInventory({ page, limit, status: 1, from: firstDay, to: lastDay }),
		queryTransDetail({ page, limit, from: firstDay, to: lastDay }),
	]).catch(e => console.error(e))

	// Get danh sách Dịch vụ active
	services = res1.data

	// get TonDauKy
	ton_dau_ky = res2.success ? res2.data : []

	// get NhapTrongKy
	let groups = Object.values(
		res3.data.reduce((r, o) => {
			let date = o.code
			r[date] = r[date] || { code: o.code, total_money: 0, quantity: 0 }
			r[date].total_money += o.gia_nhap
			r[date].quantity += o.quantity
			return r
		}, {})
	)
	nhap_trong_ky = groups

	// get XuatTrongKy
	groups = Object.values(
		res4.data.reduce((r, o) => {
			let date = o.code_item
			r[date] = r[date] || { code: o.code_item, total_money: 0, quantity: 0 }
			r[date].total_money += parseInt(o.quantity * o.price) || 0
			r[date].quantity += parseInt(o.quantity) || 0
			return r
		}, {})
	)
	xuat_trong_ky = groups

	// xu ly data
	let item = {}
	let sl_tinh_toan = 0
	services.forEach((element, idx) => {
		item = {}
		item.id = idx + 1
		item.id_item = element.id
		item.code = element.code
		item.name = element.name
		item.period = lastPeriod
		// Ton dau ky
		let found = ton_dau_ky.find(el => {
			return element.code === el.code && element.id === el.id_item
		})
		if (found) {
			item.dauky_sl = found.sl_thucte
		}

		// Nhap trong ky
		found = nhap_trong_ky.find(el => {
			return element.code === el.code
		})
		if (found) {
			item.receive_trongky_sl = found.quantity
			item.receive_trongky_thanhtien = found.total_money
		}

		// Xuat trong ky
		found = xuat_trong_ky.find(el => {
			return element.code === el.code
		})
		if (found) {
			item.issue_trongky_sl = found.quantity
			item.issue_trongky_thanhtien = found.total_money
		}

		// Ton kho cuoi ky
		sl_tinh_toan =
			(parseInt(item.dauky_sl) || 0) +
			(parseInt(item.receive_trongky_sl) || 0) -
			(parseInt(item.issue_trongky_sl) || 0)
		item.sl_tinhtoan = sl_tinh_toan > 0 ? sl_tinh_toan : 0

		data.push(item)
	})

	// save to DB
	modifyKiemKe(data)
		.then(x => console.log(x))
		.catch(e => console.error(e))

	return 'done RunTonCuoiKy auto'
}

module.exports = {
	demo,
	runTonCuoiKy,
}
