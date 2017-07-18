// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');

$export($export.P, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return new C(function (resolve) { resolve(onFinally()); }).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return new C(function (resolve) { resolve(onFinally()); }).then(function () { throw e; });
    } : onFinally
  );
} });