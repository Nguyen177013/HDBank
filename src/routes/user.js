const express = require('express')
const router = express.Router()

const UserController = require('../app/controllers/UserController')

router.get('/login', UserController.login)
router.get('/register', UserController.register)

module.exports = router