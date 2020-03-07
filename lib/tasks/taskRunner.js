"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _worker = require("threads/worker");

var _constants = _interopRequireDefault(require("../constants"));

var _delayTask = _interopRequireDefault(require("./delayTask"));

var _log = _interopRequireDefault(require("../log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Worker thread
 * @param task 
 * @param id 
 */
function runTask(_x, _x2) {
  return _runTask.apply(this, arguments);
}

function _runTask() {
  _runTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(task, id) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = _constants["default"].SKIPPED.toString();

            if (task) {
              _context.next = 4;
              break;
            }

            _log["default"].error('Invalid arguments ');

            return _context.abrupt("return", new Promise(function (reject) {
              return reject(result);
            }));

          case 4:
            _log["default"].info('runtask started');
            /**
             * Determine what type of task is executing
             */


            if (!(task.type === 'delay')) {
              _context.next = 16;
              break;
            }

            _context.prev = 6;
            _context.next = 9;
            return (0, _delayTask["default"])(id, task.config.delayMilliSeconds);

          case 9:
            result = _context.sent;
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](6);

            _log["default"].error('failed executing ' + id);

            return _context.abrupt("return", new Promise(function (reject) {
              return reject(result);
            }));

          case 16:
            _log["default"].info(' result is ' + result);

            return _context.abrupt("return", new Promise(function (resolve) {
              return resolve(result);
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 12]]);
  }));
  return _runTask.apply(this, arguments);
}

(0, _worker.expose)(runTask);