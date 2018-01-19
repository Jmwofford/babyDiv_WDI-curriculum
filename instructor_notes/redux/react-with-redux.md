---
title: React With Redux
type: lesson
duration: "6:00"
creator:
    name: Jamie King
    city: ATL
competencies: Front-End Frameworks
---

# Using Redux in React

### Objectives

*After this lesson, students will be able to:*

- Use the `react-redux` library to connect a Redux store to a React Application
- Demonstrate the directory structure of a React/Redux app
- Wrap `mapStateToProps` and `mapDispatchToProps` to React components.
- Complete common user interactions using React/Redux

### Preparation

*Before this lesson, students should already be able to:*

- Explain the following Redux terms: store, action, reducer
- Build a React application using `create-react-app`

## Redux Reviewed

So far, we have talked about Redux as an abstract pattern that allows us to extract our data into something called a store and change that store through dispatching actions.

### You Do: 10-20 min

Individually, answer the following questions.  Feel free to look at the [previous lesson](./state-management-and-intro-to-redux.md) to answer these questions.

1. What problem does Redux solve?
1. What are the 3 principles of Redux.  Give a short explanation for each.
1. What is a **pure** function.
1. Define **store**, **action**, and **reducer**

## Combining React and Redux

The code behind the Redux library is surprisingly small. The core logic that sets up the store and the ability to dispatch actions is only around 200 lines of code.  That's because the Redux library is only meant to set up and manage the store and connect it to the reducer.  The Redux library is actually library agnostic.  While it is most common in React, you can use Redux with Angular, Vue, hyperapp, choo, and all sorts of different libraries (or no libraries at all!)

## Do I Need Redux?

Before we start building something with Redux, it's important to evaluate whether or not we will benefit from introducing another tool.  This is a habit that will become more and more important to you grow as a developer. There are hundreds of thousands of libraries available on NPM, some will help you get work done more efficiently, others will not.  Being a professional means knowing the right tools for the job.

Redux is not a tool you want to use in every scenario.  Redux requires you to make changes to multiple files for every simple change. Do you want to edit 3-4 files just to handle an `onClick` method?  Weigh the pros vs the cons with implementing a tool like Redux.

If you expect to build an app with multiple routes that share state in many places, you may want to consider Redux.  If your application is just going to be a few components all on one page, you may not need to introduce this additional complexity.

### Building a React/Redux Application

The biggest drawback to React/Redux other than learning the new terminology is that it adds a few extra steps to the development process.  In the long run, this can be beneficial since it helps easily scale an application by removing the constraints of unidirectional data flow.

> "Earlier frameworks made building Todo apps simple but real apps hard. But React/Redux make building Todo apps hard but real productions apps simple."

Today we are going to build a basic to-do application, but focus in on the boilerplate to set-up a Redux app and introduce some of the terminology we will be using when utilizing the `react-redux` library.

### We Do: Clone the starter code and download the Redux Dev Tools

For the sake of time, we are going to start out with some of our code already completed.  [Redux Todo List](https://git.generalassemb.ly/jamieking/redux-todo-list) is an app with a few components already set up for you.  Clone this repo and start to review the code we have in here currently. Is there anything that doesn't look familiar to you?

Additionally, go ahead and download the [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).  We are going to be using this tool often to track the state changes in our app.

### You Do

This current application has some state in the `Todos.js` and some state in `TodoForm.js`, but they are currently not functioning because they have to share state.

Think about how would you solve this problem using only React? Feel free to checkout into another branch and try to refactor the code to add todos from the input field.

### Do we need Redux here?

Again, this is always an important question to ask when you are looking to add more libraries and tools to an application.  In the case of this application, if we were ONLY building a simple todo app like we're doing today, I would personally choose not to use Redux.  However, if we continued to work on the application and expected it to become more complex in both features and scope, then Redux would be a valuable too.  In any case, this exercise will allow us to become more familiar with how to set up Redux in a React application and how to implement new features.

### Let's Get Started

With the current state of our app, it is impossible for the `Todos` and `TodoForm` without hoisting the state of each component up to the `App` level or restructuring the structure of the React component tree.  Instead, we can connect these components to an outside state management library like Redux which will handle updating state for us.


#### Codealong: Adding the Redux boilerplate

1. **Install Dependencies** We'll start by installing the two libraries necessary to introduce Redux into our app.

```bash
npm i redux react-redux
```

2. **Add New Files and Directories**: In order to handle the addition of *stores*, *reducers*, and *action creators*, we need to create a few new files and directories. Add the following folders and directories to the project.
  - in `src`, add 2 directories called `actions` and `reducers`
  - Within `reducers`, add a file called `index.js`
  - Within `actions`, add a file called `todo.actions.js`
  - In the `src` add a file called `configureStore.js`

3. **Add the Provider Component**:  Now that we have our files and directories sorted, let's start integrating `redux` and `react-redux` into our application.  The starting point for this integration is the `Provider` component that is built into `react-redux`.  This component gets wrapped around your entire application and takes a single prop called `store`.  This does most of the work linking React and Redux together. We'll create this store in just a moment. Add the `Provider` in the `index.js` file. Let's also import our `configureStore` file which will handle the set up of our Redux store. (We'll do this in the next step)

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))

