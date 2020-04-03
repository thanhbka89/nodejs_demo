import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'API User v1.0' })
})

export default router