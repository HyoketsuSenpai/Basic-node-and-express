var express = require("express");
var http = require('http');

var app = express();

// logging middleware
app.use(function(req,res,next){
        console.log("In comes a requesr to: " + req.url);
        next();
});



app.use(function(request, response){
        response.writeHead(200, {"Content-Type": "text/plain"} )
        response.end("Hello World");
});

http.createServer(app).listen(3000);
// app.listen(3000);
console.log("server is running in http://localhost:3000");

// 57

