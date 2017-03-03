var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var urlParse = require('url');
var helpers = require('./http-helpers');

exports.handleRequest = function (req, res) {


  var statusCode = 200;
  var func = function(result, url, callback) {    
    if (result === false) {
      archive.addUrlToList(url, callback);
      helpers.sendRedirect(res, '/loading.html');
    }
    if (result === true) {  
      archive.isUrlArchived(url, function(result) {    
        if (result === false) {
          archive.downloadUrls([url]);
          helpers.sendRedirect(res, '/loading.html');
        } else {
          helpers.sendRedirect(res, '/' + url);
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
      var url = body.split('=')[1];
      archive.isUrlInList(url, function(exists) {
        func(exists, url, callback);
        return exists;
      });
        //result is true & isURLArchived to false
          //return loading html file
    });
  }

  if (req.method === 'GET') {
    var requestURL = req.url;
    var requestURLPathname = urlParse.parse(requestURL).pathname;
    if (requestURLPathname === '/') {
      requestURLPathname = '/index.html';
    }    
    helpers.serveAssets(res, requestURLPathname);
  }
};

