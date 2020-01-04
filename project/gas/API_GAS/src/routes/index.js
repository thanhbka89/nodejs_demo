const express = require('express')
const router = express.Router()
import Database from '../models/Database'

/**
 * HealthCheck
 */
router.get('/healthcheck/api', (req, res) => {
    res.status(200).json({ msg: 'Success', success: true })
})

router.get('/healthcheck/db', async (req, res) => {
    try {
        let DB = new Database
        let sql = `SELECT 1 + 1 AS solution`
        const result = await DB.query(sql)
            // .catch(e => console.log('Error: ', e.message))
        // console.log(`[debug-sql]:`, result)
        
        res.status(200).json({ msg: 'Success', success: true })
    } catch (e) {
        // console.log(`[debug-sql]:`, e)
        res.status(500).json({ msg: e.message, success: false })
    } finally {
        // console.log(`[debug]: mysql closed!!!`)
        // await DB.close()
    }
})


// Get all subscribers
router.get('/', (req, res) => {
    res.status(200).json({ msg: 'API Home!' })
})

// Get one subscriber
router.get('/:id', (req, res) => {
})

// Create one subscriber
router.post('/', (req, res) => {
})

// Update one subscriber
router.patch('/:id', (req, res) => {
})

// Delete one subscriber
router.delete('/:id', (req, res) => {
})

export default router
