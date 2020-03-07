"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _threads = require("threads");

var _log = _interopRequireDefault(require("./log"));

var _taskConfig = _interopRequireDefault(require("./taskConfig"));

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Main = /*#__PURE__*/function () {
  function Main() {
    _classCallCheck(this, Main);

    _defineProperty(this, "taskConfig", void 0);

    this.taskConfig = new _taskConfig["default"]();
    this.init();
  }

  _createClass(Main, [{
    key: "init",
    value: function init() {
      _log["default"].info('initializing...');

      if (this.taskConfig.readConfigFile()) {
        this.run();
      }
    }
  }, {
    key: "spawnWorkerFn",
    value: function spawnWorkerFn() {
      return (0, _threads.spawn)(new _threads.Worker("./tasks/taskRunner"), {
        timeout: 20000
      });
    }
  }, {
    key: "workerExec",
    value: function () {
      var _workerExec = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(worker, task, id, taskStatus) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return worker(task, id);

              case 2:
                res = _context.sent;
                task.result = res;
                taskStatus.set(id, task);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function workerExec(_x, _x2, _x3, _x4) {
        return _workerExec.apply(this, arguments);
      }

      return workerExec;
    }()
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this = this;

        var taskStatus, tasks, poolOptions, pool, _loop, i;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                taskStatus = new Map();

                _log["default"].info('running tasks');

                tasks = this.taskConfig.getTasks();
                poolOptions = {
                  concurrency: this.taskConfig.getMaxParallelTasks()
                };
                pool = (0, _threads.Pool)(this.spawnWorkerFn, poolOptions);

                _loop = function _loop(i) {
                  pool.queue( /*#__PURE__*/function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(worker) {
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return _this.workerExec(worker, tasks[i], tasks[i].id || i, taskStatus);

                            case 2:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));

                    return function (_x5) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                };

                for (i = 0; i < tasks.length; i++) {
                  _loop(i);
                }

                _context3.next = 9;
                return pool.completed();

              case 9:
                _context3.next = 11;
                return pool.terminate();

              case 11:
                this.taskConfig.writeStatus(taskStatus);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return Main;
}();

exports["default"] = Main;