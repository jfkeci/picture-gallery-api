import express from 'express'

import { loginUser, registerUser } from '../controllers/auth.js'

const router = express.Router()

router.get('/login', loginUser)
router.post('/register', registerUser)

export default router;