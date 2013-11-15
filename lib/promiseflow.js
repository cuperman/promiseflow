(function(async) {
    'use strict';

    var promiseflow = {};

    var promiseCaller = function(method) {
        return function(callback) {
            method()
                .done(function() {
                    callback(null, Array.prototype.slice.call(arguments));
                })
                .fail(function() {
                    callback(true, Array.prototype.slice.call(arguments));
                });
        };
    };

    var promiseCallers = function(methods) {
        if (Array.isArray(methods)) {
            return methods.map(promiseCaller);
        } else {
            var memo = {};
            Object.keys(methods).forEach(function(key) {
                memo[key] = promiseCaller(methods[key]);
            });
            return memo;
        }
    };

    promiseflow.series = function(methods, callback) {
        return async.series(promiseCallers(methods), callback);
    };

    promiseflow.parallel = function(methods, callback) {
        return async.parallel(promiseCallers(methods), callback);
    };

    window.promiseflow = promiseflow;
})(async);
