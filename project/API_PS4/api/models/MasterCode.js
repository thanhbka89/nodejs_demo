import DB from './Database'
const TABLE_NAME = 'mastercode'
const OBJ_DB = new DB
const STATUS_ACTIVE = 1
const STATUS_INACTIVE = 0

class MasterCode {
    constructor(obj) {
        this.code = obj.code
        this.name = obj.name
        this.status = obj.status
        this.created_by = obj.created_by || 'SYSTEM'
    }

    static getCondition(input) {
        const filter = input || {}
        let $where = 'WHERE'
        let check = 0 // điều kiện đầu tiên (check == 0)
        // thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
        const {code, name, status} = filter
        if (code) {
			$where = $where.concat(` ${check ? 'AND' : ''} code = '${code}'`)
			check ++
        }
        if (name) {
            $where = $where.concat(` ${check ? 'AND' : ''} name LIKE "%${name}%"`)
			check ++
        }
        if (status) {
			$where = $where.concat(` ${check ? 'AND' : ''} status = ${status}`)
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

    static async paginate({page = 1, limit = 5, code, name, status}) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({code, name, status})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''} LIMIT ? OFFSET ?`
        console.log(sql,page,limit,code,name,status)
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
}

export default MasterCode