---
title: State Management and Intro to Redux
type: lesson
duration: "2:00"
creator:
    name: Jamie King
    city: ATL
competencies: Front-End Architecture
---

# State Management and Intro to Redux

### Objectives

*After this lesson, students will be able to:*

- Understand state in relationship to building Front End Applications
- Describe the benefits of using a global state object vs local state
- Explain the 3 Principles of Redux
- Explain the roles of actions and the reducer
- Define Redux specific terms (i.e. Reducer, Actions, Store)

### Preparation

*Before this lesson, students should already be able to:*

- Create a simple app in React using `create-react-app`
- Understand how data is passed between components in React
- Be familiar with higher-order functions and object/array destructuring

### Going Fast Forever

Several weeks ago, we talked about how our goal when designing software is to **go fast forever**. This means that as professionals, we want to plan and structure our application workflow to allow us to make quick changes and build tons of new and interesting features for months and years without needing to slow down.

React so far has allowed us to build really interactive sites that are easily broken up into small pieces, which allows us to build more efficiently than using a library like jQuery where code can become messy quickly.

The ability to break pieces of our application into small components helps us go fast because we can easily find and change small pieces of our app.  That's why it has so rapidly become the most popular choice to render views.  The downside of this is that React is only concerned with being a **VIEW** layer for your application.  This means that, even though we can manage state and data through React, it's doesn't care about that as much as it does showing and updating the DOM quickly.

### You Do (Turn and Talk) - 5 min

With a partner, discuss and write down answers to the following questions.

- What is state?
- Where does state live in a React application?
- How does state get changed?
- How do you pass state from place to place?


### State in React

Even though React has built in tools to manage and update the state of an application, it is not nearly as strong as the rendering capabilities.  This is by design within Facebook, remember React is a `library` focused on solving a few problems, not a `framework` which is more expansive and is more opinionated.

State in React is only handled within individual components. Whenever we have values that may change we must update our state with the `this.setState()` method.

This state private to an individual React component. This is commonly called `Local State`.  The state is defined, called, and transformed only from within the component that owns it.

**CFU**: How do we pass information in a components state to other components?

We can send information down the React component tree through props.  Props allows us to pass values and methods that can reference parts of state and even call methods within the higher level component.  This has worked out great so far, but as your app grows larger it may begin to grow more and more difficult to make changes to your state.  This is why we've lifted our state up to it's very top level in most React apps that we've created. Eventually this becomes an extremely time consuming and risky activity.

One common use case that requires global state like this is having an application with many different views (like when using React Router).

**CFU**: What sort of risks do we gain as we build a large React only application?

### A Little Bit of History

