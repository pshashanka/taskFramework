"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _log = _interopRequireDefault(require("../log"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function delayTask(_x, _x2) {
  return _delayTask.apply(this, arguments);
}

function _delayTask() {
  _delayTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, delayTimeInMills) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = _constants["default"].UNKNOWN.toString();

            _log["default"].info('starting delay task with id: ' + id);

            return _context.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                result = '' + Math.round(Math.random() * 10000000);
                resolve(result);
              }, delayTimeInMills);
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _delayTask.apply(this, arguments);
}

var _default = delayTask;
exports["default"] = _default;