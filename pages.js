var path = require('path');
var _ = require('lodash');


var pages = {
  home: {
    client: path.join(__dirname, './www/view/home/client'),
    server: path.join(__dirname, './www/view/home/server')
  }
};

exports.getClient = function () {
  var result = {};
  _.each(pages, function (val, name) {
    result[name] = val.client;
  });

  return result;
};

exports.getServer = function () {
  var result = {};
  _.each(pages, function (val, name) {
    result[name] = val.server;
  });

  return result;
}
