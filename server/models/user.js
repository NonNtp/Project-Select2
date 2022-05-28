const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	studentId: {
		type: String,
		required: true,
	},
	years: {
		type: String,
		required: true,
	},
	section: {
		type: String,
		required: true,
	},
	tel: {
		type: String,
		required: true,
		minlength: 10,
	},
	type: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('User', userSchema)
