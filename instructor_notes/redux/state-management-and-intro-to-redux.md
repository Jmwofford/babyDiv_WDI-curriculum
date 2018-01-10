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
- Define state in relationship to building Front End Applications
- Describe the benefits of using a global state object vs local state
- Explain the 3 Principles of Redux
- Explain the roles of actions and the reducer
- Define Redux specific terms (i.e. Reducer, Actions, Store)

### Preparation
*Before this lesson, students should already be able to:*

- Create a simple app in React using `create-react-app`
- Understand how data is passed between components in React
- Be familiar with higher-order functions and object/array destructuring

### Going Fast Forever - 5 min

Several weeks ago, we talked about how our goal in building software is to **go fast forever**. Meaning that as professionals, we want to plan and structure our application workflow to allow us to make quick changes and build tons of new and interesting features.
React so far has allowed us to build really interactive sites that are easily broken up into small pieces, which allows us to build more efficiently than using a library like jQuery.
React allows us to built lots and lots of separate components really really fast.  That's why it has so rapidly become the most popular choice to render views.  The downside of this is that React is only concerned with being a VIEW layer for your application.  This means that, even though React is able to manage the data that is stored on your application, it's doesn't care about that as much as it does the view.

### You Do (Turn and Talk) - 5 min

With a partner, write down your definition of what state is in React.
  - What is state?
  - Where does state live?
  - How does state get changed?
  - How do you pass state from place to place?

Even though we can easily manage and change state just using React alone, we can begin to see some of the weaknesses of using React alone to manage that state of your application.

State in React is only handled within individual components. Whenever we have values that may change we must update our state with the `this.setState()` method.

This state private to an individual React component. This is commonly called `Local State`.  The state is defined, called, and transformed only from within the component that owns it.

How do we pass information in a components state to other components?

We can send information down the React component tree through props.  Props allows us to pass values and methods that can reference parts of state and even call methods within the higher level component.  This has worked out great so far, but as your app grows larger it may begin to grow more and more difficult to make changes to your state.  This is why we've lifted our state up to it's very top level in most React apps that we've created. Eventually this becomes an extremely time consuming and risky activity.

### A Little Bit of History

The React developers designed React in such a way as to remain unopinionated about complex React state management. They introduced the [Flux application architecture](https://facebook.github.io/flux/) to fill that void. Flux allows developers to extract the local state of components into something called a **store** (basically a giant object with all of your data).

Flux is only an architecture. A collection of ideas about HOW you should build an app.  After it was introduced, tons of tools were created to implement the Flux pattern, but one has emerged as the favorite choice, Redux.

### Enter Redux

Redux is a library that expands on the ideas of the Flux pattern and combines it with the ideas that power the `reduce` higher order function.  I highly recommend checking out the talk where the creator Dan Abramov introduced Redux [here](https://www.youtube.com/watch?v=xsSnOQynTHs)

Through using Redux, we will be able to take all of the state out of our individual components, and instead house them inside of a **store**.

![](../images/with_and_without_redux.png)

### You Do - 10 min

Read [this Medium post](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f) written by a developer who build a React app for the Australian Broadcast Corporation.  It's a great real world example of how React becomes more and more difficult to handle as projects become more difficult.
  - TODO: Write Questions about the article
  - According to the articles, what benefits did his team gain by using a State Management Library like Redux?

### Understanding Redux

The state problems introduced when scaling up React Applications is not unique to this single library.  This problem occurs in Angular 1 & 2, Backbone, Ember and lots of other front-end frameworks.  As data needs to be moved around more often, it is sometimes necessary for that data to all live in another place.

When people first get started with Redux, the biggest difficulties with its learning curve is understanding the terminology and philosophy behind the library.

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

The only requirement of these actions is that it must be an object with at `type` that is a string.  Any additional key/value pairs are completely optional.

These actions feed new data into our store, and are typically created inside of an action creator.

#### Action Creator

Action Creators are just functions that return an Action.

```js
const addTodo (todo) => {
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
  switch(action){
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

Learning how to properly manipulate the reducer is by far the most difficult part of learning Redux. Let's take a little bit of a deeper look at it and see if we can demystify the hard parts.

TODO: ADD EXERCISE FOR PURE FUNCTION PRACTICE

## Further Reading:

* [Redux Docs](https://redux.js.org/)
* [When do I know I'm ready for Redux](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f)
* [Dissecting Twitter's Redux Store](https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1)
* [Redux TLTR ](https://medium.com/@nicotsou/tltr-redux-e4fc30f87e4a)
