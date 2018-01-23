# Love and Conflict

## Did you know...?

...that the ["L-O-V-E" song](https://en.wikipedia.org/wiki/L-O-V-E) was originally written in 1965 as the content for a webpage, using Git for version control?

Kidding... Kidding... but if it was it would be written kinda like this!

We're going to re-enact the composition of this historic song by following the writer, Milt Gabler, step by step through his process of writing the song.

## 1. First, Milt set up a working directory

Enter these commands to create a folder for your page, initialize Git inside it, and create a blank HTML file.

```sh
$ mkdir love_song
$ cd love_song
$ code .
$ git init
```

- `git init`: Turns a folder into a repository. Also creates a `master` branch.

## 2. Then, he created the main HTML file for his webpage

```sh
$ touch index.html
```

Add this boilerplate HTML to `index.html` using VSCode.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Love Song</h1>
    <p>By Milt Gabler</p>
  </body>
</html>
```

Finally, add and commit your work.

```sh
$ git add index.html
$ git commit -m "Initial commit"
```

- `git add`: Tells Git, "Hey, I want you to record the changes I made to this file"
- `git commit`: Tells Git, "Hey, actually record those changes now"

## 3. Then, Milt decided to work on his lyrics first

That is: he decided to focus on the HTML, rather than making the page look pretty with CSS. That came later.

Milt planned on trying out different variations of the lyrics to find what he liked best. He wanted it to be easy to get back to the boilerplate HTML every time he started a new variation.

So, Milt created a branch for working on lyrics.

```sh
$ git branch wip-lyrics
```

- `git branch`: Creates a new branch

That way he could make commits, but they would only be on that branch -- it would leave the `master` branch alone. To get back to the boilerplate HTML, he could just go back to the `master` branch.

Having made the new branch, Milt switched over to (or "checked out") that branch.

```
$ git checkout wip-lyrics
```

- `git checkout`: Switches over to another branch

## 4. Milt added the first line of the L-O-V-E song to his HTML

> Replace the contents of index.html with this. Again, I recommend copying and pasting -- only 3 lines are actually changing, but the Git stuff is the important part of this lesson, not the HTML. 

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Love Song</h1>
    <p>By Milt Gabler</p>
    <ul>
      <li><dfn>L</dfn> is for the way you look at me.</li>
    </ul>
  </body>
</html>
```

He felt this was good progress, so he made a commit.

```sh
$ git add index.html
$ git commit -m "Solid first line"
```

## 5. Milt merged the new line of the song into his `master` branch

Milt was so happy with that first line that he decided to go ahead and add it to the `master` branch of his site.

So, he switched over (or "checked out") the `master` branch:

```sh
$ git checkout master
```

...and "merged" in the changes he made to the lyrics branch.

```sh
$ git merge wip-lyrics
```

- `git merge`: To the *current* branch, adds all the commits that were made to *another* branch, from the point in time where the *other* branch split off from the *current* branch. Putting it another way: pulls in all the changes made to the *other* branch.

## 6. A little burned out from writing so many lyrics, Milt decided to work on CSS

Still wanting to leave his `master` branch as the "good" current version of his webpage, and wanting to leave the `lyrics` branch for experimenting with lyrics, Milt made and switched over to a branch for CSS:

```sh
$ git branch wip-css
$ git checkout wip-css
$ touch styles.css
```

...and he wrote some cutting-edge CSS:

> In styles.css:

```css
body{
  text-align:center;
}
```

> In index.html:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Love Song</h1>
    <p>By Milt Gabler</p>
    <ul>
      <li><dfn>L</dfn> is for the way you look at me.</li>
    </ul>
  </body>
</html>
```

```sh
$ git add .
$ git commit -m "Added stylesheet"
```

## 7. Milt merged in the CSS he'd just written

```sh
$ git checkout master
$ git merge wip-css
```

## 8. Milt went back to working on lyrics

He noticed that the `<title>` was "My Page", which wasn't very descriptive, so he changed the `<title>` to the name of his song -- "Love Song" -- which was much more descriptive.

```sh
$ git checkout wip-lyrics
```

> In index.html:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Love Song</title>
  </head>
  <body>
    <h1>Love Song</h1>
    <p>By Milt Gabler</p>
    <ul>
      <li><dfn>L</dfn> is for the way you look at me.</li>
    </ul>
  </body>
</html>
```

```sh
$ git add .
$ git commit -m "Fixed title"
```

## 9. Then, he added another line of lyrics

> In index.html:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Love Song</title>
  </head>
  <body>
    <h1>Love Song</h1>
    <p>By Milt Gabler</p>
    <ul>
      <li><dfn>L</dfn> is for the way you look at me.</li>
      <li><dfn>O</dfn> is for the only one I see.</li>
    </ul>
  </body>
</html>
```

```sh
$ git add .
$ git commit -m "Added second line"
```

## 10. Milt was happy with his new lyrics, and decided to merge them in to `master`

```sh
$ git checkout master
$ git merge wip-lyrics
```

## 11. ...and he ran into a merge conflict 

Suddenly he got this error:

```text
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

In a panic, he looked at his `index.html` and saw this:

```html
  <head>
<<<<<<< HEAD
    <title>My Page</title>
    <link rel="stylesheet" href="styles.css" />
=======
    <title>Love Song</title>
>>>>>>> wip-lyrics
  </head>
```

-----

## What's a merge conflict?

A **merge conflict** occurs when the commits you're merging in from *another* branch include changes to a line (or code immediately before or after a line) that was also changed in the *current* branch.

The problem is two commits are trying to make changes in the same place, and Git doesn't know which commit has the changes you want to keep.

So it adds these weird `<<<` and `===` lines to show you the conflicting changes from the two different branches. ("HEAD" is the branch you're on now.)

### To fix a merge conflict

Simply remove the lines you don't want to keep in your commit history. You don't want to keep the `<<<` and `===` lines so remove those too!

-----

## 13. Milt resolved the merge conflict by removing the lines he didn't want

> In index.html:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Love Song</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Love Song</h1>
    <p>By Milt Gabler</p>
    <ul>
      <li><dfn>L</dfn> is for the way you look at me.</li>
      <li><dfn>O</dfn> is for the only one I see.</li>
    </ul>
  </body>
</html>
```

Then he made a commit to "lock in" the merge he was attempting to make.

```sh
$ git add .
$ git commit -m "Merging CSS and changes to lyrics"
```

## 14. Milt decided to add the rest of the lyrics

They came to him in a flash of inspiration.

```sh
$ git checkout wip-lyrics
```

> In index.html:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Love Song</title>
  </head>
  <body>
    <h1>Love Song</h1>
    <p>By Milt Gabler</p>
    <ul>
      <li><dfn>L</dfn> is for the way you look at me.</li>
      <li><dfn>O</dfn> is for the only one I see.</li>
      <li><dfn>V</dfn> is very very extraordinary.</li>
      <li><dfn>E</dfn> is even more than anyone that you adore can.</li>
    </ul>
  </body>
</html>
```

```sh
$ git add .
$ git commit -m "Finished first verse"
```

## 15. He also had some great ideas for changes to make to his CSS

He was so excited he didn't even bother merging his lyrics changes into `master` first.

```sh
$ git checkout wip-css
```

> In styles.css:

```css
body{
  text-align:center;
  font-family:"Comic Sans MS";
}
```

```sh
$ git add .
$ git commit -m "Added some very Web2.0 fonts"
```

## 16. Finally, Milt decided to merge in his HTML and CSS changes

When you `git merge` and there aren't merge conflicts, Atom (or whichever default text edtior you have) will open and ask you what you want your commit message to be.

You don't need to do anything -- you can literally just save and quit Atom.

```sh
$ git checkout master
$ git merge wip-css
$ git merge wip-lyrics
```

There were no merge conflicts here because the changes made to `wip-css` and `wip-lyrics` didn't overlap at all.

## 17. Milt felt his webpage was finished, so he deleted the experimentation branches

```sh
$ git branch -d wip-css
$ git branch -d wip-lyrics
```

- `git branch -d`: Deletes a branch.

# To Recap

- `git init`: Turns a folder into a repository, and creates a `master` branch
- `git add`: Tells Git, "Hey, I want you to record the changes I made to this file"
- `git commit`: Tells Git, "Hey, actually record those changes now"
- `git branch`: Creates a new branch
- `git checkout`: Switches over to another branch
- `git merge`: Merges into the current branch the changes from another branch
- `git branch -d`: Deletes a branch

### To resolve a merge conflict

Just delete the lines you don't want (including the `<<<<<<`, `======`, and `>>>>>>` lines), add, and commit.