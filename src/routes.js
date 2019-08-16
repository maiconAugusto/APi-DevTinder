const express = require('express')
const routes = express.Router()
const DevController = require('./controllers/devController')
const LikeController = require('./controllers/likeController')
const DeslikeController = require('./controllers/deslikeController')

routes.get('/devs',DevController.Index)
routes.post('/devs',DevController.Store)
routes.post('/devs/:devId/likes',LikeController.Store)
routes.post('/devs/:devId/deslike',DeslikeController.Store)

module.exports = routes