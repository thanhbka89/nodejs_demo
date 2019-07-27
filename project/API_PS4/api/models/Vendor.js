const db = require('./dbconnection')
const TABLE_NAME = 'vendors'

class Vendor {
    constructor(obj) {
        this.name = obj.name
        this.address = obj.address
        this.phone = obj.phone
        this.description = obj.description
    }
    static getAll(result) {
        let sql = `select * from ${TABLE_NAME}`
        db.query(sql, (err, res) => {
            if(err) {
                result(null, err)
            }
            else{
             result(null, res)
            }
        });   
    }

    static getCondition(input) {
        const filter = input || {}
        let $where = 'WHERE'
        let check = 0 // điều kiện đầu tiên (check == 0)
        // thì ko cần dùng phép AND. Còn là điều kiện thứ N thì phải có AND
        const {name, phone} = filter
        if (phone) {
			$where = $where.concat(` ${check ? 'AND' : ''} phone LIKE "%${phone}%"`)
			check ++
        }
        if (name) {
			$where = $where.concat(` ${check ? 'AND' : ''} name LIKE "%${name}%"`)
			check ++
        }
        
        const response = {
            query: $where,
            hasWhere: check ? true : false // kiem tra xem co dieu kien ko
        }

        return response
    }

    static getTotalRows(input, result) {
        const condition = this.getCondition(input)
        let sql = `SELECT COUNT(*) AS count FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        db.query(sql, (err, res) => {
            if(err) {
                result(null, err)
            } else {
             result(null, res)
            }
        })
    }

    /** Phan trang va Tim kiem */
    static paginate({page = 1, limit = 5, name, phone}, result) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({name, phone})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''} LIMIT ? OFFSET ?`

        db.query(sql, [limit, start], (err, res) => {
            if(err) {
                result(null, err)
            } else {
             result(null, res)
            }
        })
    }

    static getById(id, result) {
        let sql = `Select * from ${TABLE_NAME} where id = ?`
        db.query(sql, [id], (err, res) => {
            if (err) {
                result(err, null)
            }
            else {
                result(null, res)
            }
        })
    }

    static create(newObj, result) {
        let sql = `INSERT INTO ${TABLE_NAME} SET ?`
        db.query(sql, newObj, (err, res) => {
            if(err) {
                result(err, null)
            }
            else{
                result(null, res.insertId)
            }
        })
    }

    static update(id, obj, result) {
        let sql = `UPDATE ${TABLE_NAME} SET ? WHERE id = ?`
        db.query(sql, [obj, id], (err, res) => {
            if(err) {
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static remove(id, result) {
        let sql = `DELETE FROM ${TABLE_NAME} WHERE id = ?`
        db.query(sql, [id], (err, res) => {
            if(err) {
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static search(query, result) {
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE name LIKE ?`
        db.query(sql,['%' + query + '%'], (err, res) => {
            if(err) {
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static count(input, result) {
        const condition = this.getCondition(input)
        let sql = `SELECT COUNT(*) AS count FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        db.query(sql, (err, res) => {
            if (err) {
                result(err, null)
            }
            else {
                result(null, res)
            }
        })
    }
}

export default Vendor