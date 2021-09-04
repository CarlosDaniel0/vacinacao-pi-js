const express = require('express')
const router = express.Router()
const dosesController = require('../controllers/dosesController')

router.get('/', dosesController.getAll)

module.exports = router
