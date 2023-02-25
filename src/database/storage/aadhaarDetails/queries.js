'use strict'
const aadhaarDetails = require('./model')

exports.create = async (data) => {
	try {
		return await new aadhaarDetails(data).save()
	} catch (err) {
		console.log(err)
	}
}

exports.findById = async (id) => {
	try {
		return await aadhaarDetails.findById(id).lean()
	} catch (err) {
		console.log(err)
	}
}
exports.findOne = async (filter) => {
	try {
		console.log(filter)
		return await aadhaarDetails.findOne(filter)
	} catch (err) {
		console.log(err)
	}
}
exports.findById = async (id) => {
	try {
		return await aadhaarDetails.findById(id).lean()
	} catch (err) {
		console.log(err)
	}
}

exports.findOneAndUpdate = async (filter, update) => {
	try {
		let doc = await aadhaarDetails.findOneAndUpdate(filter, update)
		return doc
	} catch (err) {
		console.log('session.findOrCreate: ', err)
		throw err
	}
}
