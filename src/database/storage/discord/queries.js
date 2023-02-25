'use strict'
const sessionTranscript = require('./model')
const { isEmpty } = require('@utils/generic')

exports.create = async (data) => {
	try {
		return await new sessionTranscript(data).save()
	} catch (err) {
		console.log(err)
	}
}

exports.findById = async (id) => {
	try {
		return await sessionTranscript.findById(id).lean()
	} catch (err) {
		console.log(err)
	}
}
exports.findOne = async (filter) => {
	try {
		return await sessionTranscript.findOne({ filter }).lean()
	} catch (err) {
		console.log(err)
	}
}
exports.findById = async (id) => {
	try {
		return await sessionTranscript.findById(id).lean()
	} catch (err) {
		console.log(err)
	}
}

exports.findOneAndUpdate = async (filter, update) => {
	try {
		let doc = await sessionTranscript.findOneAndUpdate(filter, update)
		return doc
	} catch (err) {
		throw err
	}
}

exports.findByIds = async (ids) => {
	try {
		return await User.find({ _id: { $in: ids } }).lean()
	} catch (err) {
		console.log(err)
	}
}
