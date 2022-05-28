const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

const User = require('../models/user')
const Course = require('../models/course')
const HttpError = require('../models/http-error')

const getUsers = async (req, res, next) => {
	let users
	try {
		users = await User.find({})
	} catch (err) {
		const error = new HttpError(
			'Fetching users failed, please try again later.',
			500
		)
		return next(error)
	}
	res.json({ users: users })
}

const signUp = async (req, res, next) => {
	const { name, email, studentId, years, section, tel, type } = req.body

	let existingUser
	try {
		existingUser = await User.findOne({ email: email })
	} catch (err) {
		const error = new HttpError(
			'Signing up failed, please try again later.',
			500
		)
		return next(error)
	}

	if (existingUser) {
		const error = new HttpError(
			'User exists already, please login instead.',
			422
		)
		return next(error)
	}

	const createdUser = new User({
		name,
		email,
		studentId,
		years,
		section,
		tel,
		type,
	})

	try {
		await createdUser.save()
	} catch (err) {
		const error = new HttpError(
			'Signing up failed, please try again later.',
			500
		)
		return next(error)
	}

	res.status(201).json({ user: createdUser })
}

const login = async (req, res, next) => {
	const { email, studentId } = req.body

	let existingUser

	try {
		existingUser = await User.findOne({ email: email })
	} catch (err) {
		const error = new HttpError(
			'Logging in failed, please try again later.',
			500
		)
		return next(error)
	}

	if (!existingUser) {
		const error = new HttpError(
			'Invalid credentials, could not log you in.',
			401
		)
		return next(error)
	}

	let existingStudentId

	try {
		existingStudentId = await User.findOne({ studentId: studentId })
	} catch (err) {
		const error = new HttpError(
			'Logging in failed, please try again later.',
			500
		)
		return next(error)
	}

	if (!existingStudentId) {
		const error = new HttpError(
			'Invalid credentials, could not log you in.',
			401
		)
		return next(error)
	}

	let token
	try {
		token = jwt.sign(
			{
				email: existingUser.email,
				studentId: existingUser.studentId,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		)
	} catch (err) {
		const error = new HttpError(
			'Logging in failed, please try again later.',
			500
		)
		return next(error)
	}

	res.json({
		name: existingUser.name,
		email: existingUser.email,
		studentId: existingUser.studentId,
		type: existingUser.type,
		token: token,
	})
}

const getUser = async (req, res, next) => {
	const { studentId } = req.params

	let user

	try {
		user = await User.findOne({ studentId: studentId })
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could found this user.',
			500
		)
		return next(error)
	}

	if (!user) {
		const error = new HttpError(
			'Invalid credentials, could found this user.',
			401
		)
		return next(error)
	}

	res.status(200).json(user)
}

exports.getUsers = getUsers
exports.signUp = signUp
exports.login = login
exports.getUser = getUser
