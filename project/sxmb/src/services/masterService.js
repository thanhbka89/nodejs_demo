import Master from '../models/Master'
import Log from '../models/Log'

export async function query(query = {}) {
	let response = {
		success: false,
		data: null,
	}
	try {
		const result = await Master.paginate(query)
		response = {
			success: true,
			data: result,
		}
	} catch (e) {
		response.data = e
	}

	return response
}

export const modify = async (item = {}) => {
	let message = '',
		success = false
	try {
		const { data } = await query(item)
		if (data.length) await Master.update(data[0].id, new Master(item))
		else await Master.create(new Master(item))
		message = `${data.length ? 'Update' : 'Insert'} Successfully`
		success = true
	} catch (e) {
		message = e.message
	}

	return { success, message }
}

export async function writeLog(item = {}) {
	let message = '',
		success = false
	try {
		await Log.create(new Log(item))
		message = `Insert Successfully`
		success = true
	} catch (e) {
		message = e.message
	}

	return { success, message }
}

export async function massSave(datas = []) {
	const promises = datas.map(async item => {
		const { code, period } = item
		let check = await Master.paginate({
			page: 1,
			limit: 1,
			id_item: item.id_item,
			code: item.code,
			period: item.period,
		})
		if (check.length) {
			// neu da co data trong table
			await Master.update(check[0].id, new Master(item))
		} else {
			// tao moi
			await Master.create(new Master(item))
		}

		return { code, period }
	})

	console.time('[runPromiseAll]')
	await Promise.all(promises)
	console.timeEnd('[runPromiseAll]')

	return 'success'
}
