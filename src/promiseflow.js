(function() {
    'use strict';

    // returns true if collection is Array, otherwise false
    var _isArray = function(collection) {
        return Array.isArray(collection);
    };

    // converts arguments object to Array
    var _toArray = function(args) {
        return Array.prototype.slice.call(args);
    };

    // returns array of keys for Object or Array
    var _keys = function(collection) {
        return Object.keys(collection);
    };

    // iterates through each entry of Array or Object
    var _each = function(collection, iterator, context) {
        var keys = _keys(collection);
        for (var index = 0; index < keys.length; index++) {
            iterator.call(context, collection[keys[index]], keys[index], collection);
        }
    };

    var _defaultOptions = {
        context: null,
        results: "first"
    };

    var promiseflow = {
        defer: function(callback, context) {
            return function() {
                var d = $.Deferred(),
                    args = Array.prototype.slice.call(arguments);
                args.unshift(d);
                if (callback) { callback.apply(context, args); }
                return d.promise();
            };
        },

        series: function(methods, options) {
            var d = $.Deferred(),
                keys = _keys(methods),
                results = _isArray(methods) ? [] : {};

            options = $.extend({}, _defaultOptions, options);

            var execute = function(index) {
                var key = keys[index],
                    method = methods[key];

                if (!method) {
                    d.resolve(results);
                } else {
                    var p = method.call(options.context);

                    p.done(function(response) {
                        results[key] = options.results === "all" ? _toArray(arguments) : response;
                        execute(index + 1);
                    });

                    p.fail(function(response) {
                        d.reject(key, options.results === "all" ? _toArray(arguments) : response);
                    });
                }
            };

            execute(0);

            return d.promise();
        },

        parallel: function(methods, options) {
            var d = $.Deferred(),
                keys = _keys(methods),
                results = _isArray(methods) ? [] : {},
                counter = 0;

            options = $.extend({}, _defaultOptions, options);

            _each(methods, function(method, index) {
                var p = method.call(options.context);

                p.done(function(response) {
                    results[index] = options.results === "all" ? _toArray(arguments) : response;
                    counter++;
                    if (counter === keys.length) {
                        d.resolve(results);
                    }
                });

                p.fail(function(response) {
                    d.reject(index, options.results === "all" ? _toArray(arguments) : response);
                });
            });

            return d.promise();
        }
    };

    window.promiseflow = promiseflow;
})();
