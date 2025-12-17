const express = require('express')
const { getUserProfile, getAllUsers } = require('../controllers/userController')
const router = express.Router()

router.get('/profile',getUserProfile)
router.get('/',getAllUsers)

module.exports =router 