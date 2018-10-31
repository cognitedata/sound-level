var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();


// Configure Express
var app = express();
app.enable('trust proxy'); // Trust "X-Forwarded-For" header
app.use(bodyParser.json({limit: '100mb', extended: true}));

app.use('/scan', function(req, res, next) {
    var url = req.body.url;

    var dataUrlData = req.body.imageData;
    var base64Data = dataUrlData.replace(/^data:image\/png;base64,/, "");

    fs.writeFileSync("tag.png", base64Data, 'base64');
    // Performs label detection on the image file
    client.textDetection('./tag.png')
        .then(results => {
            res.json({ results: results });
            console.log(results[0]);
            const labels = results[0].textAnnotations;

            console.log('Labels:');
            labels.forEach(label => console.log(label.description));
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.json({ error: err });
        });
});

app.use(express.static(__dirname + '/public'));
var httpServer = http.createServer(app);
var httpServerPort = 8083;
httpServer.listen(httpServerPort);
console.log('HTTP server started on port ' + httpServerPort);



