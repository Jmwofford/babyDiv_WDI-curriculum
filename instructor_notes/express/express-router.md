---
title: Express - Router
type: lesson
duration: '1:30'
creator:
    name: Matt Huntington/Colin Hart/Jamie King
    class: WDI13
---

# Express - The Router

## Lesson Objectives
1. Get rid of Code Smells by utilizing the DRY principle and other best practices
2. Use the Single Responsibility Principle to explain the concept of MVC
4. Use the express Router to:
  - Bring the C of MVC
  - Dry up our routes
  - Apply Single Responsibility to our application, specifically to our main server file (server.js)
5. Describe and apply the principles of Refactoring

**Optional reading for later:**

- [3 Key Software Principles](https://code.tutsplus.com/tutorials/3-key-software-principles-you-must-understand--net-25161)
- [Express routing docs](https://expressjs.com/en/guide/routing.html)
- [Express Router](https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers)
- [Module.exports- open my mind](http://openmymind.net/2012/2/3/Node-Require-and-Exports/)
- [Module.exports- sitepoint](https://www.sitepoint.com/understanding-module-exports-exports-node-js/)

<br />

## Intro

Let's take a look at all of the things we have done so far in our single server.js file.

- Import express, handlebars, and other dependencies.
- Declared which view engine to use as our templating language.
- Create multiple routes that listens for a request and provides a response.
- Define what port our server lives on.

Just these four things are starting to make our server.js file pretty large and unmaintainable.  Imagine what this 
code would look like if it were also connected to a database and had dozens and dozens of routes! Today we will 
examine some best practices regarding breaking up our code into smaller, more readable pieces.


## DRY and Code Smells
### Code Smells
<img style="float:left; margin: 0 20px 20px 0;" width="300" src="https://cdn-images-1.medium.com/max/1600/1*_xk8HBrdtVr3snK9rZ6Jlg.jpeg" />

For many of us, a large `server.js` file may start to not feel like a best practice.  It doesn't fit in with many of the rules that we've talked about in the past like DRY and Separation of Concerns.  These feelings can help push you to noticing symptoms that can possibly indicate a deeper problem in your code.  This is commonly referred to as a `Code Smell`.

Leaving Code Smells unaddressed can easily lead to difficult to maintain or unmaintainable code down the line.  We want to do our best to avoid writing smelly code.  One easy way to make sure our code is maintainable and scalable over the long term is to utilize established design patterns, keep our code separated into many files instead of one giant file, and constantly looking for opportunities to make our code better through **merciless** refactoring.

### Keeping the Smell Out

### Don't Repeat Yourself

The **DRY** principle is aimed at reducing repetition within your code.  This makes your code easier to maintain as it grows and prevents unnecessary bloat.

> "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."

<br />

### Single Responsibility

> "Every module or class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class." - https://en.wikipedia.org/wiki/Single_responsibility_principle

<br />

### Design And Architectural Patterns

#### RESTful Routing
RESTful Routing is a naming convention for all of your routes which mixes HTTP Verbs with path names to create individual routes for each CRUD interaction.  RESTful routes always match 1 of 7 different actions.

![](https://i.stack.imgur.com/RyM1b.png)

We'll go more in depth with RESTful routing tomorrow.

#### Model View Controller

**MVC** is an application architectural pattern that allows us to efficiently utilize the single responsibility principle. So far we have been writing everything in the server file, the views directory, and our data file.

As our application gets large, it will become necessary to break up our code into smaller files.  To combat this ever increasing bloat, the MVC pattern emerged as a way to manage the flow of data throughout a request/response life cycle.

**Turn & Talk: MVC Life Cycle (5 min)**

1. There are roughly 7 steps from initial request to the server response when using MVC.
2. You and a partner work together to research all of the steps of the MVC cycle.

<img height="400" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MVC-Process.svg/1200px-MVC-Process.svg.png" />

<br />

## Refactoring your app to use MVC

The first step for triggering the request/response lifecycle is the router.  So far, all of our routes have lived in the `server.js` file.  Let's utilize the `Router` that is built into Express to break up our code into a more organized directory structure.

### We Do: Use the Express Router to Simplify `server.js`

You may find that your server.js file is growing into a giant file with tons of routes.  Related routes can be grouped together in separate files

```javascript
app.get('/shows', function(req, res){
    //do stuff
});

app.get('/shows/:id', function(req, res){
    //do stuff
});

app.get('/shows/:id/edit', function(req, res){
    //do stuff
});
```

These routes are all related to shows.  Let's put them in a separate "controller" file and directory.  To do this, let's create a "controllers" directory and create a file called shows_controller.js.  This will be our shows controller file.

Now move the routes pertaining to shows into that shows_controller.js file.

```javascript
app.get('/shows', function(req, res){
    //do stuff
});

app.get('/shows/:id', function(req, res){
    //do stuff
});

app.get('/shows/:id/edit', function(req, res){
    //do stuff
});
```

Require express at the top of that shows_controller.js file

```javascript
var express = require('express');
```

Invoke the router

```javascript
var router = express.Router();
```

Change app to router

```javascript
router.get('/shows', function(req, res){
    //do stuff
});

router.get('/shows/:id', function(req, res){
    //do stuff
});

router.get('/shows/:id/edit', function(req, res){
    //do stuff
});
```

At the bottom of the file, export the router

```javascript
module.exports = router;
```

> This syntax allows us to export parts of the code to be used in other files.  We've already seen this in the libraries we've used so far.  Watch this video to see a few different methods of exporting: https://www.youtube.com/watch?v=P51O_PT7NUg

Now in your `server.js`, require the controller file we created.  **Be sure to include ./ at the beginning of the path to the controller, so node knows that this is not an NPM package.**

```javascript
var showsController = require('./controllers/shows_controller.js');
```

Use the controller for all routes that start with `/shows`

```javascript
app.use('/shows', showsController);
```

> `app.use` is an example of using something called `middleware`.   This allows us to use the `express.Router()` method.  We will use middleware to add many libraries in the future. [List of Common Express Middleware Libraries](https://expressjs.com/en/resources/middleware.html)

Since we are specifying that the controller will be used for all routes starting with `/shows`, we don't need to show `/shows` in our actual routes within our controller file.

```javascript
router.get('/', function(req, res){
    //do stuff
});

router.get('/:id', function(req, res){
    //do stuff
});

router.get('/:id/edit', function(req, res){
    //do stuff
});
```
<details> 
  <summary>Where did the `shows` part of the route go?</summary>

  We declare the beginning of the path in the `server.js` when we say `app.use('/shows', showsController)`.  The first argument here determines the starting point for all routes that exist in the controller.
</details>

---

## LAB

Routes on routes on routes! Time to get more reps in building an Express app, adding Handlebars, and using Express Router to keep your code separated.

[Express Router Lab](https://git.generalassemb.ly/atl-wdi/wdi-curriculum/blob/master/labs/express/express-router-lab.md)
