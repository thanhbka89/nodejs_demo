import DB from './Database'
const TABLE_NAME = 'mastercode'
const OBJ_DB = new DB
const STATUS_ACTIVE = 1
const STATUS_INACTIVE = 0

class MasterCode {
    constructor(obj) {
        this.code = obj.code.toUpperCase().trim()
        this.name = obj.name
        this.category = obj.category
        this.status = obj.status
        this.created_by = obj.created_by || 'SYSTEM'
    }

    static getCondition(input) {
        let $where = 'WHERE'
        let operation = []
        let check = 0 // điều kiện đầu tiên (check == 0)
        // thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
        const {code, name, status, category} = input || {}
        if (code) {
			$where = $where.concat(` ${check ? 'AND' : ''} code = '${code}'`)
			check ++
        }
        if (name) {
            operation = name.split(']')
            if (operation.length > 1) {
                $where = $where.concat(` ${check ? 'OR' : ''} name LIKE "%${operation[1]}%"`)
            } else {
                $where = $where.concat(` ${check ? 'AND' : ''} name LIKE "%${name}%"`)
            }
			check ++
        }
        if (category) {
            if (Array.isArray(category)) {
                $where = $where.concat(` ${check ? 'AND' : ''} category IN (${category.toString()})`)
            } else {
                $where = $where.concat(` ${check ? 'AND' : ''} category = ${category}`)
            }            
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

    static async paginate(input) {
        let start = 0
        let {page, limit, code, name, category, status} = input || {}
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({code, name, category, status})
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

    static async deleteSoft(id) {
        let sql = `UPDATE ${TABLE_NAME} SET status = ? WHERE id = ?`

        return OBJ_DB.query(sql, [STATUS_INACTIVE, id])
    }

    static async getByCategory(input) {
        const {category, status} = input
        let danhmuc = category
        if (category.search(',') > 0) {
            danhmuc = category.split(',')
        }
        const condition = this.getCondition({category: danhmuc, status})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`

        return OBJ_DB.query(sql)
    }

    static async count(input) {
        const condition = this.getCondition(input)
        let sql = `SELECT COUNT(*) AS count FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        
        return OBJ_DB.query(sql)
    }
}

export default MasterCode