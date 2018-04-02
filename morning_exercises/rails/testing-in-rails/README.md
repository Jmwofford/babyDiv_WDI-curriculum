# [Test-Driven Development with Ruby on Rails](http://guides.rubyonrails.org/testing.html)

## Objectives

1. Explain test-driven development
2. Differentiate between the different types of tests
3. Implement some simple test for a Rails app

**NOTE:** this lecture is based on the Rails testing documentation, linked to in the title.

## What is testing?

Testing is the process of making sure your code does what it's supposed to.

Manual testing, or error-driven development, is just what it sounds like: checking all the code works as expected after you change any source code, including testing your application from your web interface. This is limited by the time you need to test *everything* whenever you change *anything*. The larger the code base gets, the harder it is to check every line and every page every time a change is made.

Automated testing is achieved by writing code that checks your code. This may involve writing some code that plays through scenarios that address various possible input values and what the expected outcome is.

When you write very small tests that check very small sections of classes or models, we'd call that **unit** testing.

As your code base grows, so does your test coverage. You should get to a situation where you can run your test code at any time, and every single line of your code gets passed through to ensure it's still returning what you expected it to when it was first written.

Now, you can try to test after you've developed a product, but here are some problems with that approach:

  - Will you have the time?
  - Will your PM let you do this? Or will you have to begin creating the next bit of functionality?

## What is TDD?

TDD stands for **test-driven development**. Also called red/green development, in TDD, you write the tests first, before writing any code and then write code that makes the tests pass.

The test will initially fail - that's the point of the 'red' - and the expectations of the test will drive how you will write your actual code - this is referred to as your implementation - until the test passes, or goes 'green'.

Frequently, TDD is approached with pair programming - two developers working together at one machine. Often, one person writes a test; then, the other writes the implementation, and they alternate throughout the day. In an interview, you might be given some test code and be asked to write the implementation code; or you might be asked to write the tests for some outline functionality to demonstrate your familiarity with this process.

The process is also referred to as red/green/refactor because once the test passes (and it's "green"), you can review the code you've written and any other parts of the code that's affected to see if it can be cleaned up at all. No new functionality is added at this stage - the desired outcome is still for the tests to pass, just as they had before, but with more efficient code.


<p align="center">
<img src="./assets/red-green-refactorFINAL2.png">
</p>

## TDD with Minitest & Rails

### Getting started with unit tests

There are a few popular Ruby testing suites. [RSpec](http://rspec.info/) is a popular choice and Minitest is built into Rails. We'll be using Minitest.

Let's create a new Rails app to mess around with Minitest:
```bash
rails new testing_app
```

Notice that we have a `test` directory. Run `ls -F test` to view its contents and refer to the [Rails documentation](http://guides.rubyonrails.org/testing.html#rails-sets-up-for-testing-from-the-word-go) for an overview thereof.

Next, we'll generate an `article` model:

```bash
rails generate model article title:string body:text
```

This command, in addition to generating the model itself, generated some components for testing:

1. `test/models/article_test.rb`: a default test stub where we can add some more tests for our model.
2. `test/fixtures/articles.yml`: a fixture allows us to generate some fake data for our tests. Refer to the [Rails docs](http://guides.rubyonrails.org/testing.html#the-low-down-on-fixtures) for an in depth discussion of fixtures.

Next, let's run our migrations:

```ruby
rails db:migrate
```

Now add a test for the article model:

```ruby
# test/models/article_test.rb

require 'test_helper'

class ArticleTest < ActiveSupport::TestCase
  test "should not save article without title" do
    article = Article.new
    assert_not article.save, "Saved the article without a title"
  end
end
```

Refer to the [Rails documentation](http://guides.rubyonrails.org/testing.html#rails-meets-minitest) for a line by line analysis of the above test.

Now that we have one test, let's run our tests. We can do this in three ways:

1. `rails test`: will run all of our tests.
2. `rails test test/models/article_test.rb`: will run just this article model test file.
3. `rails test test/models/article_test.rb:6`: will run one specific test that you select by line number.

As we see, the test fails. We wrote one test for the article model before writing any code for the article model. Hence, the tiny bit of development we've done thus far was **test-driven**.

Let's write some code and make the test pass. In `/app/models/article.rb`:

```ruby
class Article < ApplicationRecord
  validates :title, presence: true
end
```

Re-run the test. It passes!

The test we wrote utilized `assert_not`. What the test does is, it creates an article without a title. We expect that to be unsuccessful, which would return `false`. Hence if `article.save` returns `true`, then the article was created without a title. The `assert_not` expects `false` so the test fails if we get `true` returned. Once we add the validation, the `article.save` will return `false` and the test will pass. Refer to the [Rails docs](http://guides.rubyonrails.org/testing.html#available-assertions) to see what other assertions you have available.

What we just wrote was a **unit test**. Rails separates tests into four categories, though the precise definition of these terms is hard to pin down:

1. Unit: testing particular function/methods/etc.
2. Functional: In Rails, testing the various actions of a controller is a form of writing functional tests.
3. System: System tests are full-browser tests that can be used to test your application's JavaScript and user experience.
4. Integration: Integration tests are used to test how various parts of your application interact.

[Unit tests are great, but they only go so far.](https://9gag.com/gag/a0pbDeX/programmers-will-know-2-unit-tests-0-integration-tests)

## System tests

Rails uses [Capybara](http://teamcapybara.github.io/capybara/) for full system testing. System testing is incredibly powerful. A web browser is literally run wherein you direct the test to perform actual user actions and make assertions about the results. You can even do things like take screenshots at certain points!

First, let's generate some a system test for our app:

```ruby
rails generate system_test articles
```

### Mini-Lab
1. Take 5 minutes to look over the created test file (`test/system/articles_test.rb`).
2. Describe what it's testing for.
3. Explain how to get the test to pass.

Run the test (**NOTE:** you have to include `:system` to run system tests):

```ruby
rails test:system
```

Let's take a look at a longer system test:

```ruby
test "creating an article" do
  visit articles_path

  click_on "New Article"

  fill_in "Title", with: "Creating an Article"
  fill_in "Body", with: "Created this article successfully!"

  click_on "Create Article"

  assert_text "Creating an Article"
end
```

How would you go about getting this test to pass?
