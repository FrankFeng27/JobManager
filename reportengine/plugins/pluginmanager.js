
var architect = require('architect');

var PluginManager = function () {
  var _config_path = "./pluginconfig.js";
  var _config      = architect.loadConfig(_config_path);
  this.pluginMgr   = architect.createApp(_config, function (err) {});
};

Module.exports = PluginManager;

