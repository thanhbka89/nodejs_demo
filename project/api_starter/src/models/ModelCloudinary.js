const cloudinary = require('cloudinary').v2
import fs from 'fs'
import CONFIG from '@src/config'

// lấy trong https://cloudinary.com/console/welcome
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || CONFIG.storage.username,
  api_key: process.env.CLOUDINARY_KEY || CONFIG.storage.api_key,
  api_secret: process.env.CLOUDINARY_SECRET || CONFIG.storage.secret,
})

const self = (module.exports = {
  uploadSingle: async (file) => {
    let message = '',
      success = false
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: 'single',
        tag: 'basic_sample',
      })
      if (result) fs.unlinkSync(file) // remove hình ảnh trong local

      message = result
      success = true
    } catch (e) {
      message = e
    }
    return { success, message }
  },
  uploadMultiple: (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload(file, {
          folder: 'products',
        })
        .then((result) => {
          if (result) {
            fs.unlinkSync(file)
            resolve({
              url: result.secure_url,
              thumb1: self.reSizeImage(result.public_id, 200, 200),              
              thumb2: self.reSizeImage(result.public_id, 300, 300),
              main: self.reSizeImage(result.public_id, 500, 500),
            })
          }
        })
    })
  },
  reSizeImage: (id, h, w) => {
    return cloudinary.url(id, {
      height: h,
      width: w,
      crop: 'scale',
      format: 'jpg',
    })
  },
})
