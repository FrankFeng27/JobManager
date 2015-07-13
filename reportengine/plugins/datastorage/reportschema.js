
/* jshint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Grid     = require('gridfs-stream');
var fs       = require('fs');
var _        = require('underscore');
var async    = require('async');

// -----------------------------------------------------------------------------
// helper function
var connect_to_db = function (host, port, dbname, cb) {
  var _uri = "mongodb://" + host + ":" + port + "/" + dbname;
  try {
    var conn = mongoose.createConnection(_uri);
    conn.on('open', function () {
      cb(null, conn);
    });
  } catch (_err) {
    cb(_err);
  }
};


// -----------------------------------------------------------------------------
// define schema

var ChangeSetSchema = new Schema({
  "changeset-id": {type: String, default: ""},
  "changeset-comment": {type: String, default: ""},
  "files": [String],
  "submit-time": {type: Date, default: Date.now()},
  "userstory": {
  	 "userstory-id": String, 
  	 "association-type": String  // "resolved" or "related"
  }
});

var BuildSchema = new Schema({
  "build-id": String,
  "build-time": {type: Date, default: Date.now()}
});

var UserStorySchema = new Schema({
  "userstory-id": String,
  "userstory-url": String,
  "userstory-title": String
});

/// var ReportSchema = new Schema({
///   'report-name': String,
///   'report-path': String,
///   'template': {'path': {type: String, default: ''}, 'valid': {type: Boolean, default: true}},
///   'version': {type: String, default: '0.0.1'},
///   'data': Schema.Types.Mixed,
///   'meta-data': {modified: {type: Date, default: Date.now()}, created: {type: Date, default: Date.now()}}
/// }, {strict: false});

// -----------------------------------------------------------------------------
// class ReportDatabase

var ReportDatabase = function () {
  this.connection = null;
  this.changesetModel = null;
  this.buildModel = null;
  this.userstoryModel = null;
  /// this.gridfs = null;
};

ReportDatabase.prototype.isConnected = function () {
  if (!this.connection) {
    return false;
  }
  return (this.connection.readyState === 1);
};

ReportDatabase.prototype.disconnect = function() {
  if (this.connection !== null) {
    this.connection.close();
  }
  this.connection = null;
  this.changesetModel = null;
  this.buildModel = null;
  this.userstoryModel = null;
};

ReportDatabase.prototype.connect = function (host, port, dbname, cb) {
  this.disconnect();
  var self = this;
  connect_to_db(host, port, dbname, function (err, conn) {
    if (err) {
      cb(err);
      return;
    }
    if (!conn) {
      cb(new Error("Can't connect to mongodb"));
      return;
    }
    self.connection = conn;
    self.dbname = dbname;
    self.changesetModel = {name: "ChangeSet", 
                           model: self.connection.model('ChangeSet', ChangeSetSchema, 'ChangeSet')};
    self.buildMOdel = {name: "Build", 
                       model: self.connection.model('Build', BuildSchema, 'Build')};
    self.userstoryModel = {name: "UserStory", 
                           model: self.connection.model('UserStory', UserStorySchema, 'UserStory')};
    cb();
  });
};



ReportDatabase.prototype.insertChangeSet = function (obj, cb) {
  if (!this.isConnected()) {
    cb(new Error('Not connected to database.'));
    return;
  }
  if (!obj || !obj['changeset-id']) {
    cb(new Error('Invalid change-set.'));
    return;
  }
  this.changesetModel.findOneAndUpdate({'changeset-id': obj['changeset-id']},
    {$set: obj}, {upset: true}, function (err) {
      cb(err);
  });
};



