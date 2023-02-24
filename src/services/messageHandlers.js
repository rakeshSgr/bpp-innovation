'use strict'

const axios = require('axios')
const sessionTranscriptQueries = require('@database/storage/sessionTranscript/queries')

const sessionSummarization = async (value) => {
	try {
		const url = value.recordings.recording.playback.format[1].url
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
		//console.log(response.data)
		await sessionTranscriptQueries.create({
			sessionId,
			transcriptId: response.data.id,
		})
	} catch (err) {
		console.log(err)
	}
}

const messageHandlers = { sessionSummarization }

module.exports = messageHandlers
