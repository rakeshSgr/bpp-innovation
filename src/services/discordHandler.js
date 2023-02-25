'use strict'

const discordQueries = require('@database/storage/discord/queries')
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
// {
//   _id: new ObjectId("63f9af21fbce0dc3887f7393"),
//   sessionId: '63f846237f4151bcb6822493',
//   channelId: '1078931354286293012',
//   inviteLink: 'https://discord.gg/mYvESaeg',
//   channelName: 'introduction-and-hands-on-experience-with-burpsuit',
//   updatedAt: 2023-02-25T06:48:01.362Z,
//   createdAt: 2023-02-25T06:48:01.362Z,
//   __v: 0
// }
