'use strict'

const axios = require('axios')
const sessionTranscriptQueries = require('@database/storage/sessionTranscript/queries')

const sessionSummarization = async (value) => {
	try {
		const sessionTranscript = await sessionTranscriptQueries.findOne({ sessionId: value._id })
		if (sessionTranscript?.sessionId == value._id) {
			return console.log('Session already Enqueued!!!')
		}
		const url = value.recordingUrl
		const sessionId = value._id

		const headers = {
			authorization: process.env.ASSENMBLYAI_TOKEN,
		}
		const body = {
			audio_url: url,
			language_code: 'en',
			webhook_url: 'https://dev.elevate-apis.shikshalokam.org/bpp-innovation/transcriptCallback',
			webhook_auth_header_name: 'authorization',
			webhook_auth_header_value: process.env.CALLBACK_TOKEN,
		}
		const response = await axios.post(process.env.ASSEMBLYAI_URI, body, { headers, timeout: 0 })
		await sessionTranscriptQueries.create({
			sessionId,
			transcriptId: response.data.id,
			recordingURL: url,
		})
		console.log('Enqueued to assembly AI & stored' + sessionId + 'to DB')
	} catch (err) {
		console.log(err)
	}
}

const messageHandlers = { sessionSummarization }

module.exports = messageHandlers
