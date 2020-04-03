const cloudinary = require('../models/ModelCloudinary')

export const uploadSingleFile = async (req, res) => {
  try {
    //req.file.path chính là đường dẫn của file khi upload bằng multer
    // cloudinary.uploadSingle(req.file.path).then(result => {
    //   console.log(result)
    // })

    res.json({ file: req.file })
  } catch (err) {
    res.sendStatus(400).json('Error happen!')
  }
}

export async function uploadMultipleFiles(req, res) {
  try {
    //req.files chính là khi upload multiple images
    let res_promises = req.files.map(
      file =>
        new Promise((resolve, reject) => {
          cloudinary.uploadMultiple(file.path).then(result => {
            resolve(result)
          })
        })
    )

    // Promise.all get imgas
    Promise.all(res_promises)
      .then(async arrImg => {
        //arrImg chính là array mà chúng ta đã upload
        // các bạn có thể sử dụng arrImg để save vào database, hay hơn thì sử dụng mongodb
        console.log(arrImg)
      })
      .catch(error => {
        console.error('> Error>', error)
      })

    res.json(req.files)
  } catch (err) {
    res.sendStatus(400).json('Error happen!')
  }
}
