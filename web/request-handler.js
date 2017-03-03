var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var urlParse = require('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var requestURL = req.url;
  var requestURLPathname = urlParse.parse(requestURL).pathname;

  var statusCode = 200;
  var func = function(result, url, callback) {    
    if (result === false) {
      console.log("yay!!!! >_<");
      archive.addUrlToList(url, callback);
    }
    if (result === true) {  
      console.log("nooooooooooo!!!! >_<");
      archive.isUrlArchived(url, function(result) {    
        if (result === false) {
          res.writeHead(statusCode, {'Content-Type': 'text/html'});
          fs.readFile(__dirname + '/public/loading.html', function(err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log('we are loading a loading page');
              res.end(data);      
            }
          });
        } 
      });
    }
  }; 

  if ( req.method === 'POST') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var callback = function() {};
      var url = JSON.parse(body);
      console.log("url!!!!!!!!!", url);
      archive.isUrlInList(url, function(exists) {
        func(exists, url, callback);
        return exists;
      });
        //result is true & isURLArchived to false
          //return loading html file

     
    });
  }


  //update to check if pathname exisits in archivedSites 
    //if exist server the site
    //if it doesn't exist server loading? 
  if (req.method === 'GET' && requestURLPathname !== '/') {
    statusCode = 404;
  }
  
  console.log('the current statusCode is ', statusCode);

  res.writeHead(statusCode, {'Content-Type': 'text/html'});  
  res.writeHead(statusCode, {'Content-Type': 'text/html'});  
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.end(data);      
    }
  });


};

