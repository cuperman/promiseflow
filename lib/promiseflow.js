(function($, async) {
    'use strict';

    var promiseflow = {};

    var promiseCaller = function(method) {
        return function(callback) {
            method()
                .done(function() {
                    var args = Array.prototype.slice.call(arguments),
                        results = args.length > 1 ? args : args[0];
                    callback(null, results);
                })
                .fail(function() {
                    var args = Array.prototype.slice.call(arguments),
                        results = args.length > 1 ? args : args[0];
                    callback(true, results);
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

    var executeFlow = function(type, methods) {
        var d = $.Deferred();
        async[type](promiseCallers(methods), function(err, results) {
            if (err) {
                d.reject(results);
            } else {
                d.resolve(results);
            }
        });
        return d.promise();
    };

    promiseflow.series = function(methods) {
        return executeFlow("series", methods);
    };

    promiseflow.parallel = function(methods) {
        return executeFlow("parallel", methods);
    };

    window.promiseflow = promiseflow;
})($, async);
