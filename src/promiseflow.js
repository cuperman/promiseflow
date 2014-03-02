(function($) {
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

    var promiseflow = {
        defer: function(callback, context) {
            var d = $.Deferred();
            if (callback) { callback.call(context, d); }
            return d.promise();
        },

        series: function(methods, context) {
            return this.defer(function(d) {
                var keys = _keys(methods),
                    results = _isArray(methods) ? [] : {};

                var execute = function(index) {
                    var key = keys[index],
                        method = methods[key];

                    if (!method) {
                        d.resolve(results);
                    } else {
                        var p = method.call(context);

                        p.done(function() {
                            results[key] = _toArray(arguments);
                            execute(index + 1);
                        });

                        p.fail(function() {
                            d.reject(key, _toArray(arguments));
                        });
                    }
                };

                execute(0);
            }, context);
        },

        parallel: function(methods, context) {
            return this.defer(function(d) {
                var keys = _keys(methods),
                    results = _isArray(methods) ? [] : {},
                    counter = 0;

                _each(methods, function(method, index) {
                    var p = method.call(context);

                    p.done(function() {
                        results[index] = _toArray(arguments);
                        counter++;
                        if (counter === keys.length) {
                            d.resolve(results);
                        }
                    });

                    p.fail(function() {
                        d.reject(index, _toArray(arguments));
                    });
                });
            }, context);
        }
    };

    window.promiseflow = promiseflow;
})($);
