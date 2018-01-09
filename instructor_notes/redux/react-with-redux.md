---
title: React With Redux
type: lesson
duration: "2:00"
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
2. What are the 3 principles of Redux.  Give a short explanation for each.
3. What is a **pure** function.
4. Define **store**, **action**, and **reducer**

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

Additionally, go ahead and download the [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)


The Relationship Between React and Redux 2:30
	10 min

Codealong: Todo App 
	- I do (prior to class): Set up of basic react app 
	- We do: Add Redux boiler plate 2:40
		- 30-40 mins
		- Make sure to introduce each concept individually
	- We do: Add functionality 3:20
		- 60 mins
		- ADD_TODO
		- TOGGLE_TODO
		- Visibility Features
	- You do: Add features 4:20
		- Remainder of Class
		- Add an author to each todo app
		- Add edit functionality
		- Add ability to delete a todo (different than completed


## Codealong? Maybe only in afternoon

## Talk about When to use Redux article

## Focus more on the setup of Redux with React rather than the conceptual. This can serve as a refresher of concepts.

## Install Redux Dev Tools and show off time travel 

## Examples of pure functions vs impure functions

## Further Reading:

<!-- * [Introducing JSX](https://facebook.github.io/react/docs/introducing-jsx.html)
* [Lists and Keys](https://facebook.github.io/react/docs/lists-and-keys.html)
* [JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html)
* [Different Ways to Add If/Else in JSX](http://devnacho.com/2016/02/15/different-ways-to-add-if-else-statements-in-JSX/) -->
