const express = require('express')
const router = express.Router()

const TranferController = require('../app/controllers/TranferController')

router.get('/', TranferController.tranfer)

module.exports = router