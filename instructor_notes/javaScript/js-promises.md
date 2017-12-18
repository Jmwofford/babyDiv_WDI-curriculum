# JavaScript Promises

<style type="text/css">
summary {
	font-size: 1.25em;
	font-weight: bold;
}

summary.header {
	padding-bottom: 0.3em;
	font-size: 1.5em;
	border-bottom: 1px solid #eaecef;
}
</style>


## Objectives

* Describe the anatomy of a Promise
* Utilize Promises to manage asynchronous operations
* Correctly use a Promise chain
* Handle errors while working with Promises

## Introduction

Welcome to the Promise land! Promises drive a lot of modern programming practices, and it is what allows Node apps to operate asynchronously.  Today's lesson largely covers WHY and HOW to use a promise, and starting with the next class we will utilize these concepts to fetch data from MongoDB.

<details>
	<summary>You Do (10 Minutes)</summary>
	
Read this: [Promises For Dummies](https://scotch.io/tutorials/javascript-promises-for-dummies). 

If you read this yesterday, go through and read it again! What did you pick up this time that you didn't see before?
</details>

<details>
	<summary>Think, Pair, Share</summary>
	
What are some examples of a Promise in the real world? What's a scenario in which you would want to 'chain' Promises together in the real world?
</details>

<!-- https://spring.io/understanding/javascript-promises -->

## Non-Blocking Code in JavaScript
<details>
  <summary>Pop Quiz!</summary>
  
  Pop quiz! In the code below, which word will get printed first?

  ```js
  setTimeout(function(){ 
    console.log('Red'); 
  }, 0);
  console.log('Blue');
  ```

  What about now? Try it out for yourself and see what happens.

  ```js
  console.log('Red');
  console.log('Blue');
  ```
</details>

  JavaScript code is _non-blocking_ -- this means that each line of code begins
  to execute as soon as it possibly can, even if a previous line of code hasn't finished executing.
  
  
## Synchronicity

<details>
<summary>Comcast Example</summary>
  
Check out this setup: 
  
  1. Jim is the one person in all of Comcast media who can help you with you get your internet to work correctly.
  - Naturally, Jim is very popular.
  - Jim is always available by phone, but he can only talk to one person at a time.
  - Some people naturally want to talk to Jim for a MUCH longer time than others... which angers some of his other customers and increases the total wait time.

This is an example of synchronous communication.  In the example, he would listen and address people's problems, but was only able to help one person at a time.

Let's use this same metaphor to explain what we mean when we talk about asynchronicity.

  1. Jim buys a answering machine for all of his phone calls.
  - Customers now leave a message, and wait for Jim to call back.
  - This allows Jim to respond to messages as soon as he has an answer, without keeping other customers on hold.


Promises in JavaScript are like these answering machines.  It allows us to write responses for code that takes a while to prepare.
</details>

<details>
<summary>Things that use promises</summary>

These are some events that use Promises to handle asynchronous code:
  
  - Waiting for a **response to an HTTP request**.
  - Waiting for a **database** to retrieve/modify a piece of data.
  - Hitting a 3rd party API for **authentication** (Facebook, Twitter, etc)
  - Waiting on **DOM events** (driven by user interaction).

These are some examples of asynchronous code that don't use Promises out of the box:

  - Waiting for a **timer** to run out.
  - Waiting for the **filesystem** to read from, or to write to, a file.

In all of these examples, your JavaScript code is _waiting for something to happen_, and there's no telling how long that 'something' will take.
</details>

Even though all of this sounds new, we've already seen an alternative way to handle code that is waiting for something to happen. 


<details>
<summary>Think, Pair, Share</summary>

Talk to the person next to you and discuss how we have handled _waiting for something to happen_ before.  Write out 2-3 examples of when and how you have done this previously.
</details>

<details>
<summary>Previous Ways We've Dealt with Async Calls</summary>

So how can we tell our code to wait for something to finish?  Node actually uses the same approach that the browser does -- callbacks.

By setting a callback as an event handler, we can defer its execution until the event it's listening for occurs. Future steps can then be triggered by more callbacks.

  ```js
 app.get('/', (req, res) =>{
   //Do stuff when this route is hit on the server
 })

 $('div').on('click', function(e){
   //Do stuff when a user makes an interaction in the browser
 })
  ```
</details>

## "Callback Hell" : Drawbacks to Callbacks

  OK, that's fine for doing things that involve one 'slow' step. But what if
  there's _more than one_ 'slow' thing we have to deal with?

  ![Stamp](https://media2.giphy.com/media/1xkMJIvxeKiDS/200w.gif)
  ![Staple](https://media3.giphy.com/media/l2JI9JdUDjxVbd20g/200w.gif)

<details>
<summary>Callback Hell Example</summary>

For instance, let's say we need to do all of the following:

  1. Read in data from a file
  2. Parse the data as CSV content
  3. Fetch JSON from a 3rd party server.
  4. Take the response and store data into a database.
  5. Send a response back to the user.

Phew. How might that look if we try to use callbacks to handle that whole process?

Maybe something like this?

  ```js
  fs.readFile('./data-csv', function(err, data){  // read a file
    if(err) throw err;

    csv.parse(data, function(err, csvData){       // parse the data as CSV
      if(err) throw err;

      var url = csvData[0].url;
      var req = http.request({host: url}, function(res){ // make an HTTP request
        var responseData = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {                            // collect the response
          ResponseMessages.create({body: responseData},  // add record to a DB
            function(err, messageRecord){
            if (err) throw err;

            res.render('response', responseData);
          })
        });
      });
      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
      });

    })

  });
  ```

  Or how about this? 

  ![](http://i.imgur.com/EGGwaXP.png)
  
  ![](https://i.imgur.com/KqDiYWQ.png)

  ![Head Bang](https://media4.giphy.com/media/OT69wDOihxqEw/200w.gif)

  Wow, that's some deep nesting. This makes code looks complicated and messy.
  It's not easy to follow.  And it isn't DRY -- do you really need a separate system for handling errors at every stage in the
  process?
</details>

<details>
<summary>Drawbacks to Callbacks</summary>

Asynchronous code necessitates callbacks.
But dealing with lots of callbacks can be tricky:

-   Callbacks can be messy when they're nested: "callback hell".
    - [http://callbackhell.com/](http://callbackhell.com/)
-   Each callback will have to handle it's own errors if necessary.
-   In complex programs, it will be hard to tell in what order callbacks fire.
-  As projects become more complex it becomes exponentially harder to refactor and add features.

Fortunately, there's a better way: Promises.
</details>

## Why Promises?

<details>
<summary>Explanation</summary>

Promises are an alternative to directly using callbacks.  The concept of promises in programming have been around for decades, but it first rose to prominence in JavaScript after jQuery introduced something called a deferred object.  This resulted in an explosion of JavaScript libraries vying to find the clearest and most efficient way to handle async code.  Libraries like `bluebird`, `q`, and `async` were very popular options.  As web development became more and more focused on getting data from a variety of endpoints through APIs, these libraries became absolutely necessary for a JavaScript developer.

Fast forward to 2015 and the approval of the ES6 spec.  One of the biggest additions to the JavaScript language is a native promise library.  Now we no longer need to import an extra library, because the concept of Promises is built into the language.

Promises are going to present us with several key advantages over traditional callback functions.

- Promises, like callbacks, make async explicit
  - This means that we can give specific instructions on what to do with data once it is recieved.
- Unlike callbacks, Promises clarify the order of execution.
  - This means that Promises are easier to read and it is clear what happens when.
- Promises simplify error handling.
</details> 

<details>
<summary>Anatomy of a Promise</summary>

A Promise object is a special object in JS that will always have one of 3 states.

- pending
- rejected (Failure)
- resolved (Success!)

This means that a Promise object holds a value that is _promised_ to be given back to you.  When we are working with a Promise object, we need to use two special methods to consume the object when it is either resolved or rejected.

### `Promise.then` and `Promise.catch`

`.then` and `.catch` are the two main methods we will be utilizing when working with promises.  Both methods take one argument, a function.  This function has a single argument, which is a value that represents the fulfilled data, or the error message.

Here is an example of what a function using promises will look like when we begin using it with MongoDB & Handlebars.

```js
//Disclaimer: getInfoFromDatabase is just an example method

getInfoFromDatabase()
  .then(function(data){ //Called when data is successfully fetched
    console.log("Successfully retrieved data");
    res.render('/', {
      data: data
    })
  })
  .catch(function(error){ //Gets called when data isn't successfully fetched
    console.error(error)

    res.send("Oh no, something went wrong")
  });
```

#### `.then`
`then` is a method on every `Promise` object. It is used to register an event
handler for the promise's "resolve" (aka success) event. When the promise resolves, function is invoked and passed onto the function via the argument.

#### `.catch`
`catch` is also method on every `Promise` object. It is used to register an event
handler for the promise's "reject" (aka failure) event. When the promise rejects, the handler
is invoked and passed the value (usually an `Error` object) the promised rejected
with as its argument.  This handler can be really valuable when trying to debug.

What are some scenarios where you imagine an Error may occur when fetching information from a database?
</details>

<details>
<summary>Promises Example</summary>

A promise is like an IOU in real life. When you go to a restaurant, you pay money and in return are _promised_ food in the near future.  When you put in your order there can be plenty of orders being worked on at once.  Each order gets delivered as soon as it is finished, and it is delivered for you to eat.  Additionally, there is a possibility that something goes wrong.  Your food is overcooked, your order gets lost, etc.  When something goes wrong, the restaurant will explicitly let you know (hopefully).
</details>

## I DO: 

<details>
<Summary>Using Promises to fetch data from an API</summary>

Later in the class, we will be using JavaScript to get info from 3rd party servers by utilizing APIs.  In simplest terms, an API is simply a server where various requests can be made and responses can be delivered in JSON.  (We will go into more detail later)

In this example, I am using a database called [OMDB, the Open Movie Database](http://www.omdbapi.com/).  This will allow me to hit an endpoint using a JavaScript library called `axios` and use promises to console log a successful response.

Watch me do this, and focus in on how `.then()` and `.catch()` is allowing us to write clean async code.

```
const axios = require("axios")

axios.get("http://www.omdbapi.com/?apikey=d31f1a94&s=starwars")
  .then((response) => {
    console.log("Success!")
    console.log(response.data)
  })
  .catch((error) => {
    console.log("Something went wrong")
    console.log(error.response.data)
  })
```
</details>

<details>
<summary>Chaining Promises Together</summary>

![](https://i.imgur.com/QpPS6zT.png)

As you build promises, you may find that you need to make multiple calls to a database or API.  Promises allow developers to take this more advanced logic and still present it in a clean way.

**AGAIN** Watch me do this.  We will go more in depth on APIs in the future, for now we should focus on the `.then` and `.catch` methods.

```js
const axios = require("axios")

//Search for all movies that match Star Wars
axios.get("http://www.omdbapi.com/?apikey=d31f1a94&s=star%20wars")
  .then((response) => {
    //Get the ID of the first response and search for more info on that specific movie.
    console.log("Search Success!")
    console.log(response.data)

    const firstId = response.data['Search'][0].imdbID
    console.log("Id of the first movie", firstId);
    //Make a second API call to a third party API
    return axios.get(`http://www.omdbapi.com/?apikey=d31f1a94&i=${firstId}`)
  })
  .then((response) => {
    console.log("Second Api call success!");

    console.log(response.data)
  })
  .catch((error) => {
    console.log("Something went wrong")
    console.log(error.response.data)
  })
```

As our request becomes more complicated, it's now easy to add another `.then()` callback and we can keep our async code in check in a clean way.

Notice that we only have one `.catch` block at the end.  This is another great feature of promises.  If ANY of our promises fail, then that single `.catch` block will be called and we can guarantee consistent actions across any error.
</details>

## Recap
- Promises allow us to make really complex async code readable and clean.
- Promises have 3 states. Pending, Resolved, and Rejected
- We will be consuming Promise objects when we interact with our MongoDB database and when we make API calls to a server.

## Independent Practice
[Promises Lab - Starter Code](https://git.generalassemb.ly/atl-wdi/wdi-curriculum-10/tree/master/labs/unit_02/javaScript/promises/js-promises-lab-starter)
<br>
## For more info on how to build a Promise object
<details>
<summary>(Only if you feel really cozy with consuming promises)</summary>

  - [Promises In The Wild](https://davidwalsh.name/promises)
  - [Building Promises Lab](https://git.generalassemb.ly/atl-wdi/wdi-curriculum/tree/master/labs/javaScript/promises/js-promises-lab-starter)
</details>

## Additional Resources

-   [Clean Room Example Video](https://www.youtube.com/watch?v=s6SH72uAn3Q)
-   [Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
-   [Promises](https://www.promisejs.org/)
-   [Promises · Courtesy of ponyfoo.com](http://bevacqua.github.io/promisees/)
-   [wbinnssmith/awesome-promises: A curated list of useful resources for JavaScript Promises](https://github.com/wbinnssmith/awesome-promises)
-   [How to escape Promise Hell — Medium](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513#.4wtj9hlvw)
-   [Promise on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
-   [We Have a Problem with Promises](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
