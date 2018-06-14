---
title: The React Component Lifecycle 
type: lesson
duration: "1:25"
creator:
    name: Jamie King
    city: ATL
competencies: Front-end frameworks
---
 
# React Component Lifecycle

### Objectives
*After this lesson, students will be able to:*

- Have a deeper understanding of mounting, unmounting, and updating React components.
- Understand where to place async calls during the React lifecycle.

### React Component Lifecycle

When building a React application, EVERYTHING is a component.  In React, we usually create a component by extending the `React.Component` method.  When we extend the `Component` class, we gain the methods that allow us to build a stateful component.  So far, we've only been working with the `render` method, but there are several other functions we have access to when building React apps.  These methods get executed every time a component is mounted, updated, or unmounted.

**NOTE** Remember that this only applies to `stateful` components, these methods are not available in `stateless` (aka `dumb`) components.

![React Lifecycle Methods](./ReactLifecycleMethods.jpeg?raw=true "React Lifecycle Methods")

_[React Component Docs!](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)_

#### Lifecycles

A React component has 3 separate lifecycles.  A lifecycle is a series of methods that prepare the component to be updated in the DOM. These methods are **Mounting**, **Updating**, and **Upmounting**.

#### Mounting
When a component is rendered on screen for the first time, there are several methods that are called before, during, and after the component is rendered.



**`render()`**: The `render()` method is the only lifecycle method that is required to be called in **every** component. In the render function, you return the JSX that you want to render on the page. **NOTE**: You should NEVER make API calls from within the render method. (This is why we make our API calls in `componentDidMount`) 


**`componentDidMount()`**: This is invoked immediately after a component is mounted and available within the DOM, and allows you to execute code once the component is available and visible on the client's screen.  We will be using this method to start API calls with our server.


#### Updating State and Props
The mounting lifecycle only takes place when the component is initially being rendered.  Any modifications that happen afterward go through the update lifecycle methods.  Let's quickly go over these.

**`render()`**: The same `render` method from mounting also gets called whenever doing an update.

**`componentDidUpdate()`**.  Allows you to executes functions after the DOM has been updated.


#### Unmounting

**`componentWillUnmount()`**: There is only one method that gets called whenever you unmount a component.  `componentWillUnmount` is useful for performing certain cleanup tasks. (i.e. canceling network requests and invalidating timers)

## Further Reading:

* [React Component Lifecycle by A. Sharif](http://busypeoples.github.io/post/react-component-lifecycle/)
* [Facebook React Docs](https://facebook.github.io/react/docs/react-component.html)
* [State and Lifecycles](https://facebook.github.io/react/docs/state-and-lifecycle.html)
