var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if ( req.method === 'POST') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var callback = function() {};
      var url = JSON.parse(body);
      var result = archive.isUrlInList(url, function(result) {
        return result;
      });
      if (result === false) {
        archive.addUrlToList(url, callback);
      }

    });
  }

  res.writeHead(200, {'Content-Type': 'text/html'});
  
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.end(data);      
    }
  });


};

