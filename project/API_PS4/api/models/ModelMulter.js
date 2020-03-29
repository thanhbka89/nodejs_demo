const multer = require('multer')
// const path = require('path')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/') //hỉnh ảnh sẽ chưa trong folder uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // mặc định sẽ save name của hình ảnh
    // là name gốc, chúng ta có thể rename nó.
  }
})

let upload = multer({ storage: storage }) //save trên local của server khi dùng multer

// module.exports = upload
export default upload
