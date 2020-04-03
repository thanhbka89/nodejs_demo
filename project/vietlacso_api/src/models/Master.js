import DB from './Database'
const TABLE_NAME = 'masterdata'
const OBJ_DB = new DB()
const STATUS_ACTIVE = 1
const STATUS_INACTIVE = 0

class MasterData {
	constructor(obj) {
		this.date = obj.date
		this.day_of_month = obj.dayOfMonth || 0
		this.month = obj.month || 0
		this.year = obj.year || 0
		this.day_of_week = obj.dayOfWeek || 0
		this.city = obj.city || 'N#A'
		this.data = obj.data
		this.updated_at = new Date()
	}

	static getCondition(input = {}) {
		let $where = 'WHERE'
		let check = 0 // điều kiện đầu tiên (check == 0)
		// thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
		const { date, day, month, year, week, city, from, to, content } = input

		if (date) {
			$where = $where.concat(` ${check ? 'AND' : ''} date = '${date}'`)
			check++
		}
		if (year) {
			$where = $where.concat(` ${check ? 'AND' : ''} year = ${year}`)
			check++
		}
		if (content) {
			$where = $where.concat(` ${check ? 'AND' : ''} data = '${content}'`)
			check++
		}
		if (from) {
			$where = $where.concat(` ${check ? 'AND' : ''} created_at >= '${from}'`)
			check++
		}
		if (to) {
			$where = $where.concat(` ${check ? 'AND' : ''} created_at <= '${to}'`)
			check++
		}

		return {
			query: $where,
			hasWhere: check ? true : false, // kiem tra xem co dieu kien ko
		}
	}

	static async getAll() {
		let sql = `SELECT * FROM ${TABLE_NAME}`

		return OBJ_DB.query(sql)
	}

	static async paginate(input = {}) {
		let { page, limit } = input
		let start = 0
		page = parseInt(page, 10) || 1
		limit = parseInt(limit, 10) || 20
		if (page > 1) start = (page - 1) * limit
		const condition = this.getCondition(input)
		let where = condition.hasWhere ? condition.query : ''
		let sql = `SELECT * FROM ${TABLE_NAME} ${where} ORDER BY id DESC LIMIT ? OFFSET ?`

		return OBJ_DB.query(sql, [limit, start])
	}

	static async getById(id) {
		let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`

		return OBJ_DB.query(sql, [id])
	}

	static async create(newObj) {
		let sql = `INSERT INTO ${TABLE_NAME} SET ?`

		return OBJ_DB.query(sql, newObj)
	}

	static async update(id, obj) {
		let sql = `UPDATE ${TABLE_NAME} SET ? WHERE id = ?`

		return OBJ_DB.query(sql, [obj, id])
	}

	static async remove(id) {
		let sql = `DELETE FROM ${TABLE_NAME} WHERE id = ?`

		return OBJ_DB.query(sql, [id])
	}

	static async count(input) {
		const condition = this.getCondition(input)
		let sql = `SELECT COUNT(*) AS count FROM ${TABLE_NAME} ${
			condition.hasWhere ? condition.query : ''
		}`

		return OBJ_DB.query(sql)
	}
}

export default MasterData