registerServiceWorker()
```

4. **Set Up The Redux Store**: The function we created earlier called `configureStore` is going to hold the logic that connects our store to our reducers and any additional middleware (more on that tomorrow)

For now, the only middleware we want to add is the Redux Devtools Extension.  If you take a look at the docs, it will show you how to quickly and easily and the dev tools to a Redux store.

Additionally, we will import the reducers we will make soon.  Notice here that our import path is only `./reducers` instead of `./reducers/index`.  This is just a small shortcut that you can take with JavaScript.  If no file name is given, JavaScript will just use the file within the directory called `index`

```js

import { createStore } from 'redux'
import reducer from './reducers'

function configureStore () {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  return store
}

export default configureStore

```

5. **Building The Index Reducer**: Considering that our application may scale up to be really really large, it's easy to imagine that we will eventually have an **enormous** state object and a reducer with dozens or even hundreds of cases for updating our state.  This does not sound very pleasant, so Redux provides a great method called `combineReducers` that will allow us to write a lot of smaller, more specific reducers that get combined for you when the page loads.  Our `./reducers/index.js` file will hold that method and connect all the various reducers we will build over the lifespan or our application.  For now, we can just add create a file called `todosReducer.js` and bring it into our index.

```js
import { combineReducers } from 'redux'
import todos from './todosReducer'

// Combine all our reducers together
const rootReducer = combineReducers({
  todos
})

export default rootReducer
```

6. **Creating The Todo Reducer**: This is the file that will actually contain the reducers that we saw earlier in class.  Here we will set our default argument to the list of todos in the Todos component, and only provide the default action for our switch statement for now.

```js
const defaultState = [
  {
    id: 0,
    task: 'Test this Todo Page',
    completed: false
  },
  {
    id: 1,
    task: 'Learn Redux',
    completed: false
  },
  {
    id: 2,
    task: 'Learn React',
    completed: true
  }
]

