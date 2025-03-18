import { Router } from "express";

import { method as authenticaction} from "../auth/authentication.js"
import { method as updateUser} from "../auth/updateUser.js"
import { method as authorization} from "../middleware/authorization.js"

import path, { dirname } from 'path'
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import multer from 'multer';

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

router.get('/admin/delivery', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/delivery/delivery.html')) 
})

router.get('/admin/product', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/products/products.html')) 
})

router.get('/admin/section', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/sections/sections.html')) 
})

router.get('/admin/sale', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/sales/sales.html')) 
})

router.get('/admin/statistic', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/statics/statics.html')) 
})

router.get('/admin/expenses', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/bills/bills.html')) 
})

router.get('/admin/inventory', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/inventory/inventory.html')) 
})

router.get('/admin/config', authorization.soloAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/config/config.html')) 
})

router.get('/admin/users', authorization.soloSuperAdmin, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/users/users.html')) 
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

router.get('/api/userData', authenticaction.userRol)

router.put('/api/updateUser', updateUser.updateData)

router.post('/api/signUp', authenticaction.signUp)
router.post('/api/signIn', authenticaction.signIn)
router.post('/api/verified', authenticaction.verified)

export default router;