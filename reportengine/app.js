
/* jshint node: true */
"use strict";

var express = require('express');
var path    = require('path');
var favicon = require('static-favicon');
var bodyParse = require('body-parser');

var PluginManager = require('./plugins/pluginmanager');

var ReportEngine = function () {
  this.app = express();
  this.pluginMgr = null;
  this.initialize();
};

ReportEngine.prototype.init_resource = function () {
  this.app.set('view engine', 'jade');
  this.app.set('views', path.join(__dirname, 'views'));
  this.app.use(favicon());
  this.app.use(bodyParse.json());
  this.app.use(bodyParse.urlencoded());

  // static resource
  this.app.use(express.static(__dirname));
  this.app.use(express.static(path.join(__dirname, 'node_modules')));
  this.app.use(express.static(path.join(__dirname, 'bower_components/jquery/dist')));
  this.app.use(express.static(path.join(__dirname, 'bower_components/bootstrap/dist/js')));
  this.app.use(express.static(path.join(__dirname, 'bower_components/underscore')));
  this.app.use(express.static(path.join(__dirname, 'bower_components/summernote/dist')));
  this.app.use(express.static(path.join(__dirname, 'bower_components/jqwidgets')));
  this.app.use('/css', express.static(path.join(__dirname, 'bower_components/bootstrap/dist/css')));  
}

ReportEngine.prototype.init_plugin = function () {
  this.pluginMgr = new PluginManager();
}

ReportEngine.prototype.initialize = function () {
  this.init_resource();
};

