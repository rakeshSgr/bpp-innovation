'use strict'
require('module-alias/register')
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('@configs/')
require('@utils/kafkaProducer').initialize()
require('@utils/kafkaConsumer').initialize()

require('@services/discordService').client

app.use(bodyParser.urlencoded({ extended: true, limit: '50MB' }))
app.use(bodyParser.json({ limit: '50MB' }))
app.use(cors())

app.all('*', (req, res, next) => {
	console.log('***BPP-INNOVATION Service Request Log***', {
		request: {
			requestType: `Request Type ${req.method} for ${req.url} on ${new Date()} from ${req.headers['user-agent']}`,
			requestHeaders: req.headers,
			requestBody: req.body,
			requestFiles: req.files,
		},
	})
	console.log('***BPP-INNOVATION Service Request Log Ends Here!!***')
	next()
})

app.use(process.env.ROOT_ROUTE, require('@routes'))

app.listen(process.env.APPLICATION_PORT, (res, err) => {
	if (err) onError(err)
	console.log('bpp-innovation Environment: ' + process.env.NODE_ENV)
	console.log('bpp-innovation is running on the port:' + process.env.APPLICATION_PORT)
})

function onError(error) {
	switch (error.code) {
		case 'EACCES':
			console.log(process.env.APPLICATION_PORT + ' requires elevated privileges')
			process.exit(1)
		// eslint-disable-next-line no-fallthrough
		case 'EADDRINUSE':
			console.log(process.env.APPLICATION_PORT + ' is already in use')
			process.exit(1)
		// eslint-disable-next-line no-fallthrough
		default:
			throw error
	}
}
