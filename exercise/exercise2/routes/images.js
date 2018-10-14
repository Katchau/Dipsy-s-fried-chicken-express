var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

function stupidFunction(objImages, i, data, res) {
    var obj = objImages[i];
    var options = {
        url: 'http://localhost' + obj.url,
        // url: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/43685159_754723268204811_5506089812240629760_n.jpg?_nc_cat=101&oh=d1750a1a4c95a9331e83bd5a4eb56a2c&oe=5C45126A',
        method: 'GET',
        headers: {
            'Host': 'localhost:80'
        }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var disposition = response.headers['content-disposition'];
            var name = "";
            if (disposition) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches !== null && matches[1]) {
                    name = matches[1].replace(/['"]/g, '');
                }
            }
            var type = response.headers['content-type'].split('/')[1].toUpperCase();
            var img = {
                name: name,
                type: type,
                size: parseFloat(response.headers['content-length'])/1000 + " Kb"
            };
            data.push(img);
            if(data.length === objImages.length){
                res.send(data);
            }
            else{
                stupidFunction(objImages, i+1, data, res);
            }
        } else {
            console.log('Invalid link? ' + error.toString());
        }
    });
}


/* GET home page. */
router.get('/', function(req, res) {
    var jsonFile = fs.readFileSync('exercise/images.json').toString();
    var objImages = JSON.parse(jsonFile);
    var data =  [];
    stupidFunction(objImages,0,data,res);
});

module.exports = router;