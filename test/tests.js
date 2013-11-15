/* jshint undef: false */

(function() {
    'use strict';

    asyncTest("test series as array", function() {
        expect(2);

        promiseflow.series([
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
        ],
        function(err, results) {
            equal(err, null);
            deepEqual(results, [ [ 1 ], [ 2 ] ]);
            start();
        });
    });

    asyncTest("test series as array error", function() {
        expect(2);

        promiseflow.series([
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
        ],
        function(err, results) {
            equal(err, true);
            deepEqual(results, [ [ 1 ] ]);
            start();
        });
    });

    asyncTest("test series as object", function() {
        expect(2);

        promiseflow.series({
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
        },
        function(err, results) {
            equal(err, null);
            deepEqual(results, { one: [ 1 ], two: [ 2 ] });
            start();
        });
    });

    asyncTest("test series as object error", function() {
        expect(2);

        promiseflow.series({
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
        },
        function(err, results) {
            equal(err, true);
            deepEqual(results, { one: [ 1 ] });
            start();
        });
    });

    asyncTest("test parallel as array", function() {
        expect(2);

        promiseflow.parallel([
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
        ],
        function(err, results) {
            equal(err, null);
            deepEqual(results, [ [ 1 ], [ 2 ] ]);
            start();
        });
    });

    asyncTest("test parallel as object", function() {
        expect(2);

        promiseflow.parallel({
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
        },
        function(err, results) {
            equal(err, null);
            deepEqual(results, { one: [ 1 ], two: [ 2 ] });
            start();
        });
    });
})();
