# Loops

There are times when we will want to execute the same piece of code multiple times. Loops are a common programming language feature that enable us to do this. Javascript has three types of loops that we will look at today...

## `for` loop

```js
for(var i = 0; i < 10; i++){
  console.log(i)
}
```

The loop is indicated with the keyword `for` followed parentheses that contain 3 parts separate by `;`...
  1. Instantiates the iteratee (in this example, `i`). `i` begins at 0 and will increase throughout the loops execution. `i` can be accessed within the loop.
  2. The comparison expression. The loop will continue to execute until this expression evaluates to false.
  3. How much the iteratee is incremented after each execution of the loop. In this example, `i` will increase by 1 after each iteration of the loop.

The actual content of the loop is located within the trailing curly brackets. In this example, `console.log(i)` will be executed ten times.

Oftentimes we will use a `for` loop to iterate through an array. That means we will want the loop to execute as many times as there are items in that array. Take a look at this example...

```js
var names = ["tyler", "nayana", "andy", "adrian", "nick", "jesse", "james"]
for(var i = 0; i < names.length; i++){
  console.log(names[i])
}
```

> This loop will run 7 times because the length of the array is 7. Each iteration of the loop will print out whichever name exists at index `i` within the array.

## `for in` loop

The `for in` loop functions similar to the `for` loop, but it is only used when iterating through a collection.

```js
var names = ["tyler", "nayana", "andy", "adrian", "nick", "jesse", "james"]
for(i in names){
  console.log(names[i])
}
```

* Also begins with the keyword `for`
* The parentheses contain the iteratee (the variable representing the index), followed by the keyword `in`, followed by the complex data type you would like to iterate over (either array or object)


### While Loop

A `while` loop will keep running so long as its condition evaluates to true. It does not require an iteratee or increment value.

Here is an example that counts up to 10.

```js
var i = 0;
while(i <= 10){
  console.log(i)
  i++
}
```

> What would happen if `i++` was removed from this example?
