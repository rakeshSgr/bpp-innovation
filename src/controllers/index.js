'use strict'
const responses = require('@constants/responses.json')
const discordHandler = require('@services/discordHandler')
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

exports.discord = async function (req, res) {
	let sessionDetails = {
		_id: '63f846237f4151bcb6822493',
		title: 'Introduction and Hands-on Experience with Burpsuit',
		description:
			"This session will provide an introduction to the use of burpsuit as a web security tool, and how it can be used to secure your organization's applications. Participants will gain hands-on experience with burpsuit by performing practical exercises on 23rd February 2023 from 8:30 PM to 9:00 PM GMT . The topics covered in this session include understanding what burpsuit is, its components, and using it for scanning and auditing web applications. By the end of this session, participants will have a better understanding of burpsuit and its capabilities.",
		recordingUrl: 'http://google.com/recording',
	}
	try {
		let data = await discordHandler.discord(sessionDetails)
		res.send(data)
	} catch (err) {
		console.log(err)
	}
}
