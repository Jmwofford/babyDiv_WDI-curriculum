[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Git & GitHub (15 minutes)

Today, we will install and configure Git, and set it up to work with
your respective GitHub accounts.

<br />

## Create a Github Enterprise account.

1. Go to https://git.generalassemb.ly and create a new account.
  - git.generalassemb.ly is where you will manage your homework and work through GA specific exercises.
  - **We recommend using the same username and email as your Github account.**
  
2. Go to https://www.github.com and create a new account (or log into your existing one)
  - We will use this site for hosting projects and looking at tools available to the open source community.

## Initial Setup : Homebrew

1. Install Git: execute this command within your terminal.  You can be in any directory.

```bash
$ brew install git
$ git --version
```

- this will download and install Git with Homebrew
- `git --version` will output which version of git you have

2. Run each of the following commands in the terminal
(substituting in your personal information for what is in the quotes).  **Make sure to use the same username and email that you use in github.**

```bash
git config --global user.name "yourGithubUsername"
git config --global user.email "your_github_email@example.com"
```

```bash
$ git config --get user.name
```

- should output your name

```bash
$ git config --get user.email
```

- should output your email

3. Add some config items that will assist with making sure all your changes get detected by git, and that git knows that vscode is your editor of choice.

```
git config --global core.ignorecase false
git config --global mergetool.vscode.cmd "code --wait $MERGED"
```

<!--
2. After creating an account, we need to set up an SSH key for your account.  SSH is a super-secure way to transmit data.  This is going to be tough and highly technical, but just make sure you follow the instructions **EXACTLY** the way that Github suggests.

> In software development, it's important to be able to follow a series of commands even if you don’t completely understand them.

3. We will spend the next 30 minutes working on following through this tutorial directly from Github. https://help.github.com/articles/connecting-to-github-with-ssh/

5. Complete the following tutorials
  - Checking for Existing SSH Keys
  - Generating a New SSH Key and Adding it to the SSH-Agent
  - Adding a New SSH Key to Your Github Account (make sure you do this on the GA specific version of GitHub. https://git.generalassemb.ly)

# How you will feel during this tutorial (it's okay!)
![](https://softcover.s3.amazonaws.com/636/learn_enough_git/images/figures/no_idea.jpg)

Again, make sure you follow the directions step by step, even if you don't know what all of the overly technical pieces are.  Once you get set up with SSH, you won't need to think about it again until you buy your next development machine.

-->
Congratulations! You now have **Git** and **GitHub** set up and configured.

---

### If you have finished setting up git, you can work on typing exercises

* [TypeRacer](http://play.typeracer.com/)
* [Typing.io](http://typing.io)
* [ztype](http://zty.pe/)
