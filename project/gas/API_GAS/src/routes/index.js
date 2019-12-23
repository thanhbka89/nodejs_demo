const express = require('express')
const router = express.Router()

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        res.status(200).json({ msg: 'API Home!' })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
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

module.exports = router
