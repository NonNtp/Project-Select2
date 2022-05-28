const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	courseId: {
		type: String,
		required: true,
	},
	credit: {
		type: Number,
		required: true,
	},
	day: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	sec: {
		type: String,
		required: true,
	},
	teacher: {
		type: String,
		required: true,
	},
	term: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Course', courseSchema)