The React developers designed React in such a way as to remain unopinionated about complex React state management. They introduced the [Flux application architecture](https://facebook.github.io/flux/) to fill that void. Flux allows developers to extract the local state of components into something called a **store** (basically a giant object with all of your data).

Flux is only an architecture. A collection of ideas about HOW you should build an app.  After it was introduced, tons of tools were created to implement the Flux pattern, but one has emerged as the favorite choice, Redux.

### Enter Redux

Redux is a library that expands on the ideas of the Flux pattern and combines it with the ideas that power the `reduce` higher order function.  I highly recommend checking out the talk where the creator Dan Abramov introduced Redux [here](https://www.youtube.com/watch?v=xsSnOQynTHs)

Through using Redux, we will be able to take all of the state out of our individual components, and instead house them inside of a **store**.

![](../images/with_and_without_redux.png)

### You Do - 10 min

Read [this Medium post](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f) written by a developer who build a React app for the Australian Broadcast Corporation.  It's a great real world example of how React becomes more and more difficult to handle as projects become more difficult.

- After working on the app for a month, what are some of the pain points the team found by just using React by itself?
- In your own words, describe how Redux handles data differently than React on its own.
- According to the articles, what benefits did his team gain by using a State Management Library like Redux?

## Understanding Redux

The state problems introduced when scaling up React Applications is not unique to this single library.  This problem occurs in Angular 1 & 2, Backbone, Ember and lots of other front-end frameworks.  As data needs to be moved around more often, it is sometimes necessary for that data to all live in another place.  One of the great things about Redux is that is is library and framework agnostic, meaning that it can be used in all of these other libraries as well!

When people first get started with Redux, the biggest difficulties with its learning curve is understanding the terminology and philosophy behind the library.  This difficulty is compounded when you try to learn Redux terminology at the same time as learning the other tools to implement Redux.  For now, we are focusing on the terms related to the Redux library and design pattern.

### Terminology

Just like when we learned about MVC, there are several new terms to learn when we begin to utilize Redux.  Though we will see more terms when we connect it to React, Redux itself only has 4 major concepts to understand.

#### Store

The store is the `Single Source of Truth` that information in a program flows through. The store encapsulates not only the data in the program, but also controls the flow of program data, storing each change in a separate state. Redux even gives us the ability to time travel through our application's history of application states. It's ends up looking like a really large JavaScript object.

All the principles of Redux are embodied in the store. The store holds an application's states (including current and previous states), actions which specify different changes to make on some part of the application state, and the reducer, which specifies which actions update the state object.

Since state is being represented as an immutable data-structure, we cannot directly modify it. Changing state in the program requires dispatching an action that modifies a copy of the state.

#### Action

The action is the simplest of new terms. Actions are simply a JavaScript object that describes what change is being made and contains any data relative to the change.

```js
{
  type: 'ADD_TODO',
  todo: 'Learn Redux'
}
```

The only requirement of these actions is that it must be an object with a `type` that is a string.  Any additional key/value pairs are completely optional.

These actions feed new data into our store, and are typically created inside of an action creator.

#### Action Creator

Action Creators are just functions that return an Action.

```js
const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo: todo
  }
}

addTodo('Learn Redux')
```

### Reducer

When an action gets dispatched it is sent to the Reducer.  The Reducer is a `pure` function that describes how the action will update the store (aka state object)

The reducer will always take the **previous state** and the **action** that was dispatched and will always return a brand new state. The body of the function is normally a switch statement that looks at the `type` property in the action.  Each `case` in the switch statement will be an action `type` that the reducer is listening for.  If there is a match, the reducer will return a brand new object or array for the state object.

```js
const exampleReducer = (state, action) => {
  switch(action.type){
    case: 'EXAMPLE_ACTION'
      //Do some stuff and return a new state
      return newState

    // Make sure to always have a default that returns state
    default:
      return state;
  }
}
```

### 3 Principles of Redux

#### 1. Single Source of Truth

**The state of your whole application is stored in an object tree within a single store.**

This makes it easy to create universal apps, as the state from your server can be serialized and hydrated into the client with no extra coding effort. A single state tree also makes it easier to debug or inspect an application; it also enables you to persist your app's state in development, for a faster development cycle. Some functionality which has been traditionally difficult to implement - Undo/Redo, for example - can suddenly become trivial to implement, if all of your state is stored in a single tree.

#### 2. State is Read-Only

**The only way to change the state is to emit an action, an object describing what happened.**

This ensures that neither the views nor the network callbacks will ever write directly to the state. Instead, they express an intent to transform the state. Because all changes are centralized and happen one by one in a strict order, there are no subtle race conditions to watch out for. As actions are just plain objects, they can be logged, serialized, stored, and later replayed for debugging or testing purposes.

#### 3. Changes are Made with Pure Functions

**To specify how the state tree is transformed by actions, you write pure reducers.**

Reducers are just pure functions that take the previous state and an action, and return the next state. Remember to return new state objects, instead of mutating the previous state. You can start with a single reducer, and as your app grows, split it off into smaller reducers that manage specific parts of the state tree. Because reducers are just functions, you can control the order in which they are called, pass additional data, or even make reusable reducers for common tasks such as pagination.

### Reducer Deep Dive

> The Redux reducer API is `(state, action) => newState`, but how you create those reducers is up to you. -Dan Abramov

Learning how to properly manipulate the reducer is by far the most difficult part of programming with Redux. Let's take a little bit of a deeper look at it and see if we can demystify the hard parts.

It's important to remember that the reducer's job is not to transform your state, but instead to **completely** replace the old state with a brand new state object.  This is achieved through combining two concepts built into JavaScript: **switch statements** and **pure functions**.

#### Switch Statements

It's possible that you have seen switch statements previously.  Switch statements are an additional way to handle conditionals in JavaScript. They are useful for scenarios where the alternative is a lot of `if-else` statements.

```js
switch(condition){
  case 'scenario 1':
    return 'Scenario one Selected'
  case 'scenario 2':
    return 'Scenario two selected'
  default:
    return 'Default Value Selected'
}
```

```js
if (condition === 'scenario 1'){
    return 'Scenario one Selected'
} else if (condition === 'scenario 2'){
    return 'Scenario two selected'
} else {
  return 'Default Value Selected'
}
```

#### Pure Functions

**Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.**

Redux relies on pure functions in order to trigger the update life cycle for a React component.  If you remember back to our conversation on functional programming, you'll remember that a pure function is simply a function given the same inputs it will always output the same value.  Additionally, pure functions will always output a brand new value.  Prior to ES6/ES7, it was very difficult to build pure functions, but this style of programming has exploded in popularity in recent years.

Let's take a look at some different ways we can output a brand new value.

- `[...previousArray]`  This is an example of spreading an array
- `{...previousObject}` This is a spread object
- `map, filter, reduce` are all examples of built in methods that clone an array.

### You Do:

Use pure functions to solve the following problems:

1. Use a pure function to add a `todo` to this existing array of todo objects:

```js
const todos = [
  {
    id: 1,
    task: 'Learn React',
    completed: true
  },
  {
    id: 2,
    task: 'Learn Redux',
    completed: false
  },
  {
    id: 3,
    task: 'Watch Black Mirror',
    completed: true
  }
]

const newTodo = {
  id: 4,
  task: 'Buy a Tesla',
  completed: false
}

function addTodo(todos, newTodo){
  // Your code here
}

addTodo(todos, newTodo)
```

2. Create a pure function called `editUserObject` that will take 2 objects, one that represents a user and another that represents changes to that user object.  Make sure that the object you return is a brand new object.

```js
const user = {
  name: 'Steve Jobs',
  company: 'Apple',
  email: 'steve@mac.me'
}

const userChanges = {
  email: 'steve@geocities.com'
}

function editUserObject(currentUser, edits){
  // Your code here
}

console.log(editUserObject(user, userChanges))
```

3. Return an array of objects that removes all fruits.

```js
const fruitsAndVeggies = ['Apple', 'Squash', 'Orange', 'Pear', 'Lime']

function removeFruit(originalArray){
  // Your code here
}

console.log(removeFruit(fruitsAndVeggies))
```

### Lab/Homework: [Building A Super Simple Shopping Cart With React/Redux](https://git.generalassemb.ly/ga-wdi-exercises/react-redux-shopping-cart)

For the remainder of this class and for homework this evening, try to work through this codealong that sets up a simple React and Redux application.  In here, you will be introduced to the `react` library and the `react-redux` library.  Pay attention to the components and methods that you import here and their relationship with the Redux pattern.  Don't copy paste the code here into your own React app... instead type out everything presented in the example and reflect on what is happening at each level.

## Further Reading

- [Redux Docs](https://redux.js.org/)
- [When do I know I'm ready for Redux](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f)
- [Dissecting Twitter's Redux Store](https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1)
- [Redux TLTR](https://medium.com/@nicotsou/tltr-redux-e4fc30f87e4a)
