import { Router } from "express";

import { method as authenticaction} from "../auth/authentication.js"
import { method as authorization} from "../middleware/authorization.js"

import path, { dirname } from 'path'
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const router = Router()

router.get('/', (req, res) => { 
    res.sendFile(path.resolve(__dirname, '../views/index.html')) 
})

router.get('/signIn', authorization.userToken, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/login/login.html')) 
})

router.get('/admin', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/home/home.html')) 
})

router.get('/checker', authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/checker/home/home.html')) 
})

router.get('/user', authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/user/home/home.html')) 
})

router.get('/verified', (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/verified/verified.html'))
})

router.get('/error', (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/error/error.html'))
})

router.post('/api/signUp', authenticaction.signUp)
router.post('/api/signIn', authenticaction.signIn)
router.post('/api/verified', authenticaction.verified)

export default router;