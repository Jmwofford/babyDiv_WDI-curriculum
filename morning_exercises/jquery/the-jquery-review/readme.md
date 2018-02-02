# JS Review

This review exercise is built around accessing data contained in various data structures, and then taking that data and writing to the DOM using jQuery.

This morning you will be using multiple existing arrays to apply information to the DOM using jQuery. 

# Instructions

Clone down this repository. Your job is to write code in `js/script.js` that accomplishes the tasks listed below. Do not modify any other file... though you may find it useful to study the contents of `index.html`.

## Writing the Staff Members to the DOM

The goal of this section is show how to get data from a JavaScript data-structure and place that onto a specific place on the **DOM** (document object model), using jQuery.

- Populate the Header with Staff Member Names
  - For testing purposes, `console.log()` each element in the `staff` array in `js/script.js` using a for-loop.
    - `$ open index.html`, refresh in browser, and then open the console (`CMD+OPT+J`) to check your work.
  - Next, use the jQuery function `$()` to create `<span>` tags inside the `<header>` that is directly in the `<main>` tag. The text of each `<span></span>` should be each item in the `staff` array, respectively.
    > In the for loop you just wrote, do the following:

    - Use **the** jQuery function `$()` to create a new `<span>` (refer back to [here](https://git.generalassemb.ly/atl-wdi/wdi-curriculum/blob/master/instructor_notes/jQuery/intro-to-jQuery.md#appending-a-dom-element-to-a-web-page) if you need a refresh), then store the newly created element in a variable (`$newSpan` would be a good variable name).
    - Change `$newSpan`'s text to equal the current staff member being iterated over in the for-loop, using `.text()`. The current staff member in the array that the loop is iterating over will be passed in as an argument to `.text()`.
    - Use `$()` to select the `<header>` directly inside of `<main>`, then store this in a variable (named `$mainHeader`, for example).
    - Append the new spans to `$mainHeader` using `.append()`. You'll have to pass in the newSpan as an argument to `.append()`.

  The end result should be 6 `<span>`s inside the main header, where there is one name from the `staff` array in each `<span>`.


## Populating Article Content

- Populating Content for the First Article
  - Create a new paragraph element using `$()` and store it in a variable (let's say `$newPara`). Change the text (using `.text()`) of `$newPara` to equal the value of the `text` property of the first object in the javascript array `articles` and ***append*** it to the `<section>` inside of the first `<article>`.
  > Breaking it down

    - Use `$()` to select all the articles, but then use `.eq()` to target the first article. Finally, store this reference to the first article in a variable.
    - Get the first item in the articles array. This item is an object with text property. Store this text property of the first object in the `articles` array in a variable.

  - In the first `<article>`, set the text of the `<h3>` inside `<header>` to the `title` from the first object in `articles`.

  - Modify the `byline` property of the first `articles` by concatenating it with the 1st value in `staff`.

  - Take the new value of the `byline` property and add it to the text of the `<header>` within the first `<article>`.

  - Add an `editor` property to the first object in `articles` and give it the value of the 2nd item in the `staff` array.

  - Create and ***append*** a `<span>` inside the `<header>` of the first `<article>`, where the new `<span>`'s text is the value of the `editor` property you just created.

  - Render the image, from the `body` property of the first object in `articles`, to the `<figure>` element in the first `<article>`.

- Using a for-loop to populate content for each article

  - Adapt the code you wrote in the previous section to work with a for loop that iterates over the objects in `articles`.

- Hovering the cursor over a paragraph changes its background color to lightGrey. When the mouse exits the paragraph, the color should revert back to its previous value.
  - Store the default background-color value in a variable.
  - Change the background color to light grey when the mouse hovers over the paragraph.
  - Determine the event that corresponds to the mouse exiting the area of a DOM element.
  - Add event listeners to listen for this type of event, and have the background color revert to its default value when this event occurs.

## Bonuses

- Use jQuery animate to have the staff names slide and fade into view. Check out [http://api.jquery.com/animate/](http://api.jquery.com/animate/)

- Add infinite scroll by re-appending the articles when the user scrolls to a certain point near the bottom.

## Hints

> Use ES6 string templating to build HTML strings.  You gain the benefit of multi-line strings, as well as the ability to inject variables into the template using `${}`
```js
const someHtml = `
  <div class="from-js>
    <h1>${someObject.title}</h1>
    <h3>${someObject.subtitle}</h3>  
    <p >${someObject.description}</p>
  </div>
`
```

> Write a little bit of code, and then test it--work methodically.

> use $ in variable names that refer to jQuery objects/collections (this is a recommended convention, and will not have an impact on code function).

```js
var $body = $("body");
```

>  Store references to each part of the DOM you need to interact with. Example:

```js
var $paragraphs = $("p");
var $smallestHeaders = $("h6");   
```
