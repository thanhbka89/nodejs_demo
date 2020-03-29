import Loki from 'lokijs'
import CONFIG from '../config'
import {
  loadCollection
} from '../services/lokiService'

const db = new Loki(`${CONFIG.loki.UPLOAD_PATH}/${CONFIG.loki.DB_NAME}`, {
  persistenceMethod: 'fs'
})

export const uploadSingleFile = async (req, res) => {
  try {
    const col = await loadCollection(CONFIG.loki.COLLECTION_NAME, db)
    const data = col.insert(req.file)
    db.saveDatabase()
    
    res.json({ id: data.$loki, file: req.file })
  } catch (err) {
    res.sendStatus(400).json('Error happen!')
  }
}

export async function uploadMultipleFiles(req, res) {
  try {
    const col = await loadCollection(CONFIG.loki.COLLECTION_NAME, db)
    let data = [].concat(col.insert(req.files))
    db.saveDatabase()

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
