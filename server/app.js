const express = require('express')
const models = require('./models')
// const flash = require('flash')
const bodyParser = require('body-parser')
// const session = require('express-session')
const control = require('./controllers/controllerApp.js')
const midWare = require('./middlewares')
var app = express()
//////////////midware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


// app.use(flash())


//READ
app.get('/api/read', control.read )

//CREATE
app.post('/api/signup', midWare.cekReg, control.create)

//UPDATE
app.put('/api/update', control.update)

//DELETE
app.delete('/api/delete/:id', control.destroy)

//Login
app.post('/api/login', midWare.cekLog, control.login)


//PORT RUNNING 3000 BRO
app.listen('3000', () => console.log('SERVER runnnnnnnnnnn 3000'))
