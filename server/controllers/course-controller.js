const Course = require('../models/course')
const User = require('../models/user')
const HttpError = require('../models/http-error')
const mongoose = require('mongoose')

const getCourses = async (req, res, next) => {
	let courses
	try {
		courses = await Course.find({})
	} catch (err) {
		const error = new HttpError(
			'Fetching courses failed, please try again later.',
			500
		)
		return next(error)
	}
	res.json({ courses: courses })
}

const getCourse = async (req, res, next) => {
	const { courseId } = req.params
	let course
	try {
		course = await Course.findOne({ courseId: courseId })
	} catch (err) {
		const error = new HttpError(
			'Fetching courses failed, please try again later.',
			500
		)
		return next(error)
	}

	if (!course) {
		const error = new HttpError(
			'Invalid credentials, could found this course.',
			401
		)
		return next(error)
	}
	res.json({ course: course })
}

const getCourseByTerm = async (req, res, next) => {
	const { term } = req.params
	let course
	try {
		course = await Course.find({ term: term })
	} catch (err) {
		const error = new HttpError(
			'Fetching courses failed, please try again later.',
			500
		)
		return next(error)
	}

	if (!course) {
		const error = new HttpError(
			'Invalid credentials, could found this course.',
			401
		)
		return next(error)
	}
	res.json({ courses: course })
}

const getCourseByTeacher = async (req, res, next) => {
	const { teacher } = req.params
	let course
	try {
		course = await Course.find({ teacher: teacher })
	} catch (err) {
		const error = new HttpError(
			'Fetching courses failed, please try again later.',
			500
		)
		return next(error)
	}

	if (!course) {
		const error = new HttpError(
			'Invalid credentials, could found this course.',
			401
		)
		return next(error)
	}
	res.json({ courses: course })
}

const addCourse = async (req, res, next) => {
	const { name, courseId, credit, day, time, sec, teacher, term } = req.body

	const createdCourse = new Course({
		name,
		courseId,
		credit,
		day,
		time,
		sec,
		teacher,
		term,
	})

	try {
		await createdCourse.save()
	} catch (err) {
		const error = new HttpError(
			'Add course failed, please try again later.',
			500
		)
		return next(error)
	}

	res.status(201).json({ course: createdCourse })
}

const registration = async (req, res, next) => {
	const { studentId } = req.params
	const { courseId } = req.body

	let user

	try {
		user = await User.findOne({ studentId: studentId })
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not register this course.',
			500
		)
		return next(error)
	}

	if (!user) {
		const error = new HttpError(
			'Invalid credentials, could not register this course.',
			401
		)
		return next(error)
	}

	let course

	try {
		course = await Course.findOne({ courseId: courseId })
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not register this course.',
			500
		)
		return next(error)
	}

	if (!course) {
		const error = new HttpError(
			'Invalid credentials, could not register this course.',
			401
		)
		return next(error)
	}

	const registrationCourse = new Course({
		courseId,
	})

	try {
		await registrationCourse.save()
	} catch (err) {
		const error = new HttpError(
			'Add course failed, please try again later.',
			500
		)
		return next(error)
	}
}

const deleteCourse = async (req, res, next) => {
	const { courseId } = req.params

	let course

	try {
		course = await Course.findOneAndRemove({ courseId })
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete course.',
			500
		)
		return next(error)
	}

	res.status(200).json({ message: 'Remove success' })
}

const updateCourse = async (req, res, next) => {
	const { courseId } = req.params
	const { name, credit, day, time } = req.body

	let course
	try {
		course = await Course.findOneAndUpdate(
			{ courseId },
			{ name, credit, day, time },
			{ new: true }
		)
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete course.',
			500
		)
		return next(error)
	}

	res.json(course)
}

exports.getCourses = getCourses
exports.getCourse = getCourse
exports.addCourse = addCourse
exports.deleteCourse = deleteCourse
exports.updateCourse = updateCourse
exports.registration = registration
exports.getCourseByTerm = getCourseByTerm
exports.getCourseByTeacher = getCourseByTeacher
