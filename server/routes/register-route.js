const express = require('express')
const {
	registration,
	getRegister,
	getRegisters,
	getCourseByCourseIdInRegister,
} = require('../controllers/register-controller')

const router = express.Router()

router.get('/register/', getRegisters)
router.get('/register/:studentId', getRegister)
router.get('/register/courses/:courseId', getCourseByCourseIdInRegister)

router.post('/register/:stdId', registration)

module.exports = router
