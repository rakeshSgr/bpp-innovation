'use strict'
const router = require('express').Router()
const bppController = require('@controllers/')
const { authVerifier } = require('@middlewares/authVerifier')

router.use(authVerifier)

console.log('reched here')
router.post('/search', bppController.search)
router.post('/transcriptCallback', bppController.transcriptCallback)
router.post('/autofill', bppController.autofill)
router.post('/discord', bppController.discord)

module.exports = router
