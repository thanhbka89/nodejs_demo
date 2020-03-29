import { Router } from 'express'
const router = Router()
import multer from 'multer'
import xlstojson from 'xls-to-json-lc'
import xlsxtojson from 'xlsx-to-json-lc'
import { getPreviousMonth, formatDate, getFirstDayInMonth } from '../helpers'
import {
  queryInventory,
  queryTransDetail,
  modifyKiemKe
} from '../services/mmService'
import uploadMulter from '../models/ModelMulter'

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now()
    cb(
      null,
      file.fieldname +
        '-' +
        datetimestamp +
        '.' +
        file.originalname.split('.')[file.originalname.split('.').length - 1]
    )
  }
})

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function(req, file, callback) {
    //file filter
    if (
      ['xls', 'xlsx'].indexOf(
        file.originalname.split('.')[file.originalname.split('.').length - 1]
      ) === -1
    ) {
      return callback(new Error('Wrong extension type'))
    }
    callback(null, true)
  }
}).single('file')

router.post('/', (req, res) => {
  let exceltojson
  upload(req, res, err => {
    if (err) {
      res.json({ error_code: 1, err_desc: err })
      return
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      res.json({ error_code: 1, err_desc: 'No file passed' })
      return
    }
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if (
      req.file.originalname.split('.')[
        req.file.originalname.split('.').length - 1
      ] === 'xlsx'
    ) {
      exceltojson = xlsxtojson
    } else {
      exceltojson = xlstojson
    }
    try {
      exceltojson(
        {
          input: req.file.path,
          output: null, //since we don't need output.json
          lowerCaseHeaders: true
        },
        (err, result) => {
          if (err) {
            return res.json({
              error_code: 1,
              err_desc: err
            })
          }
          res.json({ error_code: 0, err_desc: null, data: result })
        }
      )
    } catch (e) {
      res.json({ error_code: 1, err_desc: 'Corupted excel file' })
    }
  })
})

/**
 * Post Kiểm kê hàng hóa Kho
 */
router.post('/kiem_ke', (req, res) => {
  let exceltojson
  upload(req, res, err => {
    if (err) {
      res.json({ error_code: 1, err_desc: err })
      return
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      return res.json({ error_code: 1, err_desc: 'Chọn file upload' })
    }
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if (
      req.file.originalname.split('.')[
        req.file.originalname.split('.').length - 1
      ] === 'xlsx'
    ) {
      exceltojson = xlsxtojson
    } else {
      exceltojson = xlstojson
    }
    try {
      exceltojson(
        {
          input: req.file.path,
          output: null, //since we don't need output.json
          lowerCaseHeaders: true
        },
        async (err, result) => {
          if (err) {
            return res.json({ error_code: 1, err_desc: err })
          }
          let page = 1,
            limit = 50000
          let uploadData = []
          let lastPeriod = getPreviousMonth({ format: 'MM/YYYY' })
          let curDay = formatDate({})
          let firstDay = formatDate({ date: getFirstDayInMonth(curDay) })

          const [res1, res2] = await Promise.all([
            // sl_nhap tu dau thang -> ngay hien tai
            queryInventory({
              page,
              limit,
              status: 1,
              from: firstDay,
              to: curDay
            }),
            // sl_xuat tu dau thang -> ngay hien tai
            queryTransDetail({
              page,
              limit,
              from: firstDay,
              to: curDay
            })
          ]).catch(e => console.error(e))

          // get NhapTrongKy
          let groups = Object.values(
            res1.data.reduce((r, o) => {
              let date = o.code
              r[date] = r[date] || {
                code: o.code,
                total_money: 0,
                quantity: 0
              }
              r[date].total_money += o.gia_nhap
              r[date].quantity += o.quantity
              return r
            }, {})
          )
          let nhap_trong_ky = groups

          // get XuatTrongKy
          groups = Object.values(
            res2.data.reduce((r, o) => {
              let date = o.code_item
              r[date] = r[date] || {
                code: o.code_item,
                total_money: 0,
                quantity: 0
              }
              r[date].total_money += parseInt(o.quantity * o.price) || 0
              r[date].quantity += parseInt(o.quantity) || 0
              return r
            }, {})
          )
          let xuat_trong_ky = groups

          // insert db
          const len = result.length
          for (let index = 0; index < len; index += 1) {
            let item = result[index]
            // Chi cho upload Kiem ke ky trươc cua ngay hien tai
            if (item.period !== lastPeriod) {
              return res.json({
                error_code: 1,
                err_desc: `Chỉ cập nhật kiểm kê cho kỳ gần nhất (kỳ ${lastPeriod})`
              })
            }
            // sl_thucte của ky truoc = sl_thucte kiem ke o thoi diem hien tai + sl_xuat - sl_nhap
            let sl_thucte = parseInt(item.sl_thucte) || 0

            // Nhap trong ky
            let found = nhap_trong_ky.find(el => {
              return item.code === el.code
            })
            if (found) {
              sl_thucte -= found.quantity
            }

            // Xuat trong ky
            found = xuat_trong_ky.find(el => {
              return item.code === el.code
            })
            if (found) {
              sl_thucte += found.quantity
            }
            let data = {
              id_item: item.id_item || 0,
              code: item.code,
              name: item.name,
              period: item.period,
              sl_thucte: sl_thucte > 0 ? sl_thucte : 0,
              created_by: req.decoded.username,
              updated_by: req.decoded.username
            }
            uploadData.push(data)
          }

          modifyKiemKe(uploadData)
            .then(x => console.log(x))
            .catch(e => console.error(e))

          res.json({
            error_code: 0,
            err_desc: 'Inserted successfully'
          })
        }
      )
    } catch (e) {
      res.json({ error_code: 1, err_desc: 'Corupted excel file' })
    }
  })
})

/**
 * upload nhiều files ví dụ như hình ảnh của sản phẩm
 * Test: su dung Advanced REST client, trong do:
 * tab Header: Authorization 	Beared xxxx
 * tab Body: multipart/form-data
 * field name la name va chon anh
 */
router.post('/uploadMultiple', uploadMulter.any(), async (req, res) => {
  res.json(req.files)
})

// upload single ví dụ như avatar...
router.post('/uploadSingle', uploadMulter.single('name'), async (req, res) => {
  const { file } = req // req.file
  res.json(file)
})

export default router
