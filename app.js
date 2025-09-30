var express = require("express");
var http = require('http');

var app = express();

// logging middleware
app.use(function(req,res,next){
        console.log("In comes a request to: " + req.url);
        next();
});

// fake auth middleware
app.use(function(req,res,next){
        var mins = (new Date()).getMinutes();
        if(mins % 2 === 0){
               return next();
        }
        
        res.statusCode = 403;
        res.end('Not Authorized');
        
});

app.use(function(request, response){
        response.end('Secret info: the password is "swordfish"!');
});

http.createServer(app).listen(3000);
// app.listen(3000);
console.log("server is running in http://localhost:3000");

// 57

