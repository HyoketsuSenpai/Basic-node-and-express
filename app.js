var express = require("express");
var http = require('http');

var app = express();

app.use(function(request, response){
        console.log("In comes a requesr to: " + request.url);
        response.end("Hello World");
});

// http.createServer(app).listen(3000);
app.listen(3000);

// 57