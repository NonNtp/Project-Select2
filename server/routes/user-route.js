const express = require('express')
const {
	getUsers,
	signUp,
	login,
	getUser,
} = require('../controllers/user-controller')

const router = express.Router()

router.get('/users', getUsers)
router.get('/user/:studentId', getUser)

router.post('/signup', signUp)
router.post('/login', login)

module.exports = router
