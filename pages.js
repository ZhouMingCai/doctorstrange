var path = require('path');
var _ = require('lodash');


var pages = {
    home: {
        client: path.join(__dirname, './front/view/home/client'),
        server: path.join(__dirname, './front/view/home/server')
    },
    update: {
        client: path.join(__dirname, './front/view/update/client'),
        server: path.join(__dirname, './front/view/update/server')
    },

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
