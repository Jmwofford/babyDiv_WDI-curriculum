# Test-Driven Development (TDD)

### Lesson Objectives

- Describe Test-Driven Development
- Why should we practice test-driven development?
- Respond to some common concerns about TDD
- Describe the Three Laws of TDD
- Describe some pitfalls to TDD
- Describe Feature tests, integration tests, and unit tests
- Describe the tooling needed

---

### Why TDD?

#### When we touch a piece of code, there is only one guarantee: We will break it. 

We may only break the code for half a second while refactoring, or we may introduce long-living, devious bugs that we'll have to hunt down for months or years of our lives. However these bugs may manifest themselves, we can't possibly fix them without knowing that they are present. Test-driven development is the practice of writing `automated`, `targeted` tests for our code before we write a single line of production code. This practice embraces the inevitability of software bugs, and sets us up to catch these errors as early, often, and effectively as possible.

Aside from the obvious benefit of catching and reducing bugs in our software, TDD brings along with it several other benefits:

- **Speed**: Debugging is a slow (and painful) process. We'll do less debugging if we have fewer bugs.
- **Professionalism**: To paraphrase [Uncle Bob](https://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers/dp/0137081073/ref=sr_1_1?ie=UTF8&qid=1513624455&sr=8-1&keywords=the+clean+coder), we should feel so responsible for our code that we want to write our company a check for every bug we let slip by. TDD allows us to take ownership of our code quality. 
- **Feedback**: TDD is all about setting up feedback loops within the code itself. The code can come alive and tell us at regular intervals whether or not it is healthy.
- **Maintainability**: Fewer bugs means our code is more predictable. More predictable code is easier to change without side-effects.
- **Communication (Documentation)**: It's very easy to let our documentation become out-of-date as we make changes to our code. Tests on the other hand, will fail if they no longer accurately describe the code. Well-written tests can replace almost all need for documentation.
- **Fearlessness**: We'll no longer wait for hidden bugs to jump out and scare us. We can move forward safely, knowing that even the worst bugs will be small and fixable because we've caught them early.
- **Regression-Proofing**: "Regressions" are when good, existing code breaks because of new changes. Because we wrap all of our code in tests, those tests will tell us any time any code breaks, for as long as that code lives. 

### Why doesn't everybody do this?

Anything that provides all of these benefits seems like a no-brainer, but it's not always the norm. There are lot of common questions and concerns that pop up when TDD enters the conversation. Let's listen and respond to a few of them: 

#### "Doesn't it take longer? Now I have to spend time writing tests as well as the code itself. That's at least twice as much work and I'm already facing a deadline!"

Let's start with the (important) assumption that you wouldn't knowingly allow bugs in your production code. 

The only way to ensure to catch and eradicate these inevitable bugs is to test the code. How long does manual testing take? Once these tests have run and (hopefully) exposed your bugs, how long does it take to find bugs? How long does it take to fix them?

Automated tests will run in a tiny fraction of the time it takes to run manual tests and can be far more revealing about **where** in the code your bugs lie. While it might require some time up-front to build these tests, time saved on the other time can be easily an order of magnitude greater.

#### "Isn't it more expensive? My developers are expensive. I need to use their time effectively churning out features, not tests."

At the end of the day, TDD requires a little bit more from developers. However, as we've discussed above, we can spend much less time hunting bugs with automated tests. This time translates directly into money. 

As a side benefit, the developers who write the code will write better tests because they intimately understand the code. Better tests mean fewer bugs slip through into production, where they might truly become expensive.

On top of all of this, our priority should always be **quality features**, not just features. TDD practices tend to help developers focus on the end users and remove themselves from the "zone." They also tend to reveal better software design patterns, which leads to cleaner code. Clean, quality code translates directly to better features for users.

#### "Can't I just test it later? I already have a QA team waiting for new features."

You can, but you have to prepare for it to take longer and be less reliable. To reach the same level of speed and confidence, you'd have to bring in a large, skilled manual QA team and they would have to work very effectively together. Anyone who has ever managed people knows that building an effective team can be as challenging as any technical problem.

Communicating between development and QA teams also requires a lot of communication and documentation. When the developers write the tests themselves, the risk of mis-communicating complex topics is greatly reduced. Also, when automated tests are written well, they become living documentation and can even remove most of the need for formal documentation of the system.

#### "I tried it and I never ran out of tests to write. When am I done writing tests?"

This is where developer skill comes in. Writing effective tests means understanding the problem domain, the technologies, and users' demands equally. When we really understand the problem we're trying to solve, we know how to convince ourselves that we've solved it. 

TDD is about writing as many tests as will give us **confidence**, but we must also know when additional work will give diminishing or nonexistent returns on that **confidence**. Developers should already be very familiar with this dilemma. Tests are just code, and skilled developers know how to develop a "definition of done" and stop moving forward when there is no more value to be gained from the work.

##### Let's demonstrate with an example: My users have asked to add an image to a user profile. 

- I can add a very simple bit of functionality that shows the same default image for each user.  

- Alternatively, I can add a much more complex set of features that allows users to upload an image, apply filters, convert the quality of the image back and forth, and select multiple sizes and orientations for the image.

The correct answer almost always lies somewhere in the middle of this spectrum. Part of our responsibility as programmers is to weigh our users' needs with the amount of time and effort we can afford to put into implementation. While power-users might love the additional functionality provided by the second example, most companies can't afford to spend months of time and money on user profile images. 

In the same way, skilled developers are able to pick a point between zero tests and hundreds of tests per feature where additional effort will shift towards pure expense and produce little meaningful benefit. A good rule of thumb is to follow this pattern:

- Test the nominal, successful ways in which a user can use the feature. ("For an addition feature, given 2 and 2, I should return 4.") 
- Then, test the most likely and most evil ways a user can abuse the feature. ("When the user passes something other than numbers, throw an error.")
- Avoid the instinct to test every single permutation of the user's input, good or bad. Ask yourself "Do these tests describe the way a user will use and abuse my feature?" When the answer is "yes," you're done testing the feature.x



#### "Now I have to rewrite tests all the time along with my code! That's more work!"
- What this concern actually describes are *brittle* tests. Properly written tests do not have this problem. This might also be a symptom of TDD's tendency to expose design flaws in your system. "If it's hard to test, it's hard to write."

#### "But it's _hard_ to do! We're already struggling to keep up with new technologies and now you're suggesting we pick up an entire new skillset?"

This one is a true statement. TDD does require a new mindset in many developers. Have to weigh the other benefits, but in most cases it's better.


### The Three Laws of TDD

1. You can't write any production code until you have first written a failing unit test.
2. You can't write more of a unit test than is sufficient to fail, and not compiling is failing.
3. You can't write more production code than is sufficient to pass the currently failing unit test.

### Types of automated tests:

- Feature tests (End-to-end tests)
- Integration tests
- Unit tests

##### And others...

- Contract / Frenemy tests
- UI tests
- Controller tests

### When do I run my tests? How do I run my tests?

- As often as possible
- Whenever I commit to `master`

