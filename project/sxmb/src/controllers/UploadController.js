import Loki from 'lokijs'
const cloudinary = require('../models/ModelCloudinary')

import CONFIG from '../config'
import { loadCollection } from '../services/lokiService'

const db = new Loki(`${CONFIG.loki.UPLOAD_PATH}/${CONFIG.loki.DB_NAME}`, {
  persistenceMethod: 'fs'
})

export const uploadSingleFile = async (req, res) => {
  try {
    // use Lokijs
    const col = await loadCollection(CONFIG.loki.COLLECTION_NAME, db)
    const data = col.insert(req.file)
    db.saveDatabase()

    //req.file.path chính là đường dẫn của file khi upload bằng multer
    cloudinary.uploadSingle(req.file.path).then((result) => {
      console.log(result)
    })
    
    res.json({ file: req.file })
  } catch (err) {
    res.sendStatus(400).json('Error happen!')
  }
}

export async function uploadMultipleFiles(req, res) {
  try {
    // use Lokijs
    const col = await loadCollection(CONFIG.loki.COLLECTION_NAME, db)
    let data = [].concat(col.insert(req.files))
    db.saveDatabase()

    //req.files chính là khi upload multiple images
    let res_promises = req.files.map(file => new Promise((resolve, reject) => {
      cloudinary.uploadMultiple(file.path).then((result) => {
          resolve(result)
      })
    }))
    
    // Promise.all get imgas
    Promise.all(res_promises)
      .then(async (arrImg) => {
        //arrImg chính là array mà chúng ta đã upload 
        // các bạn có thể sử dụng arrImg để save vào database, hay hơn thì sử dụng mongodb
        console.log(arrImg)
      })
      .catch((error) => {
          console.error('> Error>', error)
      })

    res.json(req.files)
  } catch (err) {
    res
      .sendStatus(400)
      .json('Error happen!')
  }
}

export const getImages = async (req, res) => {
  try {
    const col = await loadCollection(CONFIG.loki.COLLECTION_NAME, db)
    res.json(col.data)
  } catch (err) {
    res.sendStatus(400).json('Error happen!')
  }
}
