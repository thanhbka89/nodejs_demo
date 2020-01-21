import DB from './Database'
const TABLE_NAME = 'list_ps_playing'
const OBJ_DB = new DB

class ListPSPlaying {
    
    constructor(obj) {
        this.id_ps = obj.id_ps
        this.code = obj.code
        this.key = obj.key
        this.content = obj.content
        this.created_by = obj.created_by || 'SYSTEM'
        this.updated_by = obj.updated_by || 'SYSTEM'
        this.updated_at = new Date
    }

    static getCondition(input) {
        let $where = 'WHERE'
        let check = 0 // điều kiện đầu tiên (check == 0)
        // thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
        const {code, id_ps} = input || {}
        if (id_ps) {
			$where = $where.concat(` ${check ? 'AND' : ''} id_ps = ${id_ps}`)
			check ++
        }
        if (code) {
			$where = $where.concat(` ${check ? 'AND' : ''} code = '${code}'`)
			check ++
        }
        
        return {
            query: $where,
            hasWhere: check ? true : false // kiem tra xem co dieu kien ko
        }
    }

    static async count(input) {
        const condition = this.getCondition(input)
        let sql = `SELECT COUNT(*) AS count FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        
        return OBJ_DB.query(sql)
    }

    static async getAll() {
        let sql = `SELECT * FROM ${TABLE_NAME}`

        return OBJ_DB.query(sql)
    }

    static async paginate({page = 1, limit = 5, code, id_ps}) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({code, id_ps})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''} LIMIT ? OFFSET ?`
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

    static async removeByPS(id) {
        let sql = `DELETE FROM ${TABLE_NAME} WHERE id_ps = ?`

        return OBJ_DB.query(sql, [id])
    }

}

export default ListPSPlaying