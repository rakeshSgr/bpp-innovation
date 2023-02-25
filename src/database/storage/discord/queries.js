'use strict'
const discord = require('./model')
const { isEmpty } = require('@utils/generic')

exports.create = async (data) => {
	try {
		return await new discord(data).save()
	} catch (err) {
		console.log(err)
	}
}

exports.findById = async (id) => {
	try {
		return await discord.findById(id).lean()
	} catch (err) {
		console.log(err)
	}
}
exports.findOne = async (filter) => {
	try {
		return await discord.findOne({ filter }).lean()
	} catch (err) {
		console.log(err)
	}
}
exports.findById = async (id) => {
	try {
		return await discord.findById(id).lean()
	} catch (err) {
		console.log(err)
	}
}

exports.findOneAndUpdate = async (filter, update) => {
	try {
		let doc = await discord.findOneAndUpdate(filter, update)
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
