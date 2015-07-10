
/* jshint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Grid     = require('gridfs-stream');
var fs       = require('fs');
var _        = require('underscore');
var async    = require('async');

var handleError = require('../../commonutils').handleError;
var outputMessage = require('../../commonutils').outputMessage;

var ReportSchema = new Schema({
  'report-name': String,
  'report-path': String,
  'template': {'path': {type: String, default: ''}, 'valid': {type: Boolean, default: true}},
  'version': {type: String, default: '0.0.1'},
  'data': Schema.Types.Mixed,
  'meta-data': {modified: {type: Date, default: Date.now()}, created: {type: Date, default: Date.now()}}
}, {strict: false});

var ReportDatabase = function () {
  this.connection = null;
  this.reportModel = null;
  this.gridfs = null;
};
