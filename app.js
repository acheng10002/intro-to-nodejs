console.log("Hello World!");
/* 
single-threaded - one thread, one call stack, one thing at a time
non-blocking - blocking being code that is slow that is on the call stack
               synchronous requests block the browser
               the solution is asynchronous callbacks
asynchronous - all functions in Node are made asynchronous
               meaning, I run some code, give it a callback and run that later
concurrent - browser gives me Web APIs/ Node gives me C++ APIs, other threads that I can make calls to
language 
cross-platform - Node.js runs on multiple OS or environments
APIs - backend services that power client applications
       ex. web app running inside web browser
       ex. mobile app running on mobile device
client apps need to talk to services sitting on a server or in cloud to: 
store data, send emails, push notifications, kick off workflows

*/
function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  var squared = square(n);
  console.log(squared);
}

printSquare(4);

// synchronous
[1, 2, 3, 4].forEach(function (i) {
  console.log(i);
});

// asynchronous- use this when I have slow processing of each item in the array
function asyncForEach(array, cb) {
  array.forEach(function () {
    setTimeout(cb, 0);
  });
}

asyncForEach([1, 2, 3, 4], function (i) {
  console.log(i);
});

/*
- step into the function, push something onto the stack
- return from a function, pop off the top of the stack
- see stack trace in dev tools, the state of the call stack
call stack, event loop, callback queue, other APIs
JS runtime, which is a v8 engine plus Node modules
heap is where memory allocation happens
call stack is where my stack frames are, it's the data structure that records where in the program I am  
setTimeout, DOM, HTTP request are not in V8 engine...
There's V8 runtime, Web APIs (provided by the browser - DOM, ajax, setTimeout), event loop, and callback queue
I would setTimeout with a delay if I'm trying to deter something until the stack is clear, to the end of the stack
setTimeout is a minimum time to execution, not a set time to execution
- don't block the event loop means don't put shitty, slow code on the stack because then the browser can't do what
  it needs to do, go through the render queue and go through the callback queue
1. Push main() (file) onto the call stack.
2. Push console.log() onto the call stack. This then runs right away and gets popped.
3. Push setTimeout(2000) onto the stack. setTimeout(2000) is a Node API. 
   When we call it, we register the event-callback pair. 
   The event will wait 2000 milliseconds, then callback is the function.
4. After registering it in the Node APIs, setTimeout(2000) gets popped from the call stack.
5. Now the second setTimeout(0) gets registered in the same way. 
   We now have two Node APIs waiting to execute.
6. After waiting for 0 seconds, setTimeout(0)'s callback gets moved to the task/callback queue, 
   and the same thing happens with setTimeout(2000)'s callback.
7. In the task/callback queue, the functions wait for the call stack to be empty, 
   because only one statement can execute a time. This is taken care of by the event loop.
8. The last console.log() runs, and the main() gets popped from the call stack.
9. The event loop sees that the call stack is empty and the callback queue is not empty. 
   So it moves the callbacks (in a first-in-first-out order) to the call stack for execution.

- Explain some things that Node.js is commonly used for
- Create and use modules with Node.js (both built-in and user created)
- Set up a basic webserver with Node.js using the HTTP module
- CRUD files form Node.js
- Use the URL module to parse a url address and split it into readable parts
- Understand how to use NPM
- Create, fire, and listen for my own events

/* shell - CLI that sllows me to interact with the OS by executing commands, running scripts, and managing
           processes
explicitly tells the shell to run my script with node, can also be embedded into my JS file,
"sheband" line - first line in the file that tells the OS which interpreter to use for running the script
// #!/usr/bin/node
// #!/usr/bin/env node // all OS should have env, I can tell the OS to run env with node as parameter
node app.js

node -e, --eval "script" - executes a string as argument
node --watch app.js - automatically restarts the app when a file changes
node run <task-name> - built-in task runner that allows me to execute specific commands defined in the 
                       scripts section of my package.json
-- --another-argument - passes arguments to the command
node --run dev - run argument is passed to the dev script
--run sets specific environment variables that can be useful for my script
environment variable - key-value pair stored in the OS's environent that can be accessed by apps and scripts
NODE_RUN_SCRIPT_NAME - name of the script being run
NODE_RUN_PACKAGE_JSON_PATH - path to the package.json file being processed
*/

/* script uses the Axios library to send an HTTP GET request to https://example.com/todos and handles the
response or error accordingly 
Axios - promise-based HTTP client for both Node.js and the browser */
const axios = require("axios");

axios
  // sends a GET request to https://example.com/todos
  .get("https://example.com/todos")
  /* Axios returns a Promise, handling the response async 
  if the request is successful... */
  .then((res) => {
    // logs HTTP status code, 200 for success
    console.log(`statusCode: ${res.status}`);
    // logs the entire response object (HTTP status, response data, headers, and other metadata)
    console.log(res);
  })
  // handles errors if request fails
  .catch((error) => {
    /* if error occurs-  network issue, API down, 404 Not Found, logs the error message 
    error object may be: error.response (if server responded with error status), error.request (if no 
    response was received), or error.message */
    console.error(error);
  });

// built-in Node.js module used to make HTTPS requests
const https = require("https");

const options = {
  // specifies the target server
  hostname: "example.com",
  // 443 is the standard port for HTTPS
  port: 443,
  // API endpoint to which the request is send
  path: "/todos",
  // GET - retrieves data from the server
  method: "GET",
};

/* creates the HTTP request
  options contains the request details
  callback is executed when the server responds */
const req = https.request(options, (res) => {
  // handles the server response, logs HTTP status code
  console.log(`statusCode: ${res.statusCode}`);
  // listens for the data event on the response, res
  res.on("data", (d) => {
    // when the server sends data in chunks, it writes them to stdout (console output)
    process.stdout.write(d);
  });
});

/* if an error occurs, it logs the error
  network issues, incorrect domain, SSL failure
  SSL failure - occurs when a secure HTTPS connection cannot be established due to issues 
                with SSL/TLS certificates, server configuration, or network security settings */
req.on("error", (error) => {
  console.error(error);
});
// sends the request to the server
req.end();

const https = require("https");

const data = JSON.stringify({
  todo: "Buy the milk",
});

const optionsForPost = {
  hostname: "whatever.com",
  port: 443,
  path: "/todos",
  method: "POST",
  // defines metadata for the request
  headers: {
    // informs the server that the request body is JSON
    "Content-Type": "application/json",
    // size of the request body in bytes, required by some servers
    "Content-Length": data.length,
  },
};

/* creates the HTTP request
  options contains the request details
  callback is executed when the server responds */
const reqForPost = https.request(optionsForPost, (res) => {
  // handles the server response, logs HTTP status code
  console.log(`statusCode: ${res.statusCode}`);
  // listens for the data event on the response, res
  res.on("data", (d) => {
    // when the server sends data in chunks, it writes them to stdout (console output)
    process.stdout.write(d);
  });
});

// if an error occurs, it logs the error
reqForPost.on("error", (error) => {
  console.error(error);
});
// sends the JSON payload in the request body
reqForPost.write(data);
// sends the request to the server
reqForPost.end();

/* PUT and DELETE requests use the same POST request format, options.method gets changed */
