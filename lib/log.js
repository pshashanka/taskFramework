"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var winston = require('winston');

var logger = winston.createLogger({
  transports: [new winston.transports.Console(), new winston.transports.File({
    filename: 'combined.log'
  })]
});
var _default = logger;
exports["default"] = _default;