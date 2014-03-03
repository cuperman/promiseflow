# PromiseFlow

Asynchronous flow control with promises

Promises are great, but sometimes you need a little more control over the flow of asynchronous calls.  If you're already using promises, then this utility can make complex chaining really easy.

For example, if you have 3 asynchronous commands, and want to run them in parallel, executing a block of code upon completion, PromiseFlow makes this easy.  Assuming you have 3 functions `foo`, `bar`, and `baz` that each return a promise, you can do something like this:

```
promiseflow.parallel([foo, bar, baz])
    .then(function() {
        window.alert("all done!");
    });
```

Even if some of your functions don't return promises, you can use the `defer` helper for that.  Assume the `baz` function from the previous example takes a callback function as an argument, which is called when complete, you can do something like this:

```
var bazDeferred = promiseflow.defer(function(d) {
    baz(function() { d.resolve(); });
});

promiseflow.parallel([foo, bar, bazDeferred])
    .then(function() {
        window.alert("all done!");
    });
```

## Dependencies

PromiseFlow depends on [jQuery](http://jquery.com)

## Supported Methods

* defer
* series
* parallel
* each (coming soon)
* times (comming soon)
* waterfall (coming soon)
* throttle (coming soon)

### defer

### series

Executes functions in series

`promiseflow.series(collection, options)`

collection: either an array or object

options:

* context: binds to 'this'
* results: "all" to return an array of results from each function, or "first" to return only the first value in the response (default: first)

returns: promise

Example:

```
var foo = function() {
    return $.get("/foo");
};

var bar = function() {
    return $.get("/bar");
};

// array notation
promiseflow.series([foo, bar])
    .done(function(results) {
        // results is an array with responses from each function
        console.debug("foo response", results[0]);
        console.debug("bar response", results[1]);
    });
    
// object notation, with 'all' results option
var p = promiseflow.series({
    foo: foo,
    bar: bar
}, { results: "all" });

p.done(function(results) {
    // results is an object with responses from each function
    // each response is an array containing all results from each promise
    console.debug("foo data", results.foo[0]);
    console.debug("foo status", results.foo[1]);
    console.debug("foo jqXHR", results.foo[2]);
    
    console.debug("bar data", results.bar[0]);
    console.debug("bar status", results.bar[1]);
    console.debug("bar jqXHR", results.bar[2]);
});


```


### parallel

options: 

* context
* results