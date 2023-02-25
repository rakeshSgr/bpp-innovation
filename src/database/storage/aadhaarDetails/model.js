'use strict'
const mongoose = require('mongoose')

const db = require('@configs/mongodb')

const aadhaarDetails = new mongoose.Schema({
	Rar: {
		type: 'String',
	},
	UidData: {
		Poi: {
			dob: {
				type: 'String',
			},
			gender: {
				type: 'String',
			},
			name: {
				type: 'String',
			},
		},
		Poa: {
			type: 'String',
		},
		LData: {
			type: 'String',
		},
		Pht: {
			type: 'String',
		},
	},
	Signature: {
		type: 'String',
	},
	uid: {
		type: 'String',
	},
})

const model = db.model('aadhaarDetails', aadhaarDetails)

module.exports = model
