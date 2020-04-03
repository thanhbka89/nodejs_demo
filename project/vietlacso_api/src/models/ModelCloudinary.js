const cloudinary = require('cloudinary').v2
const fs = require('fs')

// lấy trong https://cloudinary.com/console/welcome
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || 'xxxx',
    api_key: process.env.CLOUDINARY_KEY || 'xxxx',
    api_secret: process.env.CLOUDINARY_SECRET || 'xxx'
});

const self = module.exports = {
    uploadSingle: async (file) => {
        let message = '', success = false
        try {
            const result = await cloudinary.uploader.upload(file, {
                // folder: 'single',
                tag: 'basic_sample'
            })
            if (result) {
                fs.unlinkSync(file) // remove hình ảnh trong local 
            }
            message = result
            success = true
        } catch (e) {
            message = e
        }
        return { success, message }
    },
    // uploadSingle: (file) => {
    //     return new Promise((resolve, reject) => {
    //         cloudinary.uploader.upload(file, {
    //                 // folder: 'single',
    //                 tag: 'basic_sample'
    //             })
    //             .then(result => {
    //                 console.log("*****", result)
    //                 if (result) {
    //                     const fs = require('fs')
    //                     fs.unlinkSync(file)
    //                     resolve({
    //                         url: result.secure_url
    //                     })
    //                 }
    //             })
    //             .catch( (err) => {
    //                 console.log("** File Upload (Promise)")
    //                 if (err) { reject(err) }
    //             })
    //     })
    // },
    uploadMultiple: (file) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                    folder: 'home'
                })
                .then(result => {
                    if (result) {
                        const fs = require('fs')
                        fs.unlinkSync(file)
                        resolve({
                            url: result.secure_url,
                            id: result.public_id,
                            thumb1: self.reSizeImage(result.public_id, 200, 200),
                            main: self.reSizeImage(result.public_id, 500, 500),
                            thumb2: self.reSizeImage(result.public_id, 300, 300)
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
            format: 'jpg'
        })
    },
}