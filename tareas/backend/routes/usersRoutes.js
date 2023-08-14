const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUSerData} = require('../controller/userController')

//Public routes
router.post('/', registerUser)
router.post('/login', loginUser)

//Private routes
router.get('/getMe', getUSerData)

module.exports = router