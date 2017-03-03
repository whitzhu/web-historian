var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, function(err, data) {
    var lines = data.toString().split('\n');
    callback(lines);
  });  
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(this.paths.list, function(err, data) {
    var result = false;
    var lines = data.toString().split('\n');
    for (var i = 0; i < lines.length; i++) {
      if (url === lines[i]) {
        result = true;
      }
    }
    callback(result);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url + '\n', function(err) {
    console.log(err);
  });
  callback();
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(this.paths.archivedSites + '/' + url, function(err, stats) {
    if (err) {
      return callback(false);
    } else {
      callback(true); 
    }
  });
};

exports.downloadUrls = function(urls) {
  console.log(urls);
  _.each(urls, function(url) {
    http.get('http://' + url, (res) => {
      var body = '';
      console.log('check point 1');
      res.on('data', function(chunk) {
        body += chunk;
      });
      console.log('check point 2');
      res.on('end', function() {
        console.log(url);
        fs.writeFile(exports.paths.archivedSites + '/' + url, body);
      });
    });

  });

  /*
  for (var i = 0; i < urls.length; i++ ) {
    console.log('===============================================================');
    http.get('http://' + urls[i], (res) => {
      var body = '';
      console.log('check point 1');
      res.on('data', function(chunk) {
        body += chunk;
      });
      console.log('check point 2');
      res.on('end', function() {
        console.log(urls[i]);
        fs.writeFile(exports.paths.archivedSites + '/' + urls[i], body, function(err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);     
          }
        });
      });
    });
  }
  */
};




// var urlArray = ['www.example.com', 'www.google.com'];
//       archive.downloadUrls(urlArray);