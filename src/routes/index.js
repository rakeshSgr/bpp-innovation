'use strict'
const router = require('express').Router()
const bppController = require('@controllers/')
const { authVerifier } = require('@middlewares/authVerifier')

router.use(authVerifier)
router.post('/search', bppController.search)
router.get('/autofill', bppController.autofill)

module.exports = router
