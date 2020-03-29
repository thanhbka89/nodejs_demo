import { Router } from 'express'
const router = Router()
const { getTodoList } = require('../controllers/TodoController')
const ControllerUpload  = require('../controllers/UploadController')
const uploadMulter = require('../models/ModelMulter') // khai báo middleware multer ở đây

router.get('/', (req, res) => {
  res.json({ message: 'API v1.0' })
})

router.get('/todos', getTodoList)

// upload nhiều files ví dụ như hình ảnh của sản phẩm
router.post('/uploadMultiple', uploadMulter.any(), ControllerUpload.uploadMultipleFiles)

// upload single ví dụ như avatar...
router.post('/uploadSingle', uploadMulter.single('name'), ControllerUpload.uploadSingleFile)

router.get('/images', ControllerUpload.getImages)

module.exports = router
