"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = delayTask;

var _log = _interopRequireDefault(require("../log"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function delayTask(id, delayTimeInMills) {
  var result = _constants["default"].UNKNOWN.toString();

  _log["default"].info('starting delay task with id: ' + id);

  return new Promise(function (resolve) {
    setTimeout(function () {
      result = '' + Math.round(Math.random() * 10000000);
      resolve(result);
    }, delayTimeInMills);
  });
}