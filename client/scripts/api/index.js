var request = require('browser-request');

module.exports = {
  get: function(url, cb) {
    request(url, function(err, res, body) {
      cb(err, res);
    });
  },
  post: function(opts, cb) {
    request({ method: 'POST', url: opts.url, body: opts, json: true }, onResponse)
    function onResponse(err, res, body) {
      cb(err, body);
    }
  }
};