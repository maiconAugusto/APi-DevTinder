const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const port = 8880
const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const router = require('./routes')
const io = require('socket.io')(server)

const connectUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query
    connectUsers [ user ] = socket.id
    console.log(user,socket.id)
})

mongoose.connect('mongodb+srv://Agend:maicond333@cluster0-gkjmo.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
}).then(()=>{
    console.log('MongoDB conect')
}).catch(()=>{
    console.log('MongoDB not conect')
})

app.use((req,res,next)=>{
    req.io = io;
    req.connectUsers = connectUsers
   return next()
})
app.use(cors())
app.use(express.json())
app.use(bodyparser.text())
app.use(bodyparser.urlencoded({extended: true}))

app.use(router)

server.listen(port,()=>{
    console.log(`Server Runing at port: ${port}`)
})