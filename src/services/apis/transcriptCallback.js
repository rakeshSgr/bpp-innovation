'use strict'

const sessionSummarizationService = require('@services/sessionSummary')
exports.transcriptCallback = async (requestBody) => {
	try {
		await sessionSummarizationService.sessionSummarization(requestBody)
		return true
	} catch (err) {
		console.log(err)
	}
}
