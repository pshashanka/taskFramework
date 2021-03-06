"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

var _worker = require("threads/worker");

var _constants = _interopRequireDefault(require("../constants"));

var _delayTask = _interopRequireDefault(require("./delayTask"));

var _log = _interopRequireDefault(require("../log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Worker thread
 * @param task 
 * @param id 
 */
var _default = (0, _worker.expose)(function runTask(task, id) {
  return new Promise(function (resolve, reject) {
    var result = _constants["default"].SKIPPED.toString();

    try {
      if (!task) {
        _log["default"].error('Invalid arguments ');

        reject(result);
      }

      _log["default"].info('runtask started: ' + task.type);
      /**
       * Determine what type of task is executing
       */


      if (task.type === 'delay') {
        (0, _delayTask["default"])(id, task.config.delayMilliSeconds).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          _log["default"].error(err, 'failed executing ' + id);

          reject(result);
        });
      } else {
        _log["default"].info(' result is ' + result);

        resolve(result);
      }
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
});

exports["default"] = _default;