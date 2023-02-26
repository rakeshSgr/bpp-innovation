'use strict'
const { kafkaProducers } = require('@helpers/kafkaProducers')

const { discordService } = require('@services/discordService')
const discord = async (sessionDetails) => {
	try {
		console.log('reached')
		discordService(sessionDetails)
			.then((data) => {
				data.type = 'SESSION_DISCORD'
				kafkaProducers.discord(data.channelName, data)
			})
			.catch(console.error)
	} catch (err) {
		console.log(err)
	}
}

const discordHandler = { discord }

module.exports = discordHandler
