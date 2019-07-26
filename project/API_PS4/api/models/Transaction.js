import DB from './Database'
const TABLE_NAME = 'transactions'
const TABLE_JOIN = 'trans_detail'
const OBJ_DB = new DB

class Transaction {
    constructor(obj) {
        this.id_ps = obj.ps
        this.id_user = obj.user
        this.total_money = obj.money
        this.created_by = obj.created_by || 'SYSTEM'
        this.updated_by = obj.updated_by || 'SYSTEM'
        this.updated_at = new Date
    }

    static getCondition(input) {
        let $where = 'WHERE'
        let check = 0 // điều kiện đầu tiên (check == 0)
        // thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
        const {ps, user, from, to} = input || {}
        if (ps) {
            if (Array.isArray(ps)) {
                $where = $where.concat(` ${check ? 'AND' : ''} id_ps IN (${ps.toString()})`)
            } else {
                $where = $where.concat(` ${check ? 'AND' : ''} id_ps = ${ps}`)
            }            
			check ++ 
        }
        if (user) {
			$where = $where.concat(` ${check ? 'AND' : ''} id_user = ${user}`)
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

    static async getDetailById(id) {
        let sql = `SELECT t1.*, t2.id_item, t2.quantity, t2.start FROM ${TABLE_NAME} AS t1 INNER JOIN ${TABLE_JOIN} AS t2 ON t1.id = t2.id_trans WHERE t1.id = ${id}`
        const options = {sql, nestTables: '_'}

        return OBJ_DB.query(options)
    }

    static async paginate({page = 1, limit = 5, ps, user, from, to}) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({ps, user, from, to})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''} ORDER BY id DESC LIMIT ? OFFSET ?`
        console.log(sql)
        return OBJ_DB.query(sql, [limit, start])
    }

    static async getById(id) {
        let sql = `Select * from ${TABLE_NAME} where id = ?`

        return OBJ_DB.query(sql, [id])
    }

    static async create(newObj, result) {
        let sql = `INSERT INTO ${TABLE_NAME} SET ?`

        return OBJ_DB.query(sql, newObj)
    }    

    static async update(id, obj, result) {
        let sql = `UPDATE ${TABLE_NAME} SET ? WHERE id = ?`

        return OBJ_DB.query(sql, [obj, id])
    }

    static async remove(id, result) {
        let sql = `DELETE FROM ${TABLE_NAME} WHERE id = ?`

        return OBJ_DB.query(sql, [id])
    }

    static async getByPs(id) {
        let ps = id
        if (id.search(',') > 0) {
            ps = id.split(',')
        }
        const condition = this.getCondition({ps})
        let sql = `Select * from ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`

        return OBJ_DB.query(sql)
    }

    static async count(input) {
        const condition = this.getCondition(input)
        let sql = `SELECT COUNT(*) AS count FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        
        return OBJ_DB.query(sql)
    }
}

export default Transaction