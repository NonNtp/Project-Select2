const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRouter = require('./routes/user-route')
const courseRouter = require('./routes/course-route')
const registerRouter = require('./routes/register-route')

require('dotenv').config()

const app = express()

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: false,
	})
	.then(() => {
		console.log('Connect to database success')
	})
	.catch((err) => {
		console.log(err)
	})

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', userRouter)
app.use('/api', courseRouter)
app.use('/api', registerRouter)

app.use((req, res, next) => {
	const error = res.status(404).json({ error: 'Could not find this route.' })
	throw error
})

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`start server in port ${port}`)
})
