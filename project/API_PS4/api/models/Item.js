const db = require('./dbconnection')
const TABLE_NAME = 'items'

class Item {
    constructor(obj) {
        this.name = obj.name
        this.code = obj.code
        this.gia_nhap = obj.gia_nhap
        this.gia_ban = obj.gia_ban
        this.category = obj.category
        this.status = obj.status
        this.created_by = 'SYSTEM'
        this.updated_by = 'SYSTEM'
        this.updated_at = new Date
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
        const {name, code, category, status} = filter
        if (code) {
			$where = $where.concat(` ${check ? 'AND' : ''} code LIKE "%${code}%"`)
			check ++
        }
        if (name) {
			$where = $where.concat(` ${check ? 'AND' : ''} name LIKE "%${name}%"`)
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

    static filter(input, result) {
        const condition = this.getCondition(input)
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        db.query(sql, (err, res) => {
            if(err) {
                result(null, err)
            } else {
             result(null, res)
            }
        })
    }

    static paginate({page = 1, limit = 5, name, code}, result) {
        let start = 0
        page = parseInt(page, 10) || 1
		limit  = parseInt(limit, 10)  || 5
        if (page > 1) {
            start = (page - 1) * limit
        }
        const condition = this.getCondition({name, code})
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

    /*** Get items theo danh muc */
    static getByCategory(input, result) {
        const {category, status} = input
        let danhmuc = category
        if (category.search(',') > 0) {
            danhmuc = category.split(',')
        }
        const condition = this.getCondition({category: danhmuc, status})
        let sql = `SELECT * FROM ${TABLE_NAME} ${condition.hasWhere ? condition.query : ''}`
        console.log(sql)
        db.query(sql, (err, res) => {
            if(err) {
                result(null, err)
            } else {
             result(null, res)
            }
        })
    }
}

export default Item