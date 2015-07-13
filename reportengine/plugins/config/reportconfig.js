
/* jshint node: true */
"use strict";

module.exports = function setup (options, imports, register) {
  var path = require('path');
  var convict = require('convict');

  var config = require('../../config.json');
  
  // ---------------------------------------------------------------------------
  // class ReportConfig
  var ReportConfig = function (cfg) {
  	this.conf = new convict({root: "", app: "", 'template-root': "templates"});
  	this.conf.load(cfg);
  };
  ReportConfig.prototype.get = function (name) {
  	return this.conf.get(name);
  }
  ReportConfig.prototype.set = function (name, val) {
  	this.conf.set(name, val);
  }

  var _report_config = new ReportConfig(config);

  var api = {
    get: function (name) {
      return _report_config.get(name);
    },
    set: function (name, val) {
      _report_config.set(name, val);
    }
  };

  register(null, {
  	reportConfig: api
  })
};


