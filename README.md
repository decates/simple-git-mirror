# simple-git-mirror
Combines a (super-dumb) node.js webhook listener with one-way pushing/mirroring of a git repository.

## What is it for?
I want to host my Git Repository on one server (BitBucket), but run CI builds off another (Visual Studio Online). You can set up a webhook in BitBucket to call a URL whenever a change is pushed. This app listens for the call, then fetches and pushes the changes to another Git repository.

It's not really coded for public consumption, but feel free to use it as a starting point and get in touch if you find it useful.

## To Use
You need to have node.js and git installed. The service install also assumes you're running on Windows.

First clone the repository:

    git clone https://github.com/decates/simple-git-mirror.git
    cd simple-git-mirror

Create your own config file based off the example:

    copy config-example.js config.js
    * edit in your favourite text editor *

Download dependencies and install as a Windows service (called *'simple-git-mirror'*):

    npm install

... and you're done!


## TODO

* Use prompt to gather config options on install.
* Improve checking of bare repo presence (currently just looks for a folder with the right name!).
