import DB from './Database'
const TABLE_NAME = 'transactions'
const OBJ_DB = new DB

class Transaction {
    constructor(obj) {
        this.total_money = obj.money
        this.created_by = 'SYSTEM'
        this.updated_by = 'SYSTEM'
        this.updated_at = new Date
    }
    static async getAll() {
        let sql = `SELECT * FROM ${TABLE_NAME}`

        return OBJ_DB.query(sql)
    }

    static async paginate({page = 1, limit = 5}) {
        let start = 0
        if (page > 1) {
            start = (page - 1) * limit
        }
        let sql = `SELECT * FROM ${TABLE_NAME} LIMIT ? OFFSET ?`

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
}

export default Transaction