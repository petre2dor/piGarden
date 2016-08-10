var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', function (req, res) {
    res.status(500)
    res.json({ error: 'messages' })
})

// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    console.log('body' + JSON.stringify(req.body))
    res.send(JSON.stringify({response: "OK"}))
})

app.listen(3000)
