/* jshint undef: false */

(function() {
    'use strict';

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
        ]);

        promise.done(function(results) {
            deepEqual(results, [ [ 1 ], [ 2 ] ]);
        }).always(function() {
            start();
        });
    });

    asyncTest("test series as array error", function() {
        expect(1);

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
        ]);

        promise.fail(function(results) {
            deepEqual(results, [ [ 1 ] ]);
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
        });

        promise.done(function(results) {
            deepEqual(results, { one: [ 1 ], two: [ 2 ] });
        }).always(function() {
            start();
        });
    });

    asyncTest("test series as object error", function() {
        expect(1);

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
        });

        promise.fail(function(results) {
            deepEqual(results, { one: [ 1 ] });
        }).always(function() {
            start();
        });
    });

    asyncTest("test parallel as array", function() {
        expect(1);

        var promise = promiseflow.parallel([
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
        ]);

        promise.done(function(results) {
            deepEqual(results, [ [ 1 ], [ 2 ] ]);
        }).always(function() {
            start();
        });
    });

    asyncTest("test parallel as object", function() {
        expect(1);

        var promise = promiseflow.parallel({
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
        });

        promise.done(function(results) {
            deepEqual(results, { one: [ 1 ], two: [ 2 ] });
        }).always(function() {
            start();
        });
    });
})();
