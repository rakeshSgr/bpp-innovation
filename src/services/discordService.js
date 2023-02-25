const { GatewayIntentBits, Client } = require('discord.js')
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const discordQueries = require('@database/storage/discord/queries')

//First param from discord web
const discordService = async (sessionDetails) => {
	const p = new Promise((resolve, reject) => {
		client.on('ready', async () => {
			try {
				const guild = await client.guilds.fetch(process.env.GUILD_ID)
				const createChannel = await guild.channels.create({
					name: sessionDetails.title,
					reason: sessionDetails.title,
				})
				const channel = await guild.channels.cache.get(createChannel.id)
				const invite = await channel.createInvite({
					maxUses: 100,
				})
				let discordData = {
					sessionId: sessionDetails._id,
					channelId: createChannel.id,
					channelName: createChannel.name,
					inviteLink: `https://discord.gg/${invite.code}`,
				}
				await discordQueries.create(discordData)
				//disciption data
				await sendMessageOnChannel(createChannel.id, sessionDetails.description)
				//url data
				await sendMessageOnChannel(createChannel.id, sessionDetails.recordingUrl)

				let channelDetails = discordQueries.findOne({ sessionId: sessionDetails._id })
				resolve(channelDetails)
			} catch (e) {
				reject(e)
			}
		})
		client.login(process.env.DISCORD_TOKEN)
	})
	return p
}

const sendMessageOnChannel = async (channelId, message) => {
	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

	try {
		await rest.post(Routes.channelMessages(channelId), {
			body: {
				content: message,
			},
		})
		return true
	} catch (error) {
		console.error(error)
	}
}

const sendMessageTranscript = async (transcript) => {
	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)
	try {
		let channelDetails = await discordQueries.findOne({ transcript: sessionId })

		await rest.post(Routes.channelMessages(channelDetails.channelId), {
			body: {
				content: transcript.summary,
			},
		})
		return true
	} catch (error) {
		console.error(error)
	}
}
exports.discordService = discordService
