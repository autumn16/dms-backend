const express = require('express')
const dutyController = require('../controllers/duty.controller')

const router = express.Router()

router.get('/', dutyController.getIndex)

// router.get('/create', dutyController.getCreate)

router.post('/create', dutyController.postCreate)

router.get('/delete/:_id', dutyController.getDelete)

router.get('/search', dutyController.getSearch)

router.get('/update/:_id', dutyController.getUpdate)

router.post('/update/:_id', dutyController.postUpdate)

module.exports = router




