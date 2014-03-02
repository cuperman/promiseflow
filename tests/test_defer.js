(function() {
    "use strict";

    module("defer");

    test("should return a function", function() {
        equal(typeof promiseflow.defer(), "function", "it should be a function");
    });

    test("deferred function should return a promise object", function() {
        var p = promiseflow.defer(function(d) {
            return d.resolve();
        })();

        equal(typeof p, "object", "it should be an object");

        ok(p.done, "it should have a done method");
        ok(p.fail, "it should have a fail method");
        ok(p.always, "it should have a always method");
        ok(p.then, "it should have a then method");

        ok(!p.resolve, "it should not have a resolve method");
        ok(!p.reject, "it should not have a reject method");
    });

    asyncTest("deferred function should pass a deferred object to the callback", function() {
        expect(3);

        promiseflow.defer(function(d) {
            equal(typeof d, "object", "it should be an object");

            ok(d.resolve, "it should have a resolve method");
            ok(d.reject, "it should have a reject method");

            start();
        })();
    });

    asyncTest("deferred function should pass arguments to the callback", function() {
        expect(2);

        promiseflow.defer(function(d, foo, bar) {
            equal(foo, "FOO");
            equal(bar, "BAR");

            start();
        })("FOO", "BAR");
    });

    asyncTest("deferred function should be done when deferred is resolved", function() {
        expect(1);

        var p = promiseflow.defer(function(d) {
            d.resolve();
        })();

        p.done(function() {
            ok(true);
            start();
        });
    });

    asyncTest("deferred function should fail when deferred is rejected", function() {
        expect(1);

        var p = promiseflow.defer(function(d) {
            d.reject();
        })();

        p.fail(function() {
            ok(true);
            start();
        });
    });
})();
