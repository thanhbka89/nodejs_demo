const db = require('./dbconnection')
const TABLE_NAME = 'users'

class User {
    constructor(obj) {
        this.username = obj.username
        this.fullname = obj.fullname
        this.nickname = obj.nickname
        if (obj.password) {
            this.passwd = obj.password
        }        
        this.phone = obj.phone
        this.address = obj.address
        this.role = obj.role
        this.status = obj.status
        this.created_by = 'SYSTEM'
        this.updated_by = 'SYSTEM'
        this.updated_at = new Date
    }
    static getAll(result) {
        let sql = `SELECT * FROM ${TABLE_NAME}`
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
        const {username, phone, status} = filter
        if (username) {
			$where = $where.concat(` ${check ? 'AND' : ''} username = '${username}'`)
			check ++
        }
        if (phone) {
			$where = $where.concat(` ${check ? 'AND' : ''} phone LIKE "%${phone}%"`)
			check ++
        }
        // if (category) {
        //     if (Array.isArray(category)) {
        //         $where = $where.concat(` ${check ? 'AND' : ''} category IN (${category.toString()})`)
        //     } else {
        //         $where = $where.concat(` ${check ? 'AND' : ''} category = ${category}`)
        //     }            
		// 	check ++ 
        // }
        if (status) {
			$where = $where.concat(` ${check ? 'AND' : ''} status = ${status}`)
			check ++
        }
        
        return {
            query: $where,
            hasWhere: check ? true : false // kiem tra xem co dieu kien ko
        }
    }

    static paginate({page = 1, limit = 5, username, phone}, result) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({username, phone})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''} LIMIT ? OFFSET ?`
        console.log(sql)
        db.query(sql, [limit, start], (err, res) => {
            if(err) {
                result(null, err)
            } else {
             result(null, res)
            }
        })
    }

    static getById(id, result) {
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`
        db.query(sql, [id], (err, res) => {
            if (err) {
                result(err, null)
            }
            else {
                result(null, res)
            }
        })
    }

    static getByUsername(uname, result) {
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE username = ?`
        db.query(sql, [uname], (err, res) => {
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
        db.query(sql, [newObj], (err, res) => {
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

    static deleteSoft(id, result) {
        let sql = `UPDATE ${TABLE_NAME} SET status = ? WHERE id = ?`
        db.query(sql, [0, id], (err, res) => {
            if(err) {
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }
}

export default User