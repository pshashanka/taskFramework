"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATUS = void 0;
var STATUS;
exports.STATUS = STATUS;

(function (STATUS) {
  STATUS[STATUS["NOT_STARTED"] = 0] = "NOT_STARTED";
  STATUS[STATUS["RUNNING"] = 1] = "RUNNING";
  STATUS[STATUS["DONE"] = 2] = "DONE";
  STATUS[STATUS["ERROR"] = 3] = "ERROR";
})(STATUS || (exports.STATUS = STATUS = {}));