'use strict'
const { kafkaProducers } = require('@helpers/kafkaProducers')

const { discordService } = require('@services/discordService')
const discord = async (sessionDetails) => {
	try {
		console.log('reached')
		discordService(sessionDetails)
			.then((data) => {
				data.type = 'SESSION_DISCORD'
				Promise.all([kafkaProducers.discord(data.channelName, data)])
					.then(() => {
						console.log('channel details Passed To Producer Successfully.')
					})
					.catch(() => {
						console.error('Something went wrong while passing channel details!')
					})
			})
			.catch(console.error)
	} catch (err) {
		console.log(err)
	}
}

const discordHandler = { discord }

module.exports = discordHandler
