(function() {
    "use strict";

    module("defer");

    test("should return a promise object", function() {
        var p = promiseflow.defer();

        equal(typeof p, "object", "it should be an object");

        ok(p.done, "it should have a done method");
        ok(p.fail, "it should have a fail method");
        ok(p.always, "it should have a always method");
        ok(p.then, "it should have a then method");

        ok(!p.resolve, "it should not have a resolve method");
        ok(!p.reject, "it should not have a reject method");
    });

    asyncTest("should pass a deferred object to the callback", function() {
        expect(3);

        promiseflow.defer(function(d) {
            equal(typeof d, "object", "it should be an object");

            ok(d.resolve, "it should have a resolve method");
            ok(d.reject, "it should have a reject method");

            start();
        });
    });

    asyncTest("should be done when deferred is resolved", function() {
        expect(1);

        promiseflow.defer(function(d) {
            d.resolve();
        })
        .done(function() {
            ok(true);
            start();
        });
    });

    asyncTest("should fail when deferred is rejected", function() {
        expect(1);

        promiseflow.defer(function(d) {
            d.reject();
        })
        .fail(function() {
            ok(true);
            start();
        });
    });
})();
