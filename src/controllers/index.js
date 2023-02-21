'use strict'
const responses = require('@constants/responses.json')

const searchService = require('@services/apis/search')

exports.search = async (req, res) => {
	try {
		await res.status(200).send(responses.success_ack)
		searchService.search(req.body)
	} catch (err) {
		console.log(err)
	}
}
