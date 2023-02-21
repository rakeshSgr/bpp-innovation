'use strict'
const { externalPOSTRequest } = require('@utils/requester')

exports.externalRequests = {
	callbackPOST: externalPOSTRequest(process.env.SHOULD_SIGN_CALLBACK_REQUESTS === 'false' ? false : true),
}
