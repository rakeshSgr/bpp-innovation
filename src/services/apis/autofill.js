'use strict'
const axios = require('axios')
const moment = require('moment-timezone');

exports.autofill = async (requestBody) => {
	try {
		const headers = {
			Authorization: process.env.CHATGPT_TOKEN,
		}
		console.log(moment.tz(requestBody.startDate * 1000 ,'Asia/Calcutta').format('DD/MM/YYYY, hh:mm:ss A [IST]'))
		const body = {
			model: 'text-davinci-003',
			prompt:
				'Generate a sessionDescription and sessionTitle in json format,sessionDescription having 6 sentences using the below data,include date details in sessionDescription :\nAbout: ' +
				requestBody.aboutSession +
				'\nstart date : ' +
				moment.tz(requestBody.startDate * 1000,'Asia/Calcutta').format('DD/MM/YYYY, hh:mm:ss A [IST]') +
				'\nend date:' +
				moment.tz(requestBody.endDate * 1000,'Asia/Calcutta').format('DD/MM/YYYY, hh:mm:ss A [IST]'),
			temperature: 0.7,
			max_tokens: 700,
			top_p: 1,
			frequency_penalty: 0.6,
			presence_penalty: 1,
		}
		const response = await axios.post(process.env.CHATGPT_COMPLETIONS_URI, body, { headers, timeout: 0 })
		return JSON.parse(response.data.choices[0].text)
	} catch (err) {
		console.log(err)
	}
}
