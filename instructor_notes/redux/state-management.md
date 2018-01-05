---
title: State Management in JavaScript
type: lesson
duration: "2:00"
creator:
    name: Jamie King
    city: ATL
competencies: Front-End Architecture
---

# State Management in JavaScript

### Objectives
*After this lesson, students will be able to:*
- Define State in relationship to building Front End Applications
- Describe the benefits of using a global state object vs local state
- Understand the benefits of functional programming when it relates to a single state store
- Explain the 3 Principles of Redux
- Explain the roles of actions and the reducer

### Preparation
*Before this lesson, students should already be able to:*

- Create a simple app in React using `create-react-app`
- Understand how data is passed between components in React

## Hook
We've talked a lot about state so far in React, but how much have your really thought about state and how it relates to React?

### You Do (Turn and Talk)
With a partner, write down what State is in React.
  - Where does state live?
  - How does state get changed?
  - How do you pass state from place to place?

### React Only State

State in React is only handled through local components. Whenever we have values that may change we must update our state with the `this.setState()` method.

This state private to an individual React component. This is an example of `Local State`.  The state is defined with in a component, and can only be updated within that same component.  It is impossible to call `setState` outside of the component.

How do we pass information in a components state to other components? 

We can send information down the React component tree through props.  Props allows us to pass values and methods that can reference parts of state and even call methods within the higher level component.  This has worked out great so far, but as your app grows larger it may begin to grow more and more difficult to make changes to your state.  This is why we've lifted our state up to it's very top level in most React apps that we've created.

This complexity that gets introduced as your app grows is the reason why State Management Libraries have become so popular in the front end world.  These libraries remove the need to create local state in lots of components, and instead allows developers to manage a single large object that holds all of the data for the application.

## You Do (Reading)
Read this Medium post written by a developer who build a React app for the Australian Broadcast Corporation.  It's a great real world example of how React becomes more and more difficult to handle as projects become more difficult.
- TODO: Write Questions about the article
- According to the articles, what are the benefits of a State Management Library like Redux?

## The Flux Pattern

The difficulty introduced when scaling up React Applications is not a unique one.  This problem has been observed in Angular 1, Backbone, Ember and lots of other front-end frameworks.  Applications with hundreds of components all passing state around introduce all sorts of performance and readability problems.

This need for an easily scalable way to manage your state gave birth to a design pattern called Flux.  Flux is simply a way to structure your code to extract the local state from individual components and make it easily accessible to all other components.  There used to be multiple tools to help developers utilize this Flux pattern, but over time `Redux` emerged as the community favorite.

Both Flux and Redux hold 3 core principles 
1. Single Source of Truth
2. State is Read-Only
3. Changes are Made with Pure Functions

## Redux

