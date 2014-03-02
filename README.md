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

* series
* parallel
* each
* times
* waterfall
* throttle

## Old Example

Assume you have a few asynchronous functions to execute in parallel, and you want to process all results when complete:

```
// execute multiple async functions in parallel
var p = promiseflow.parallel({
    people: function() { return $.get("/api/people"); }, 
    places: function() { return $.get("/api/places"); },
    things: function() { return $.get("/api/things"); }
});

// when all functions are complete, all results are available in a single callback
p.done(function(results) {
    var people = results.people[0],
        places = results.places[0],
        things = results.things[0];
            
    doSomethingWith(people, places, things);
});

// and you can also handle failures
p.fail(function(index, results) {
    var jqXHR = results[0],
        textStatus = results[1],
        errorThrown = results[2];
        
    console.error("failed to retrieve: " + index, errorThrown);
});
```