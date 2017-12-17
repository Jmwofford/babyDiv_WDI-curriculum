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

For many of us, this large `server.js` file starts to not feel like a best practice.  It doesn't fit in with many of the rules that we've talked about in the past like DRY and Separation of Concerns.  These feelings can help push you to noticing symptoms that can possibly indicate a deeper problem in your code.  This is commonly referred to as a `Code Smell`.

Leaving Code Smells unaddressed can easily lead to difficult to maintain or unmaintainable code down the line.  We want to do our best to avoid writing smelly code.  One easy way to make sure our code is maintainable and scalable over the long term is to utilize established design patterns, keep our code separated into many files instead of one giant file, and constantly looking for opportunities to make our code better through **merciless** refactoring.

### Keeping the Smell Out

**Don't Repeat Yourself**

The **DRY** principle is aimed at reducing repetition within your code.  This makes your code easier to maintain as it grows and prevents unnecessary bloat.

> "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."

<br />

## Single Responsibility

> "Every module or class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class." - https://en.wikipedia.org/wiki/Single_responsibility_principle

<br />

## Model View Controller

**MVC** is an application architectural pattern that allows us to utilize the single responsibility principle. So far we have been writing everything in the server file, the views directory, and our data file.

You can imagine that each of these pieces will get larger and larger.  Through the use of the MVC pattern, we will be able to break our code into smaller, more flexible parts

<img height="400" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MVC-Process.svg/1200px-MVC-Process.svg.png" />

<br />

## Use the Express Router to Simplify server.js

You may find that your server.js file is growing into a giant file with tons of routes.  Related routes can be grouped together in separate files

```javascript
app.get('/todos', function(req, res){
    //do stuff
});

app.get('/todos/:id', function(req, res){
    //do stuff
});

app.get('/todos/:id/edit', function(req, res){
    //do stuff
});
```

These routes are all related to todos.  Let's put them in a separate "controller" file and directory.  To do this, let's create a "controllers" directory and create a file called todos_controller.js.  This will be our todos controller file.

Now move the routes pertaining to todos into that todos_controller.js file.

```javascript
app.get('/todos', function(req, res){
    //do stuff
});

app.get('/todos/:id', function(req, res){
    //do stuff
});

app.get('/todos/:id/edit', function(req, res){
    //do stuff
});
```

Require express at the top of that todos_controller.js file

```javascript
var express = require('express');
```

invoke the router

```javascript
var router = express.Router();
```

Change app to router

```javascript
router.get('/todos', function(req, res){
    //do stuff
});

router.get('/todos/:id', function(req, res){
    //do stuff
});

router.get('/todos/:id/edit', function(req, res){
    //do stuff
});
```

At the bottom of the file, export the router

```javascript
module.exports = router;
```

Now in your `server.js`, require the controller file we created.  **Be sure to include ./ at the beginning of the path to the controller, so node knows that this is not an NPM package.**

```javascript
var todosController = require('./controllers/todos_controller.js');
```

Use the controller for all routes that start with `/todos`

```javascript
app.use('/todos', todosController);
```

Since we are specifying that the controller will be used for all routes starting with `/todos`, we don't need to show `/todos` in our actual routes within our controller file.

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

## Refactoring

>noun: a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior

> verb: to restructure software by applying a series of refactorings without changing its observable behavior

From: _www.refactoring.com_

>Code refactoring is the process of restructuring existing computer code—changing the factoring—without changing its external behavior. Refactoring improves nonfunctional attributes of the software. Advantages include improved code readability and reduced complexity [...]

From: _wikipedia.org/wiki/Code_refactoring_

---

We're going to refactor the hello app from yesterday so that each of the routes exists in a separate router.


## LAB

Routes on routes on routes!
