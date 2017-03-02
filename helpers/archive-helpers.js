var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  fs.readFile(exports.paths.list, function(err, data) {
    var lines = data.toString().split('\n');
    callback(lines);
  });  
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, function(err, data) {
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
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    console.log(err);
  });
  callback();
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(exports.paths.archivedSites + '/' + url, function(err, stats) {
    if (err) {
      return callback(false);
    } else {
      callback(true); 
    }
  });
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++ ) {
    fs.writeFile(exports.paths.archivedSites + '/' + urls[i], 'Hello World', function() {});
  }
};




// var urlArray = ['www.example.com', 'www.google.com'];
//       archive.downloadUrls(urlArray);