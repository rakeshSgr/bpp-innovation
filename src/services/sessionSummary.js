'use strict'

const axios = require('axios')
const sessionTranscriptQueries = require('@database/storage/sessionTranscript/queries')

exports.sessionSummarization = async (requestBody) => {
	try {
		let headers = {
			authorization: process.env.ASSENMBLYAI_TOKEN,
		}
		const response = await axios.get(
			process.env.ASSEMBLYAI_URI + '/' + requestBody.transcript_id,

			{ headers, timeout: 0 }
		)
		await sessionTranscriptQueries.findOneAndUpdate(
			{
				transcriptId: requestBody.transcript_id,
			},
			{ sessionTranscript: response.data.text }
		)

		headers = {
			Authorization: process.env.CHATGPT_TOKEN,
		}
		const body = {
			model: 'text-davinci-003',
			prompt: 'Summarize this meeting in brief\n\n\nAbout: ' + response.data.text,
			temperature: 0.7,
			max_tokens: 500,
			top_p: 1,
			frequency_penalty: 0.6,
			presence_penalty: 1,
		}
		const res = await axios.post(process.env.CHATGPT_COMPLETIONS_URI, body, { headers, timeout: 0 })
		console.log('sssssss', res.data.choices)
	} catch (err) {
		console.log(err)
	}
}
