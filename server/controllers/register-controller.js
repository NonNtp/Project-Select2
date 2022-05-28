const User = require('../models/user')
const Course = require('../models/course')
const Register = require('../models/register')
const HttpError = require('../models/http-error')

const registration = async (req, res, next) => {
	const { stdId } = req.params
	const { courseId, studentId, sec, term } = req.body

	let user

	try {
		user = await User.findOne({ studentId: stdId })
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

	const registerCourse = new Register({
		studentId,
		courseId,
		sec,
		term,
	})

	let registerExist

	try {
		registerExist = await Register.findOne({ courseId: courseId })
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not register this course.',
			500
		)
		return next(error)
	}

	// if (registerExist && user) {
	// 	const error = new HttpError(
	// 		'Invalid credentials, could not register this course.',
	// 		401
	// 	)
	// 	return next(error)
	// }

	try {
		await registerCourse.save()
	} catch (err) {
		const error = new HttpError(
			'Signing up failed, please try again later.',
			500
		)
		return next(error)
	}

	res.status(201).json(registerCourse)
}

const getRegisters = async (req, res, next) => {
	let register
	try {
		register = await Register.find({})
	} catch (err) {
		const error = new HttpError(
			'Fetching users failed, please try again later.',
			500
		)
		return next(error)
	}
	res.json(register)
}

const getRegister = async (req, res, next) => {
	const { studentId } = req.params

	let register

	try {
		register = await Register.find({ studentId: studentId })
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could found this user.',
			500
		)
		return next(error)
	}

	if (!register) {
		const error = new HttpError(
			'Invalid credentials, could found this user.',
			401
		)
		return next(error)
	}

	res.status(200).json({ courses: register })
}

const getCourseByCourseIdInRegister = async (req, res, next) => {
	const { courseId } = req.params

	let register

	try {
		register = await Register.find({ courseId: courseId })
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could found this user.',
			500
		)
		return next(error)
	}

	if (!register) {
		const error = new HttpError(
			'Invalid credentials, could found this user.',
			401
		)
		return next(error)
	}

	res.status(200).json({ courses: register })
}

const withDraw = async (req, res, next) => {
	const { studentId, courseId } = req.params
}

exports.registration = registration
exports.getRegisters = getRegisters
exports.getRegister = getRegister
exports.getCourseByCourseIdInRegister = getCourseByCourseIdInRegister
