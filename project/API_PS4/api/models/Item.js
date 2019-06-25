const db = require('./dbconnection')
const TABLE_NAME = 'items'

class Item {
    constructor(obj) {
        this.name = obj.name
        this.code = obj.code
        this.gia_nhap = obj.price_in
        this.gia_ban = obj.price_out
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

    static paginate({page = 1, limit = 5}, result) {
        let start = 0
        if (page > 1) {
            start = (page - 1) * limit
        }
        let sql = `SELECT * FROM ${TABLE_NAME} LIMIT ? OFFSET ?`
        db.query(sql, [limit, start], (err, res) => {
            if(err) {
                result(null, err)
            }
            else{
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
}

export default Item