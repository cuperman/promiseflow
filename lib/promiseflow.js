/* globals _ */

(function(async, _) {
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
        if (_.isArray(methods)) {
            return _.map(methods, promiseCaller);
        } else {
            return _.reduce(methods, function(memo, method, key) {
                memo[key] = promiseCaller(method);
                return memo;
            }, {});
        }
    };

    promiseflow.series = function(methods, callback) {
        return async.series(promiseCallers(methods), callback);
    };

    promiseflow.parallel = function(methods, callback) {
        return async.parallel(promiseCallers(methods), callback);
    };

    window.promiseflow = promiseflow;
})(async, _);
