'use strict'

const axios = require('axios')
const sessionTranscriptQueries = require('@database/storage/sessionTranscript/queries')
const { kafkaProducers } = require('@helpers/kafkaProducers')
const sendMessageTranscriptToDiscord = require('@services/discordService')
exports.sessionSummarization = async (requestBody) => {
	try {
		let headers = {
			authorization: process.env.ASSENMBLYAI_TOKEN,
		}
		const transcriptRes = await axios.get(
			process.env.ASSEMBLYAI_URI + '/' + requestBody.transcript_id,

			{ headers, timeout: 0 }
		)

		headers = {
			Authorization: process.env.CHATGPT_TOKEN,
		}
		const body = {
			model: 'text-davinci-003',
			prompt: 'Summarize this meeting in brief\n\n\nAbout: ' + transcriptRes.data.text,
			temperature: 0.7,
			max_tokens: 500,
			top_p: 1,
			frequency_penalty: 0.6,
			presence_penalty: 1,
		}
		const summaryRes = await axios.post(process.env.CHATGPT_COMPLETIONS_URI, body, { headers, timeout: 0 })
		await sessionTranscriptQueries.findOneAndUpdate(
			{
				transcriptId: requestBody.transcript_id,
			},
			{ sessionTranscript: transcriptRes.data.text, summary: summaryRes.data.choices[0].text }
		)
		const sessionTranscript = await sessionTranscriptQueries.findOne({ transcriptId: requestBody.transcript_id })
		console.log('sessionTranscript.sessionSummarization', sessionTranscript)
		await sendMessageTranscriptToDiscord.sendMessageTranscript(sessionTranscript)
		Promise.all([
			kafkaProducers.session(sessionTranscript.sessionId, {
				type: 'SESSION_SUMMARY',
				sessionId: sessionTranscript.sessionId,
				sessionSummary: summaryRes.data.choices[0].text,
				sessionTranscript: transcriptRes.data.text,
			}),
		])
			.then(() => {
				console.log('Session Summary Passed To Producer Successfully.')
			})
			.catch(() => {
				console.error('Something went wrong while passing session Summary!')
			})
	} catch (err) {
		console.error('sessionSummarization error', err)
	}
}
