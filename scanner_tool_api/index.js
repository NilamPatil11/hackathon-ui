require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser')
var cors = require('cors');
// var request = require('request');
var xReq = require('./models/xpathRequest');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  }));
app.use(cors());
app.use(express.static(__dirname + '/node_modules'));



//api router
app.use('/xpathReq', xReq);

server.listen(process.env.PORT, () =>{
    console.log("Express app using port...", process.env.PORT);
});