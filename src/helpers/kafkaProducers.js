'use strict'
const { produce } = require('@utils/kafkaProducer')

exports.kafkaProducers = {
	session: produce(process.env.KAFKA_SESSION_SUMMARY_TOPIC),
	discord: produce(process.env.DISCORD_DETAILS),
}
