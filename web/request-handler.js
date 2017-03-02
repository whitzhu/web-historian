var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var results = [];
  if ( req.method === 'POST') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      fs.appendFile(archive.paths.list + '\n', body, function(err) {
        console.log(err);
      });
      console.log('body', body);
      // results.push(JSON.parse(body));
    });
    // console.log('results', results);
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

