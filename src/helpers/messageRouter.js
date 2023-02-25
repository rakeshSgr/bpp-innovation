'use strict'
const messageHandlers = require('@services/messageHandlers')
const discordHandler = require('@services/discordHandler')

exports.messageRouter = (topic, value) => {
	try {
		if (topic === process.env.KAFKA_ON_SESSION_COMPLETION_TOPIC) {
			// messageHandlers.sessionSummarization(value)
			discordHandler.discord(value)
		}
	} catch (err) {
		console.log('Error At ConsumerMessageRouter: ', err)
	}
}
