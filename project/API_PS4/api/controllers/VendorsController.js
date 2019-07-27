const db = require('../models/dbconnection')
import Vendor from '../models/Vendor.js'

module.exports = {
    get: (req, res) => {
        Vendor.getAll((err, data) => {
            if (err) throw err
            res.json(data)
        })
    },
    paginate: async (req, res) => {
        const {page} = req.params
        const {limit, name, phone} = req.query
        let data = {
            page,
            limit,
            name,
            phone
        }

        Vendor.paginate(data, (err, reponse) => {
            if (err) throw err
            res.json(reponse)
        })

    },
    detail: (req, res) => {
        Vendor.getById(req.params.id, (err, data) => {
            if (err)  res.send(err)
            res.json(data)
        });
    },
    update: (req, res) => {
        let data = req.body
        let id = req.params.id

        Vendor.update(id, new Vendor(data), (err, response) => {
            if (err)  res.send(err)
            res.json(response)
        })
    },
    store: (req, res) => {
        // let data = req.body;
        // let sql = 'INSERT INTO vendors SET ?';
        // db.query(sql, [data], (err, response) => {
        //     if (err) throw err
        //     console.log(response)
        //     res.json({
        //         message: 'Insert success!'
        //     });
        // })

        let newObj = new Vendor(req.body)
        Vendor.create(newObj, (err, data) => {
            if (err)  res.send(err)
            res.json(data)
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM vendors WHERE id = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            res.json({
                message: 'Delete success!'
            })
        })
    },
    search: async (req, res) => {
        Vendor.search(req.query.q, (err, data) => {
            if (err)  res.send(err)
            res.json(data)
        })
    },
    count: async (req, res) => {
        Vendor.count(req.query, (err, data) => {
            if (err)  res.send(err)
            res.json({
                success: true,
			    data: data[0].count
            })
        })
    }
}