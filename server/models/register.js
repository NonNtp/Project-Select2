const mongoose = require('mongoose')

const Schema = mongoose.Schema

const registerSchema = new Schema({
	studentId: {
		type: String,
		required: true,
	},
	courseId: {
		type: String,
		required: true,
	},
	sec: {
		type: String,
		required: true,
	},
	term: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('register', registerSchema)
