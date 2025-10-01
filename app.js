var express = require("express");
var logger = require('morgan');
var path = require('path');
var http = require('http');
var apiRouter = require('./routes/api_router');

var app = express();

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

var EVIL_IP = "123.45.67.89";

var publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));

// logging middleware
// app.use(function(req,res,next){
//         console.log("In comes a request to: " + req.url);
//         next();
// });

// logging using morgan
app.use(logger('short'));

// fake auth middleware
// app.use(function(req,res,next){
//         var mins = (new Date()).getMinutes();
//         if(mins % 2 === 0){
//                return next();
//         }
        
//         res.statusCode = 403;
//         res.end('Not Authorized');
        
// });

//middleware that stops example evil ip addresses
app.use(function(req,res,next){
        if(req.ip == EVIL_IP){
                res.status(401).send("Not allowed");
        }else{
                next();
        }
});

app.get('/', function(req,res){
        // res.end("Welcome to my homepage!");
        res.render("index",{message:"Hey yall this is my web page"});
});

app.get('/about', function (req,res) {
        res.end("Welcome to the about page!");
});

app.get('/weather', function(req,res){
        res.end('The current weather is NICE');
});

app.get('/hello/:who', function(req,res){
        var who = req.params.who;

        if(who == "express"){
                return res.redirect("https://expressjs.com");
        }

        if(who == "world"){
                return res.redirect("http://localhost:3000/");
        }

        if(who == "roland"){
                return res.sendFile(path.resolve(publicPath, 'roland_drawing.png'));
        }

        res.end("Hello, " + who + '.');
});

//here we use regular expression to make sure it only takes /users/123 or any other integer in place of 123
app.get(/^\/users\/(\+d)$/,function(req, res){
        var userId = parseInt(req.params[0], 10);
})

app.use('/api', apiRouter);

app.use(function(request, response){
        // // response.end('Secret info: the password is "swordfish"!');
        // response.writeHead(200, { "Content-Type": "text/plain" });
        // response.end("Looks like you didn't find a static file.");
        response.status(404).end("404 page not found");
});

http.createServer(app).listen(3000);
// app.listen(3000);
console.log("server is running in http://localhost:3000");

// 57

