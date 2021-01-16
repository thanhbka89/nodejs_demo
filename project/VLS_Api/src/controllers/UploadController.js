const cloudinary = require('@src/models/ModelCloudinary')

export const uploadSingleFile = async (req, res) => {
  //req.file.path chính là đường dẫn của file khi upload bằng multer
  const data = await cloudinary.uploadSingle(req.file.path)

  res.json({ data })
}

export async function uploadMultipleFiles(req, res) {
  //req.files chính là khi upload multiple images
  const img_promises = req.files.map(
    (file) =>
      new Promise((resolve, reject) => {
        cloudinary.uploadMultiple(file.path).then((result) => {
          resolve(result)
        })
      })
  )

  const data = await Promise.all(img_promises)
    // .then(async (arrImg) => {
    //   //arrImg chính là array mà chúng ta đã upload
    //   // các bạn có thể sử dụng arrImg để save vào database, hay hơn thì sử dụng mongodb
    //   console.log('[arrImg]', arrImg)
    // })
    .catch((error) => {
      console.error('> Error>', error)
    })

  res.json({ success: true, data })
}
