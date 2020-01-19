//@ts-check
var express = require("express");
var router = express.Router();

var http = require("http");
var websocket = require("ws");

var port = process.argv[3];
var app = express();

app.get("/Connect4MainMenu", function(req, res){

    res.render('Connect4MainMenu', { title: 'Find Match' });


});

module.exports = router;