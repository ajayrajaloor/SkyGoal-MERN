const express = require('express')
const { postRegister, postLogin, userDetails } = require('../controller/authController')
const verifyAuth = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/register',postRegister)

router.post('/login',postLogin)

router.get('/userDetails',verifyAuth,userDetails)



module.exports = router