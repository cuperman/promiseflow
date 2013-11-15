# PromiseFlow

Asynchronous flow control for methods that return promises

This library provides wrapper methods for various features of [async.js](https://github.com/caolan/async), but is friendly with promises.

## Example

Assume you have a couple functions which return promises, and you want to execute them in parallel, and collect the results when both are complete:

```
var getFoo = function() {
    return $.get("/api/foo");
};

var getBar = function() {
    return $.get("/api/bar");
};

promiseflow.parallel([getFoo, getBar])
    .fail(function() {
        console.error("an error ocurred");
    })
    .done(function(results) {
        var foo = results[0],
            bar = results[1];
                
        console.log("foo", foo);
        console.log("bar", bar);
    });
```

Notice that the promiseflow methods also return promises.

## Dependencies

PromiseFlow depends on [jquery](http://jquery.com) and [async.js](https://github.com/caolan/async).

## Supported Methods

* series
* parallel