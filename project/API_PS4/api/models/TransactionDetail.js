import DB from './Database'
const TABLE_NAME = 'trans_detail'
const OBJ_DB = new DB

class TransactionDetail {
    constructor(obj) {
        this.id_trans = obj.id_trans
        this.id_item = obj.id_item
        this.code_item = obj.code_item
        this.price = obj.price
        this.quantity = obj.quantity
        this.discount = obj.discount
        this.start = obj.start
    }

    static getCondition(input) {
        let $where = 'WHERE'
        let check = 0 // điều kiện đầu tiên (check == 0)
        // thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
        const {id_item, code_item, from, to} = input || {}
        if (id_item) {
            $where = $where.concat(` ${check ? 'AND' : ''} id_item = ${id_item}`)   
			check ++ 
        }
        if (code_item) {
			$where = $where.concat(` ${check ? 'AND' : ''} code_item = ${code_item}`)
			check ++
        }
        if (from) {
            $where = $where.concat(` ${check ? 'AND' : ''} start >= '${from}'`)
            check ++
        }
        if (to) {
            $where = $where.concat(` ${check ? 'AND' : ''} start <= '${to}'`)
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

    static async paginate({page = 1, limit = 5, id_item, code_item, from, to}) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({id_item, code_item, from, to})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''} LIMIT ? OFFSET ?`

        return OBJ_DB.query(sql, [limit, start])
    }

    static async getById(id) {
        let sql = `SELECT * FROM ${TABLE_NAME} where id = ?`

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
}

export default TransactionDetail