function todos (state = defaultState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default todos
```

**CHECKPOINT** We have now completed the boiler plate for our Redux app. It was a lot of set up, but now we can leverage the full power of Redux!!

From here we can open up the Redux Dev tools and see our state object.  Our next step is to start building our actions to update the store and connecting that to Redux.

7. **Connect Redux Todos to React App**: Let's use our Redux store to replace the local state within `Todos` with the global state that we've placed within our todo reducer. In order to do this, we will need to bring in another method from the `react-redux` library called `connect`.  `connect` is a method that you wrap around your entire component as well as two additional functions that dictate what parts of your Redux state and actions you want to add to the component.  These functions are commonly known as `mapStateToProps` and `mapDispatchToProps`.  For now, we will just connect our Redux state to the component.

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Todos extends Component {
  render () {
    return (
      <div>
        <ul>
          {this.props.todos.map(todo => (
            <li key={todo.id}>{todo.task}: {todo.completed.toString()}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(Todos)
```

8. **Create an Add Todo Action**: So far we are only have a static global state, which is impossible to update.  In order to update it, we will need to do a few things.  Our first step for adding updates is to build an action creator that will dispatch a new todo. Remember that actions are require a `type` in order for reducers to pick up any pending changes.

```js
// ./actions/todoActions
export function addTodo (task) {
  return {
    type: 'ADD_TODO',
    todo: {
      id: Math.floor(Math.random() * 5000), //replace with UUID,
      task: task,
      completed: false
    }
  }
}

```

9. **Add A Case for the Action in the TodoReducer**: The next step is to add a case for 'ADD_TODO' in the todosReducer.  Within the case we need to make sure we return a new state that includes the newest todo coming from our action.

```js
    case 'ADD_TODO':
      return [ ...state, action.todo ]
```

10. **Connect Action to TodoForm**: Finally, let's add our new action to the `TodoForm` component.  Here, we will be using the `connect` method to apply `mapDispatchToProps`.

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/todoActions'

class TodoForm extends Component {
  state = {
    newTodo: ''
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({ newTodo: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addTodo(this.state.newTodo)
    this.setState({ newTodo: '' })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          value={this.state.newTodo}
        />
        <button>Add Todo</button>
      </form>
    )
  }

}

export default connect(null, { addTodo })(TodoForm)

```

**HOLD UP** Why are we using state here?! We are choosing to use local state for this form because it is NEVER going to be referred to outside of this component.  Because of this, it is safe for us to write this in your local state, which is much quicker to accomplish.  This is a really important lesson to learn in Redux.  Keep your user stories in mind when considering using local state.  Redux is not an all or nothing decision.

**HOORAY** We did it! I know it was a lot of steps, but as the application becomes more and more complex, this pattern will allow you to keep your code well organized, easily testable, and independent.

Now we can easily add more functionality to our application through utilizing actions and the reducer.  Let's try to add the ability to click a todo to mark it complete or incomplete.  Even though this simple interaction now requires editing 3 files, we gain the benefit of easily testable code and prevent our individual components from becoming really complicated.  Let's start by building the action we want to dispatch.

```js
export function toggleTodo (id) {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
```

Next up, let's attach the action to the onClick for a ToDo

```js
  <li
    key={todo.id}
    onClick={() => props.toggleTodo(todo.id)} //Why do we wrap this in an arrow function?
  >
    {todo.task}: {todo.completed.toString()}
  </li>
```

Finally, we add a case to our reducer to handle the action being dispatched. In this scenario, we need to clone our state object, then map through the array and change the todo that has the same id as what is given via the action.

```js
...
  case 'TOGGLE_TODO':
    const newState = state.map(todo => {
      if (todo.id === action.id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    return newState
...
```

Voila! That wasn't too bad, right? This process becomes especially easy as you learn more keyboard shortcuts to hop between files.

## Lab - Build Features/Teachback

Now it's time to build out some Redux features on your own! Split into your standup groups and mob program to build out several new features for our todo app.  If you get finished before the time is up, let your instructor know and he/she will give you more features.  At the end of 45 minutes, you will share with the class how you built your feature.

**Features**
- Edit a Todo Item by clicking a button and then filling out a form.
- Delete a Todo Item by clicking a delete button
- Add an input field that filters Todos that don't match the string in the input.
- Add 3 buttons `Show All`, `Show Completed`, and `Show Current` and add onClick attributes to each which will narrow the todos shown in the DOM.
- Add a button called `Clear Completed` that will deleted all completed todos

## Time Pending
  
### Middleware in Redux

Just like Express, Redux has the ability to leverage middleware to enhance the developer experience and clean up your code.  The most common piece of middleware is one we've already seen, the Redux Dev Tools.  There are plenty of other pieces of middleware out there, like `redux-logger` and `thunk`.  You can easily integrate this middleware through the `configureStore` file.  Beware not to go overboard here, else you risk some performance hits.

#### Redux Thunk

You may have seen the term above and made a double take.  What is a `thunk`?!  This really poorly named library simply allows you to make async calls in an action creator, which is impossible to do by default.  A thunk simply returns a new function that dispatches multiple other actions.

```js
function fetchProductsPending () {
  return {
    type: 'FETCH_PRODUCTS_PENDING'
  }
}

function fetchProductsSuccess (products) {
  return {
    type: 'FETCH_PRODUCTS_SUCCESS',
    products
  }
}

function fetchProductsFailure(err) {
  return {
    type: 'FETCH_PRODUCTS_FAILURE',
    err
  }
}

//This is a redux-thunk. Notice it dispatches multiple other actions depending on whether or not the promise resolves or is rejected.
export function fetchProducts () {
  return async dispatch => {
    dispatch(fetchProductsPending())
    try {
      const { data } = await axios.get('./api/products')
      return dispatch(fetchProductsSuccess(data))
    } catch (err){
      dispatch(fetchProductsFailure(err))
    }
  }
}
```

#### Boilerplate

Getting Redux set up by hand is a time consuming task and is close to the same every single time.  For that reason, there are several boilerplates available online.  [Here](https://git.generalassemb.ly/jamieking/redux-boilerplate) is one from GA Atlanta that gets you started with the basics without adding a bunch of features that you don't need right off the bat.

## Further Reading:

* [Redux: Usage with React](https://redux.js.org/docs/basics/UsageWithReact.html)
* [Leveling Up With React: Redux](https://css-tricks.com/learning-react-redux/)
* [Redux and React for Everyone](https://www.youtube.com/watch?v=YSBpKRZViBc)
* [Getting Started with CRA, redux, router, etc](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f)
