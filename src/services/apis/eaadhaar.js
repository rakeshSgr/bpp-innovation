'use strict'
const aadhaarQueries = require('@database/storage/aadhaarDetails/queries')
const crypto = require('crypto')
exports.eaadhaar = async (requestBody) => {
	try {
		console.log(requestBody.uid)
		const aadhaarDoc = await aadhaarQueries.findOne({ uid: requestBody.uid })
		console.log(aadhaarDoc.UidData.Poi.name)
		if (aadhaarDoc.UidData.Poi.name == requestBody.name) {
			return {
				txnId: crypto.randomUUID(),
				uid: aadhaarDoc.uid,
				verificationResult: {
					name: aadhaarDoc.UidData.Poi.name == requestBody.name ? 'Y' : 'N',
					dob: aadhaarDoc.UidData.Poi.dob == requestBody?.dob ? 'Y' : 'N',
					gender: aadhaarDoc.UidData.Poi.gender == requestBody?.gender ? 'Y' : 'N',
				},
			}
		}
	} catch (err) {
		console.log(err)
	}
}
