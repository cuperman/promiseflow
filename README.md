# PromiseFlow

Asynchronous flow control for methods that return promises

## Example

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

## Dependencies

PromiseFlow depends on [jquery](http://jquery.com)

## Supported Methods

* series
* parallel