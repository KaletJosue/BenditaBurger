import { Router } from "express";

import { method as authenticaction} from "../auth/authentication.js"
import { method as updateUser} from "../auth/updateUser.js"
import { method as authorization} from "../middleware/authorization.js"
import { method as inventory} from "../modules/inventory/inventory.js"
import { method as expense} from "../modules/expenses/expenses.js"
import { method as products} from "../modules/products/products.js"
import { method as category} from "../modules/category/category.js"
import { method as users} from "../modules/users/users.js"
import { method as favorite} from "../modules/favorite/favorite.js"
import { method as car} from "../modules/car/car.js"
import { method as orders} from "../modules/orders/orders.js"

import { createSession } from "../pay/payment.controller.js";

import { upload, upload2, upload3 } from '../cloudinary/cloudinary.js';

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

router.get('/admin', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/home/home.html')) 
})

router.get('/admin/delivery', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/delivery/delivery.html')) 
})

router.get('/admin/product', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/products/products.html')) 
})

router.get('/admin/section', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/sections/sections.html')) 
})

router.get('/admin/sale', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/sales/sales.html')) 
})

router.get('/admin/statistic', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/statics/statics.html')) 
})

router.get('/admin/expenses', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/bills/bills.html')) 
})

router.get('/admin/inventory', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/inventory/inventory.html')) 
})

router.get('/admin/config', authorization.soloAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/config/config.html')) 
})

router.get('/admin/users', authorization.soloSuperAdmin, authorization.revisarVerified, authorization.revisarStatus, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/admin/users/users.html')) 
})

router.get('/checker', authorization.soloChecker, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/checker/home/home.html')) 
})

router.get('/checker/delivery', authorization.soloChecker, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/checker/delivery/delivery.html')) 
})

router.get('/checker/inventory', authorization.soloChecker, authorization.revisarVerified, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/checker/inventory/inventory.html')) 
})

router.get('/user', authorization.revisarVerified, authorization.soloUsers, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/user/home/home.html')) 
})

router.get('/user/delivery', authorization.revisarVerified, authorization.soloUsers, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/user/delivery/delivery.html')) 
})

router.get('/user/car', authorization.revisarVerified, authorization.soloUsers, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/user/car/car.html')) 
})

router.get('/user/favorite', authorization.revisarVerified, authorization.soloUsers, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/user/favorite/favorite.html')) 
})

router.get('/user/config', authorization.revisarVerified, authorization.soloUsers, (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/user/config/config.html')) 
})

router.get('/verified', (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/verified/verified.html'))
})

router.get('/error', (req, res) => {
     res.sendFile(path.resolve(__dirname, '../views/error/error.html'))
})

router.get('/api/userData', authenticaction.userRol)
router.get('/api/inventoryData', inventory.inventoryData)
router.get('/api/expenseData', expense.expenseData)
router.get('/api/productData', products.productData)
router.get('/api/categoryData', category.categoryData)
router.get('/api/favoriteData', favorite.favoriteData)
router.get('/api/carData', car.carData)
router.get('/api/ordersData', orders.orderData)

router.put('/api/updateUser', upload.single('profilePic'), updateUser.updateData)

router.post('/api/signUp', authenticaction.signUp)
router.post('/api/signIn', authenticaction.signIn)
router.post('/api/verified', authenticaction.verified)

router.post('/api/updatePassword', updateUser.updatePassword)
router.post('/api/deleteUser', authenticaction.deleteUser)

router.post('/api/addInventory', upload2.single('inventoryPic'), inventory.addInventory)
router.post('/api/deleteInventory', inventory.deleteInventory)
router.post('/api/updateInventory', inventory.updateInventory)

router.post('/api/updateExpense', expense.updateExpense)
router.post('/api/addExpense', expense.addExpense)

router.post('/api/addProduct', upload3.single('productPic'), products.addProduct)
router.post('/api/products/updateStatus', products.updateStatusProduct)
router.post('/api/updateProduct', products.updateProduct)
router.post('/api/deleteProduct', products.deleteProduct)

router.post('/api/addCategory', category.addCategory)
router.post('/api/updateCategory', category.updateCategory)
router.post('/api/deleteCategory', category.deleteCategory)

router.post('/api/userDataControl', users.usersData)
router.post('/api/userDataControl/updateStatus', users.updateStatus)
router.post('/api/userUpdate', users.updateRol)

router.post('/api/addFavorite', favorite.addFavorite)
router.post('/api/deleteFavorite', favorite.deleteFavorite)

router.post('/api/addCar', car.addCar)
router.post('/api/updateCar', car.updateCar)
router.post('/api/deleteCar', car.deleteCar)

router.post('/api/payment', createSession)

export default router;