import express from 'express'
const router = express.Router()

import { login, register, verifyAuth } from '../controllers/auth/index.mjs'

router.post('/login',      (req, res) => login(req, res))
router.post('/verifyAuth', (req, res) => verifyAuth(req, res))
router.post('/register',   (req, res) => register(req, res))

export default router