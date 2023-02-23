'use strict'
const responses = require('@constants/responses.json')

const searchService = require('@services/apis/search')
const autofillService = require('@services/apis/autofill')
const transcriptCallbackService = require('@services/apis/transcriptCallback')

exports.search = async (req, res) => {
	try {
		await res.status(200).send(responses.success_ack)
		searchService.search(req.body)
	} catch (err) {
		console.log(err)
	}
}

exports.autofill = async (req, res) => {
	try {
		let response = await autofillService.autofill(req.body)
		await res.status(200).send(response)
	} catch (err) {
		console.log(err)
	}
}

exports.transcriptCallback = async (req, res) => {
	try {
		//console.log(req.headers.authorization)
		if (req.headers.authorization != process.env.CALLBACK_TOKEN) {
			await res.status(401).send('unauth')
		} else {
			let response = await transcriptCallbackService.transcriptCallback(req.body)
			await res.status(200).send(response)
		}
	} catch (err) {
		console.log(err)
	}
}
