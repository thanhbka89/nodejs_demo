const db = require('../models/dbconnection');
import Vendor from '../models/Vendor.js';

module.exports = {
    get: (req, res) => {
        // let sql = 'SELECT * FROM vendors';
        // db.query(sql, (err, response) => {
        //     if (err) throw err;
        //     res.json(response);
        // })

        Vendor.getAll((err, data) => {
            if (err) throw err;
            res.json(data);
        })
    },
    paginate: (req, res) => {
        let data = {
            page: req.params.page
        }
        Vendor.paginate(data, (err, reponse) => {
            if (err) throw err;
            res.json(reponse);
        })

    },
    detail: (req, res) => {
        Vendor.getById(req.params.id, (err, data) => {
            if (err)  res.send(err);
            res.json(data);
        });
    },
    update: (req, res) => {
        let data = req.body;
        let id = req.params.id;
        // let sql = 'UPDATE vendors SET ? WHERE id = ?';
        // db.query(sql, [data, id], (err, response) => {
        //     if (err) throw err;
        //     res.json({
        //         message: 'Update success!'
        //     });
        // })

        Vendor.update(id, new Vendor(data), (err, response) => {
            if (err)  res.send(err)
            res.json(response);
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
            if (err)  res.send(err);
            res.json(data);
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM vendors WHERE id = ?';
        db.query(sql, [req.params.id], (err, response) => {
            if (err) throw err
            console.log(response)
            res.json({
                message: 'Delete success!'
            });
        })
    }
}