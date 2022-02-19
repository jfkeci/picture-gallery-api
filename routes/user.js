import express from 'express'

import { loginUser, registerUser, getUsers, getUserName, getUser } from '../controllers/user.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/name/:id', getUserName)

export default router;