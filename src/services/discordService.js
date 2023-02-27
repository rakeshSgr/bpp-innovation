const { GatewayIntentBits, Client } = require('discord.js')
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const discordQueries = require('@database/storage/discord/queries')

//First param from discord web
const discordService = async (sessionDetails) => {
	return new Promise(async (resolve, reject) => {
		client.on('ready', async () => {
			console.log('ready')
		})
		client.login(process.env.DISCORD_TOKEN)
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

			resolve(discordData)
		} catch (e) {
			reject(e)
		}
	})
}

const sendMessageTranscript = async (transcript) => {
	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)
	try {
		let channel = await discordQueries.find({ sessionId: transcript.sessionId })
		let channelDetails = channel[0]

		await rest.post(Routes.channelMessages(channelDetails.channelId), {
			body: {
				content: `**Session Summary** \n${transcript.summary}`,
			},
		})

		await rest.post(Routes.channelMessages(channelDetails.channelId), {
			body: {
				content: `**Session Recording** \n${transcript.recordingURL}`,
			},
		})

		await rest.post(Routes.channelMessages(channelDetails.channelId), {
			body: {
				content: `**Session Transcript** \n${transcript.sessionTranscript}`,
			},
		})

		return true
	} catch (error) {
		console.error(error)
	}
}
exports.discordService = discordService
exports.sendMessageTranscript = sendMessageTranscript
