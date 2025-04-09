const express = require('express')
const middleware = require('./utils/middleware')

const app = express()

app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app