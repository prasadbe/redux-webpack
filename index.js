var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var fs = require('fs');
app.use('/build', express.static(__dirname + '/build'));
app.get('*', function(req, res) {
    console.log(__dirname + '/build/webpack-manifest.json');
    fs.readFile(__dirname + '/build/webpack-manifest.json', 'utf8', function(error, webpack) {
        if (error) throw error;
        res.render('index', {
            webpack: JSON.parse(webpack)
        });
    });

});
http.createServer(app).listen(8010);