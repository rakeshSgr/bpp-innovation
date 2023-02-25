'use strict'
const router = require('express').Router()
const bppController = require('@controllers/')
const { authVerifier } = require('@middlewares/authVerifier')

router.use(authVerifier)

router.post('/search', bppController.search)
router.post('/transcriptCallback', bppController.transcriptCallback)
router.post('/autofill', bppController.autofill)
router.post('/oauth2/2/xml/eaadhaar', bppController.eaadhaar)

module.exports = router
