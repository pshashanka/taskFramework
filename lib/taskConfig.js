"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = _interopRequireDefault(require("./constants"));

var _log = _interopRequireDefault(require("./log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');

var TaskConfig = /*#__PURE__*/function () {
  function TaskConfig() {
    _classCallCheck(this, TaskConfig);

    _defineProperty(this, "jsonConfig", void 0);
  }

  _createClass(TaskConfig, [{
    key: "checkJSONConfig",
    value: function checkJSONConfig() {
      if (!this.jsonConfig) {
        throw new Error('JSON config not available');
      }
    }
  }, {
    key: "getMaxParallelTasks",
    value: function getMaxParallelTasks() {
      this.checkJSONConfig();
      return this.jsonConfig.maxParallel;
    }
    /**
     * Returns result file name
     */

  }, {
    key: "getTaskResultsFile",
    value: function getTaskResultsFile() {
      this.checkJSONConfig();
      return this.jsonConfig.taskResultsFile;
    }
    /**
     * Returns all the available Tasks
     */

  }, {
    key: "getTasks",
    value: function getTasks() {
      this.checkJSONConfig();
      return this.jsonConfig.tasks;
    }
    /**
     * Reads tasks config file to JSON
     */

  }, {
    key: "readConfigFile",
    value: function readConfigFile() {
      _log["default"].info('read config file ' + _constants["default"].CONFIG_FILE);

      try {
        var data = fs.readFileSync(_constants["default"].CONFIG_FILE, {
          encoding: 'utf-8'
        });

        _log["default"].info('success reading config file');

        this.jsonConfig = JSON.parse(data);
        return true;
      } catch (error) {
        _log["default"].error(' Error reading file ', error);

        return false;
      }
    }
  }, {
    key: "writeStatus",
    value: function writeStatus(status) {
      var arr = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = status[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              id = _step$value[0],
              task = _step$value[1];

          arr.push({
            id: id,
            type: task.type,
            result: task.result
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var resultsFile = this.getTaskResultsFile();

      _log["default"].info('writing to task status file ' + resultsFile);

      try {
        fs.writeFileSync(resultsFile, JSON.stringify(arr));

        _log["default"].info('success writing to status file');
      } catch (error) {
        _log["default"].error(' Error writing to status file ', error);

        return false;
      }
    }
  }]);

  return TaskConfig;
}();

exports["default"] = TaskConfig;