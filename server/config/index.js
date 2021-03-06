/**
 * Main Config
 */

'use strict';

var path = require('path');
var env = (process.env.NODE_ENV === 'production') ? {} : require('../../env.js');


module.exports = {
  server: {
    port: process.env.PORT || 3000
  },
  root: path.normalize(__dirname + '../../../'),
  db: {
    uri: process.env.MONGOLAB_URI || env.mongo.uri,
    opts: { server: { socketOptions: { keepAlive: 1 } } }
  }
};
