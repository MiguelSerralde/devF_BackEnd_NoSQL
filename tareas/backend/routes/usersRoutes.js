const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUSerData} = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

//Public routes
router.post('/', registerUser)
router.post('/login', loginUser)

//Private routes
router.get('/getMe', protect, getUSerData)

module.exports = router