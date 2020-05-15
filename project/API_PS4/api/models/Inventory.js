import DB from './Database'
const TABLE_NAME = 'inventory'
const OBJ_DB = new DB
const STATUS_ACTIVE = 1
const STATUS_INACTIVE = 0

class Inventory {
    constructor(obj) {
        this.id_vendor = obj.id_vendor || 0
        this.code = obj.code
        this.name = obj.name || 'Nhập kho'
        this.gia_nhap = obj.gia_nhap
        this.quantity = obj.quantity || 0
        this.category = obj.category
        this.status = obj.status
        this.created_by = obj.created_by || 'SYSTEM'
        this.updated_by = obj.updated_by || 'SYSTEM'
        this.updated_at = new Date
    }

    static getCondition(input) {
        let $where = 'WHERE'
        let check = 0 // điều kiện đầu tiên (check == 0)
        // thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
        const {code, status, from, to} = input || {}
        if (code) {
			$where = $where.concat(` ${check ? 'AND' : ''} code = '${code}'`)
			check ++
        }
        if (status) {
			$where = $where.concat(` ${check ? 'AND' : ''} status = ${status}`)
			check ++
        }
        if (from) {
            $where = $where.concat(` ${check ? 'AND' : ''} created_at >= '${from}'`)
            check ++
        }
        if (to) {
            $where = $where.concat(` ${check ? 'AND' : ''} created_at <= '${to}'`)
            check ++
        }
        
        return {
            query: $where,
            hasWhere: check ? true : false // kiem tra xem co dieu kien ko
        }
    }

    static async getAll() {
        let sql = `SELECT * FROM ${TABLE_NAME}`

        return OBJ_DB.query(sql)
    }

    static async paginate({page = 1, limit = 5, code, status, from, to}) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({code, status, from, to})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''} ORDER BY id DESC LIMIT ? OFFSET ?`
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

    static async deleteSoft(id) {
        let sql = `UPDATE ${TABLE_NAME} SET status = ? WHERE id = ?`

        return OBJ_DB.query(sql, [STATUS_INACTIVE, id])
    }

    static async count(input) {
        const condition = this.getCondition(input)
        let sql = `SELECT COUNT(*) AS count FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        
        return OBJ_DB.query(sql)
    }
}

export default Inventory