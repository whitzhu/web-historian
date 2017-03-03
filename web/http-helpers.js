var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(archive.paths.siteAssets + asset, function(err, data) {
    if (err) {
      fs.readFile(archive.paths.archivedSites + asset, function(err, data) {
        if (err) {
          if (callback) {
            callback();
          } else {
            res.writeHead(404, '404: Page not found');
            res.end(data);
          }
        } else {
          res.writeHead(200, exports.headers);
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, exports.headers);
      res.end(data);     
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!

exports.sendRedirect = function(res, location, status) {
  status = status || 302;
  res.writeHead(status, {'Location': location});
  res.end();
};


