const multer = require('multer')
import { imageFilter } from '../services/lokiService'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/') //hỉnh ảnh sẽ chưa trong folder uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // mặc định sẽ save name của hình ảnh
    // là name gốc, chúng ta có thể rename nó.
  }
})

const upload = multer({ storage: storage, fileFilter: imageFilter }) //save trên local của server khi dùng multer

module.exports = upload
