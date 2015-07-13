
/* jshint node: true */
"use strict";

module.exports = function setup (options, imports, register) {
  var logger = require('./logger');

  var api = {
    handleError: function (err) {
      logger.log('error', String(err));
    },
    outputMessage: function (msg_obj) {
      var type = msg_obj.type ? msg_obj.type : "debug";
      var content = msg_obj.message ? msg_obj.message : "";

      logger.log(type, content);
    }
  };

  register(null, {
    commUtils: api
  });
};





