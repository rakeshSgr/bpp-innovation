'use strict'
const responses = require('@constants/responses.json')
const discordHandler = require('@services/discordHandler')
const searchService = require('@services/apis/search')
const autofillService = require('@services/apis/autofill')
const transcriptCallbackService = require('@services/apis/transcriptCallback')
const eaadhaarService = require('@services/apis/eaadhaar')

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

exports.eaadhaar = async (req, res) => {
	try {
		let response = await eaadhaarService.eaadhaar(req.body)
		await res.status(200).send(response)
	} catch (err) {
		console.log(err)
	}
}
exports.discord = async function (req, res) {
	let sessionDetails = {
		_id: '63fa9d1d32c9916c766a1ccd',
		description: 'hellow wokr',
		title: 'this sessesion is good',
		recordingUrl: 'http://localhost:300',
	}
	try {
		let data = await discordHandler.discord(sessionDetails)
		res.send(data)
	} catch (err) {
		console.log(err)
	}
}
