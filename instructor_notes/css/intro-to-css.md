
# Intro to CSS

## Learning Objectives

- Describe a CSS rule using selectors, declarations, properties, and values
- Articulate the pros and cons of each type of stylesheet- in the head, external stylesheets and in-line styles

<!-- - Define "cascading" in the context of CSS specificity -->

<!-- - Style the size, color, border, text, and font of all elements of a given tag on a page
- Demonstrate the use of class and ID selectors to target specific element(s)
- Distinguish between block and inline display values
- Identify the components of the box model
- Differentiate between the border-box and content-box values for box-sizing
- Apply knowledge of the box model to adjust spacing between and around elements on a page -->

## Hook: The Power of CSS (5 min / 10:00)

<img src="https://huangxuan.me/css-sucks-2015/attach/joke/css_is_awesome.png" width="300" >

To start this lesson, I want to mosey on over to my favorite website, [GA ATL Instagram](https://www.instagram.com/_gaatlanta/?hl=en). It's pretty great. It's pretty fancy. But what would it be without CSS? Take 1 minute to talk with the people around you about how this wonder of the modern web would look different without CSS, and how that would impact your interactions with the site.

**Exercise** (1min) Share some ideas, then download the chrome dev tool- [Web Developer](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=en-US), and click on the option to mute the stylesheets. Discuss anything that surprises you.

CSS is powerful. There is such a wide breadth of things to learn about CSS and you could probably spend a whole 12-weeks just learning its capabilities, nuances, and subtleties. 

The goal of this class isn't to do a rundown of every possible CSS selector and trick, but to have you guys walk away with a solid foundation of how to professionally style and present your sites and applications. As you use it consistently you realize that, while sometimes frustrating, CSS provides a powerful toolkit for making your UI more usable, marketable, and generally awesome!  It helps keep your users coming back.  

> Fist to Five: How confident are you about CSS? Five is, "Move over, I could teach this class myself". One is more like, "C-what-what, now?"

## In-line vs head vs external stylesheets (20 min)

You are welcome to code along, but it may be better just to follow along for the first bit. 

At the crux of it all, the primary concept behind CSS is to select an HTML element and then do something to it. 

Here are just a few things you can do with CSS
- Move HTML elements around the page.
- Make HTML elements larger or smaller.
- Change font types, colors, and size.
- Create layouts that dynamically change based on devise size.
- Animate elements on the page.

We will touch on all of these things over the next couple days.  There are hundreds of CSS selectors/properties out there, so we don't expect you to memorize all of these.  Use tools like the [MDN CSS Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference), [CSS Almanac](https://css-tricks.com/almanac/), and [Codepen](https://codepen.io/pens/) to help you practice and improve your CSS skills.


Let's throw some dummy content into HTML inside of an `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Intro to CSS!</title>
  </head>
  <body>
    <h1>Welcome to the world of CSS!</h1>
    <p>Flannel tote bag Shoreditch hashtag. Austin scenester letterpress, gastropub Intelligentsia cardigan bespoke polaroid tofu single-origin coffee listicle stumptown swag distillery. Cred actually beard, master cleanse sartorial four dollar toast typewriter lo-fi tilde Etsy try-hard. Swag plaid mlkshk, twee typewriter ennui blog butcher lumbersexual taxidermy Bushwick 90's sartorial fingerstache. Wes Anderson Thundercats fashion axe ethical, put a bird on it bitters leggings umami American Apparel Helvetica. Paleo PBR Vice kale chips High Life fap. McSweeney's Schlitz vinyl, put a bird on it taxidermy Carles cronut Marfa Etsy kale chips Bushwick selfies.</p>
    <!-- /*http://hipsum.co -->
  </body>
</html>
```

*Whiteboard definitions as they come up*

### Inline Styles

So one way that we can style elements in HTML is in the tag itself. These are called **inline-styles**:

```html
<p style="background: turquoise;"></p>
```

### Exercise (2 min)
Take a two minutes and chat with your partner about why this particular way of styling an element might not be the greatest approach? See if you can think of some specific scenarios when using inline styles would be a disadvantage...

### Don't Use Inline Styles!!

Don't use inline styles if you can avoid it. They are very specific and they make it extremely difficult to manage as your program gets larger! 

### Styles in the head tag

The next approach to implementing a style is to put the styling in the `<head>` tag:

```html
<head>
  <title>CSS!</title>
  <style>
    p {
      background: turquoise;
    }
  </style>
</head>
```

You have seen this before, but I want to highlight some syntax here. From p until the ending curly brace is a **CSS rule**. The p in this code is what's called the **selector**. The background in the code is the **property**. Finally blue is the **value**.

This is a little bit better than inline styles. But I feel kind of weird about this one, too. Why might that be?

What happens if you have both styles in the head *and* inline styles? Which style will be applied? Why is this?

### External Stylesheets

What is the best way to add CSS to your page? External stylesheets! Let's create a new file called `styles.css`:

```bash
$ touch styles.css
```

In our `index.html` let's go ahead and link to that stylesheet in the `<head>` tag:

```html
<head>
  <title>CSS!</title>
  <link rel='stylesheet' href='styles.css'>
</head>
```

In `styles.css`:

```css
p {
  background: turquoise;
}
```

Ahh, that is much better. You might be asking yourself, "Self? Isn't this a lot more work?" And you might be right initially. But we're talking about 1 `<p>` right now. What if we're talking about 100 `<p>`'s and now those elements were spread across multiple web pages. Now all of a sudden this last method is a lot less work.  Instead of writing the styles over and over again on each web page, we can link them all to the same stylesheet, and have them look the same.  

External stylesheets help keep your CSS dry (avoid duplicate styles), easier to maintain and allows you to make site-wide changes in one place. 

### Separation of Concerns

The other big advantage of the external stylesheet approach is that it preserves your Separation of Concerns. It is possible to style web pages using HTML alone. We did this in the 90s/early 2000s using mostly images and table borders. CSS allows us to separate the styles of our website/app from the content and behavior:

- HTML
  - Content
- CSS
  - Styles
- JS
  - Behavior

## Why CSS

As stated before, CSS is important for every webpage.  It controls the look and feel of your site.  It can catch your user's attention and keep them coming back for more.  Sites ultimately live and die for multiple reasons, but good CSS is a huge factor.   


<!-- ## CSS Selectors (15 min)

As you can see, there is more than one place to target elements. There are also multiple WAYS you can target elements. Let's throw some additional content into the  `index.html`:

```html
<body>
  <h1>Hello world!</h1>
  <p>This is some fake dummy content. It doesn't matter what it is! Whatever you want! Smelly fish create beautiful works of art in order to achieve world peace.</p>
  <p class="red">This paragraph tag element has a class of "red".</p>
  <p class="red" id="green">This paragraph tag element has an id of "green".</p>
  <div class="red">This div tag element has a class of "red".</div>
</body>
```

All I did here was add two `<p>` elements and added a class of "red" to both and an id of "green" to the last. Additionally I added a `<div>` element with a class of "red".

The first thing I want to do is make it so that all elements with the class of "red" have a background of red. In our `styles.css`:

```css
.red {
  background: red;
}
```

Awesome, but I think I want just the `<p>` elements with that class name to have a background of red. So in `styles.css`:

```css
p.red {
  background: red;
}
```

Finally to select an element with an id you use `#`. I am going to change the background color of the p element with class of "green" in our `styles.css`:

```css
#green {
  background: green;
}
```

*whiteboard common selectors as well as let them know about references at the bottom of the page*

## CSS Specificity (10 min)
If I change the css selector from `p.red` back to `.red` you'll notice that the paragraph element with the id of green is still green. This is because of CSS Specificity. While CSS cascades from top to bottom. The CSS that is applied depends on Specificity as well. Take the following example:

```css
#green {
  background: green;
}

.red {
  background: blue;
}

.red {
  background: red;
}
```

In this example the elements that have the class red, will ultimately have a background of red even though blue was set first because it takes the last declared property. However, even though the `#green` selector was written first, it has a higher specificity and therefore overides the following background properties.

The following list of selector types is by increasing specificity:

- Universal selectors (e.g., '\*')
- Type selectors (e.g., h1)
- Class selectors (e.g., .example)
- Attributes selectors (e.g., [type="radio"])
- Pseudo-classes (e.g., :hover)
- ID selectors (e.g., #example)
- Inline style (e.g., style="font-weight:bold")

You can read more about CSS specificity [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
You can access a CSS specificty calculator [here](http://specificity.keegan.st)

## The Box Model! (15 min / 10:50)
> One of the tricky things about CSS at first is the Box Model. But it's actually really simple. Let's break it down.

![](https://dl.dropboxusercontent.com/s/capg35hblhr6o7v/Screenshot%202015-10-13%2014.11.39.png?dl=0)

Any HTML element can be considered a box, and so the box model applies to all HTML elements. If you select an element prescribe it a height and width, the content itself will be that height and width.

What the size doesn't include:
- padding
- border
- margin

Let's go into our existing `index.html` and `styles.css` and add some stuff to illustrate what I mean. In `index.html`:

```html
<p>This is a paragraph</p>
<p class="padding">This is a paragraph</p>
```

In `styles.css`:

```css
p {
  background: red;
  height: 100px;
  width: 20%;
}
```

Lets check this out in our chrome browser with the developer tools. As you can see, everything is identical. Which makes sense. Let's go ahead and add some padding to the html element with class "padding". In `styles.css`:

```css
p {
  background: red;
  height: 100px;
  width: 20%;
}

p.padding {
  padding:10px;
}
```

> Well that's certainly interesting. Even though the dimensions are the same. The element with padding is larger.

Let go ahead and add `margin: 10px;` and `border: 10px solid black;` to the padding class as well. Let's inspect that element in the browser and you can see Chrome's clear depiction of content, padding, border and margin.

All these different sizings can be confusing. This can especially be frustrating when you think something's 20 % when in actuality it isn't.  Enter box-sizing.

At the top of our `styles.css`:

```css
* {
  box-sizing: border-box;
}
```

Now when we refresh, all of our 20% widths are the same regardless of padding. It also includes border! However, it does not include the margin.

## CSS Properties and Values (5 min)

Man, there's alot of them. We've seen many just in this lesson thus far. There are far more than I can cover. Additionally, there is just no way to know them all. Unless you are a CSS savant. Fortunately, there are some great references. Here are just a few! -->

## CSS References

- [CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [CSS Tricks - SO GOOD](https://css-tricks.com)
- [Codrops CSS Reference](http://tympanus.net/codrops/css_reference/)
- [30 CSS Selectors You Must Memorize](http://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048)
- [10 CSS3 Properties You Need to be Familiar With](http://code.tutsplus.com/tutorials/10-css3-properties-you-need-to-be-familiar-with--net-16417)
- [A to Z CSS Screencasts](http://www.atozcss.com/)
- [How to Make Your Site Look Half-Decent in Half an Hour](https://24ways.org/2012/how-to-make-your-site-look-half-decent)

<!-- ##BREAK (10 min)

## We do- Wendy G Bite *Code Along* (60 min / 11:20)


$ git clone https://github.com/ga-dc/wendy_bite

I think we can knock out an easy one early on. I can see by looking at that page that the background color and text color are mostly similar. Additionally centering everything and giving it a little bit of a buffer with the padding/border/margin on the edges will be nice. Let's go ahead and change that in `styles.css`:

```css
body{
  background: #444;
  color: #fff;
  border: 5px solid #777;
  margin: 2em auto;
  padding: 2em;

}
```

Alright, just with 5 properties already looking a lot better! I think we can do another quick fix by just centering the text for the header and footer.

```css
header, footer{
  text-align: center;
}
```

I think the default link color is bothering me. Lets ahead and change that and while were at it change the links to bold, they look bold to me:

```css
a {
  color: #66CD9B;
  font-weight: bold;
}
```

I'm digging those lines above and below that main section. Let's go ahead and add that:

```css
section {
  border-color: #ccc;
  border-width: 1px 0;
  border-style: solid;
  /*add padding and margin as necessary*/
}
```

Our words are too close together, lets fix that:

```css
p {
  line-height:1.5;
}
```

Man, this is already looking pretty close! Now just some small things. Theres a tiny border around the image, but its not directly on the image. I also notice that the text in the example isn't butting right up next to the image either. Let's fix all of that!

```css
img {
  border: 1px solid #ccc;
  padding: 5px;
  margin-left: 1em;
  margin-bottom: 1em;
}
```

I think that's pretty good. There's some minor tweaks that can be made. Like font and changing the color for active links. If there's extra time, let's try a document dive... -->

<!-- ## HW
[Hippy Portfolio](https://github.com/ga-dc/hippy-portfolio) -->

<!-- ## Quiz Questions

- What is the difference between `display`'s `block`, `inline-block`, and `inline` values?
- What are the components of the box model and what do we use it for?
- What is specificity? How is it related to class and id selectors?
 -->