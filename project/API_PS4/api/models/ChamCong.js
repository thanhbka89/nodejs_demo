import DB from './Database'
const TABLE_NAME = 'cham_cong'
const OBJ_DB = new DB

class ChamCong {
    constructor(obj) {
        this.user_id = obj.user
        this.time = obj.time || new Date
        this.type = obj.type || 1
        this.created_by = obj.created_by || 'SYSTEM'
    }

    static getCondition(input) {
        let $where = 'WHERE'
        let check = 0 // điều kiện đầu tiên (check == 0)
        // thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
        const {user_id, user, from, to} = input || {}
        if (user_id) {
			$where = $where.concat(` ${check ? 'AND' : ''} user_id = ${user}`)
			check ++
        }
        if (user) {
			$where = $where.concat(` ${check ? 'AND' : ''} created_by = '${user}'`)
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

    static async paginate({page = 1, limit = 5,user_id, user, from, to}) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({user_id, user, from, to})
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

    static async count(input) {
        const condition = this.getCondition(input)
        let sql = `SELECT COUNT(*) AS count FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        
        return OBJ_DB.query(sql)
    }
}

export default ChamCong