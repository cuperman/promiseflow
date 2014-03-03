(function() {
    'use strict';

    module("series");

    asyncTest("test series as array", function() {
        expect(1);

        var promise = promiseflow.series([
            function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve(1);
                }, 20);
                return d.promise();
            },
            function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve(2);
                }, 10);
                return d.promise();
            }
        ], {results: "all"});

        promise.done(function(results) {
            deepEqual(results, [[1], [2]]);
        }).always(function() {
            start();
        });
    });

    asyncTest("test series with methods with multiple results", function() {
        expect(1);

        var promise = promiseflow.series([
            function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve(1, 2);
                }, 20);
                return d.promise();
            },
            function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve(3, 4);
                }, 10);
                return d.promise();
            }
        ], {results: "all"});

        promise.done(function(results) {
            deepEqual(results, [[1, 2], [3, 4]]);
        }).always(function() {
            start();
        });
    });

    asyncTest("test series with methods with no results", function() {
        expect(1);

        var promise = promiseflow.series([
            function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve();
                }, 20);
                return d.promise();
            },
            function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve();
                }, 10);
                return d.promise();
            }
        ], {results: "all"});

        promise.done(function(results) {
            deepEqual(results, [[], []]);
        }).always(function() {
            start();
        });
    });

    asyncTest("test series as array error", function() {
        expect(2);

        var promise = promiseflow.series([
            function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.reject(1);
                }, 20);
                return d.promise();
            },
            function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve(2);
                }, 10);
                return d.promise();
            }
        ], {results: "all"});

        promise.fail(function(index, results) {
            equal(index, 0);
            deepEqual(results, [1]);
        }).always(function() {
            start();
        });
    });

    asyncTest("test series as object", function() {
        expect(1);

        var promise = promiseflow.series({
            one: function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve(1);
                }, 20);
                return d.promise();
            },
            two: function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve(2);
                }, 10);
                return d.promise();
            }
        }, {results: "all"});

        promise.done(function(results) {
            deepEqual(results, { one: [1], two: [2] });
        }).always(function() {
            start();
        });
    });

    asyncTest("test series as object error", function() {
        expect(2);

        var promise = promiseflow.series({
            one: function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.reject(1);
                }, 20);
                return d.promise();
            },
            two: function() {
                var d = $.Deferred();
                setTimeout(function(){
                    d.resolve(2);
                }, 10);
                return d.promise();
            }
        }, {results: "all"});

        promise.fail(function(index, results) {
            equal(index, "one");
            deepEqual(results, [1]);
        }).always(function() {
            start();
        });
    });
})();
