const express = require('express')
const {
	getCourses,
	getCourse,
	getCourseByTerm,
	addCourse,
	deleteCourse,
	updateCourse,
	registration,
	getCourseByTeacher,
} = require('../controllers/course-controller')

const router = express.Router()

router.get('/courses', getCourses)
router.get('/course/:courseId', getCourse)
router.get('/courses/:term', getCourseByTerm)
router.get('/courses/teacher/:teacher', getCourseByTeacher)

router.post('/addCourse', addCourse)
router.post('/registration/:studentId', registration)

router.put('/updateCourse/:courseId', updateCourse)

router.delete('/deleteCourse/:courseId', deleteCourse)

module.exports = router
