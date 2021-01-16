const imageFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

const cleanFolder = folderPath => {
  // delete files inside folder but not the folder itself
}

export { imageFilter, cleanFolder }
