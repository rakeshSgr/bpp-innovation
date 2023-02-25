'use strict'
const mongoose = require('mongoose')

const db = require('@configs/mongodb')

const discord = new mongoose.Schema({
	sessionId: {
		type: String,
		required: true,
	},
	channelId: {
		type: String,
		index: true,
		required: false,
	},
	inviteLink: {
		type: String,
		required: false,
	},
	channelName: {
		type: String,
		required: false,
	},
})

const model = db.model('discord', discord)

module.exports = model
