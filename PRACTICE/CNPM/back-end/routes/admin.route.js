const express = require('express')
const adminController = require('../controllers/admin.controller')

const router = express.Router()

router.get('/login', adminController.getLogin)

router.post('/login', adminController.postLogin)


module.exports = router



