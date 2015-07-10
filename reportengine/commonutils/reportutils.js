
/* jshint node: true */
"use strict";

var logger = require('./logger');

exports.handleError = function (err) {
  logger.log('error', String(err));
};

exports.outputMessage = function (msg_obj) {
  var type = msg_obj.type ? msg_obj : "debug";
  var content = msg_obj.content ? msg_obj.content : "";

  logger.log(type, content);
}