Redux is a library created by Dan Abramov that combines the best parts of the Flux pattern with the power of the Reducer method in JavaScript 
(that's where the Red-ux name comes from).

By using Redux, we will be able to make the flow of data less complex as our application gets larger.  (Remember "Go Fast Forever?")

![](../images/with_and_without_redux.svg)

When we talk about Redux, we can potentially be talking about a few different things:
  - Redux as a pattern
  - Redux as a library
  - Redux as a tool that works with React

## Redux as a Pattern

As we move into this new design pattern we have several new terms that come along with it. Let's look at each term at a high level before getting deeper into the weeds with the code.

### Store

The store is the `Single Source of Truth` that information in a program flows through. The store encapsulates not only the data in the program, but also controls the flow of program data, storing each change in a separate state. Redux even gives us the ability to time travel through our application's history of application states. It's ends up looking like a really large JavaScript object.

All the principles of Redux are embodied in the store. The store holds an application's states (including current and previous states), actions which specify different changes to make on some part of the application state, and the reducer, which specifies which actions update the state object.

Since state is being represented as an immutable data-structure, we cannot directly modify it. Changing state in the program requires dispatching an action that modifies a copy of the state.

TODO: refactor simple increment and decrement to have a store

### Action

The action is the simplest of new terms. Actions are simply a JavaScript object that describes what change is being made and contains any data relative to the change.

```js
{
  type: 'ADD_TODO',
  todo: 'Learn Redux'
}
```

The only requirement of these actions is that it must be an object with at `type` that is a string.  Any additional key/value pairs are completely optional.

These actions feed new data into our store, and are typically created inside of an action creator.

### Action Creator

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

#### CFU: When I say that a reducer is a PURE function, what do I mean?

The reducer will always take the **previous state** and the **action** that was dispatched and will always return a brand new state. The body of the function is a switch statement that looks at the `type` property in the action.  Each `case` in the switch statement will be a `type` that the reducer is listening for.  If there is a match, the reducer will return a brand new object or array for the state object.

In order to most effectively use the reducer it's important to make sure that you always return a BRAND NEW object or array.

```js
import React, { Component } from 'react';

const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

class Counter extends Component {
  state = counter(undefined, {});

  dispatch(action) {
    this.setState(prevState => counter(prevState, action));
  }

  increment = () => {
    this.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.dispatch({ type: 'DECREMENT' });
  };

  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}
// Source Dan Abramov
```

### Redux as a library

Redux the library is surprisingly small.  It just takes the ideas that we talked about earlier and implements them in an easy to use npm package.  The core logic can be written out in just about 200 lines of code.  The purpose of the Redux library is to set up and manage the store and get it connected to the reducer.  While Redux is most commonly used as a tool with React, it is actually library/framework agnostic.  It's possible to use Redux with Angular, Vue, hyperapp, choo, and all sorts of different libraries.

In order to help us connect Redux to our React application, we will be using a library called `react-redux`. This will allow us to select components that can emit action creator functions and update when the state is changed.

### Do I Need Redux?

Before we start building something with Redux, it's important to evaluate whether or not we will benefit from introducing another tool.  This is a habit that will become more and more important to you grow as a developer. There are hundreds of thousands of libraries available on NPM, some will help you get work done more efficiently, others will not.  Being a professional means knowing the right tools for the job.

Redux is not a tool you want to use in every scenario.  Redux requires you to make changes to multiple files for every simple change. Do you want to edit 3-4 files just to handle an `onClick` method?  Weigh the pros vs the cons with implementing a tool like Redux.

If you expect to build an app with multiple routes that share state in many places, you may want to consider Redux.  If your application is just going to be a few components all on one page, you may not need to introduce this additional complexity.

### Building a React/Redux Application

The biggest drawback to React and Redux is that it adds a couple extra steps to the development process.  While this is annoying when creating a brand new application, it is beneficial in the long run since it allows us to ignore the constraints of unidirectional data flow.

> "Earlier frameworks made building Todo apps simple but real apps hard. But React/Redux make building Todo apps hard but real productions apps simple."

We're going to build a very simple Redux app, but focus in on the boiler plate of setting up the app and dispatching the actions.

When building a React/Redux app, there are a few important methods that you need to be familiar with.

#### createStore
`createStore` is a method coming from the `redux` package that sets up your single source of truth in the application.  `createStore` is usually called at the highest level of your app and has one required argument, the reducer for your application. Additionally, we can pass in redux middleware to help with logging and add additional features. (Remember this from express?)

```js
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // This is required to use the Redux Dev Tools
)
```

#### Provider
`Provider` is a component created by the `react-redux` package. It is simply a wrapper that allows you to connect your Redux logic to your React layouts.

#### combineReducers
`combineReducers` is another package from `redux`.  It allows us to write multiple separate reducers and then combine it into one giant state object when the page is loaded.

```js

const reducer = combineReducers({
  todos: todoReducer,
  visibility: visibilityReducer
})

```

#### connect
`connect` is a **higher-order component** that comes from `react-redux`. When we connect a component to Redux, we use the `connect` method to define what parts of state and what actions the component should worry about.  `connect` takes 2 arguments which are commonly referred to as `mapStateToProps` and `mapDispatchToProps`

```js
  export default connect(mapStateToProps, mapDispatchToProps)(ComponentName)
```

#### mapStateToProps
When connecting a React component to a Redux store, the first argument in the `connect` function is `mapStateToProps`.  This function will allow you as a developer to define what parts of state this component cares about.  This is really beneficial because it means that the component will only update when certain parts of state are updated. The return value gets applied to the `props` of the component that has been connected here.

```js
const mapStateToProps = (stateFromReduxReducer) => {
  return {
    smallerPartOfState: stateFromReduxReducer.smallerPartOfState
  }
}
```

#### mapDispatchToProps
`mapDispatchToProps` has a similar job to `mapStateToProps` except we apply action creators to props instead of parts of state.  There are two ways to write `mapDispatchToProps`

** function **
```js
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}
```
This function creates a method called `onTodoClick` and applies it to the props object of the component.  This action will dispatch the `toggleTodo` action creator. Redux also allows you to write `mapDispatchToProps` as a destrucured object, which makes it look a LOT simpler

**destructured object**

```js
export default connect(null, { showAll, showCompleted, showCurrent })(VisibilityFilter)
```

In this example, our React component gets `showAll`, `showCompleted`, and `showCurrent` as methods on their props which triggers the action creator of the same name


### Todo List Redux

<!-- Local state implemented everywhere
  How do we pass this around to other components?
  How do we effectively log and test that these actions get created properly?
  What steps would we need to take to add a Delete Button
  What about if we wanted to add buttons for visibility? Show completed, incomplete, all?
 -->
## React Review, why do we need to think about state, Unidirectional dataflow

## Defining State as it applies to front end and back end development

## The need of state management libraries as opposed to working in local scope.

## Introduce the Flux pattern at a very very very high level

## Review principles of Functional Programming and ES6 tools that will allow us to write pure functions.

## Show Abramov simple implementation of a single state store

## History lesson of React -> Flux -> dozens of flux implementations -> redux

## Reasons behind it's creation

## Why Redux specifically took off.

## Introduce new concepts of Reducer, Store, Actions, and Action Creators

## Don't Implement React YET

## Why You Might Not Need Redux

## Why we are going to use Redux to help our React Applications

## Benefits of React

## Further Reading:

<!-- * [Introducing JSX](https://facebook.github.io/react/docs/introducing-jsx.html)
* [Lists and Keys](https://facebook.github.io/react/docs/lists-and-keys.html)
* [JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html)
* [Different Ways to Add If/Else in JSX](http://devnacho.com/2016/02/15/different-ways-to-add-if-else-statements-in-JSX/) -->
