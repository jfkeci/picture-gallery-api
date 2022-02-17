import express from 'express'

import { loginUser, registerUser, getUsers } from '../controllers/user.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/', getUsers)

export default router;