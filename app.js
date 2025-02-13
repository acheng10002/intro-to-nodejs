// console.log("Hello World!");
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

// PUT and DELETE requests use the same POST request format, options.method gets changed

/* http.createServer - this method creates an HTTP server that accepts handlers that will 
                    be executed every time I get a request */
/* 1. Import required modules
built-in Node.js module used to create a secure HTTPS server */
// built-in Node.js module used to read SSL/TLS certificate files
/* SSL/TLS certificate files - digital files used to encrypt and secure data sent between
                               a server and clients (browsers, APIs) 
                               enable HTTPS by encrypting data using SSL/TLS protocols 
                               and verifying the server's identity 
(Secure Sockets Layer/Transport Layer Security - cryptographic protocols used to secure
                                                 internet communications */
// built-in Node.js module, file system module, used to read SSL/TLS certificate files
const fs = require("node:fs");
/*
// 2. Read SSL/TLS key and certificate - the files are used to establish a secure HTTPS connection
const optionsForCreateServer = {
  /* SSL/TLS key and certificate are provided in the .pem format
  - separate .pem files
  - no passphrase required
  - common on Linus, Apache, Nginx, Node.js
  - private key must be stored separately
  - easier to set up than .PFX format common in Windows 
  // reads the private key from the file ("private-key.pem")
  key: fs.readFileSync("private-key.pem"),
  // reads the SSL certificate from the file ("certificate.pem")
  cert: fs.readFileSync("certificate.pem"),
};

/* 3. Creates a secure HTTPS server, 
SSL/TLS files are required for HTTP
callback function is the first request handler that runs every time the server receives an HTTPS request
https
  .createServer(optionsForCreateServer, (req, res) => {
    /* 4. Handles incoming requests
    sends HTTPS status code 
    this is the second request handler that runs every time the server gets a HTTPS request
    res.writeHead(200);
    /* sends "hello world" as response body to the client 
    this is the third request handler that runs every time the server gets a HTTPS request 
    will close the connection
    res.end("hello world\n");
  })
  /* 5. Start the server and listen on port 8000 
  once the server is started, it will handle incoming HTTPS requests at port 8000 
  .listen(8000);

// curl -k https://localhost:8000/  // tests the HTTPS server

/* built-in Node.js module for accessing and interacting with the file system 
all its methods are async by default */
fs.rename("before.json", "after.json", (err) => {
  if (err) {
    return console.error(err);
  }
  // done
});

/* fs module methods can work synchronously by appending Sync, but the execution of my 
script will block */
try {
  fs.renameSync("before.json", "after.json");
  // done
} catch (err) {
  console.error(err);
}

/* fs/promises module provides promise-based API and avoids callback hell
it allows the use of async/await instead of callbacks 
this script reads, writes, and reads again from a file async, without nesting callbacks */
// const fs = require("fs/promises");

// WRITING A FILE - fs/promises API will reaplce the contents of the file if it does already exist
async function exampleOne() {
  try {
    const content = "Some content!";
    /* I can modify the default by specifying a flag 
    in this case, opening the file for reading and writing and positions the stream at the
    end of the file 
    stream - data flow between a program and a file
    with these flags, the file pointer is positioned at different locations in the file
    beginning (r+, w+) - overwrites or reads from the start 
    end (a, a+) - appends new content at the end */
    // fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});
    await fs.writeFile("/Users/joe/test.txt", content);
  } catch (err) {
    console.log(err);
  }
}
exampleOne();

/* APPENDING CONTENT TO A FILE 
when I want to add new content to a file as opposed to overwriting the file */
async function exampleTwo() {
  try {
    const content = "Some content!";
    await fs.appendFile("/Users/joe/test.txt", content);
  } catch (err) {
    console.log(err);
  }
}
exampleTwo();

/* read file using fs.readFile(), pass it the file path, encoding 
big files will have a major impact on memory consumption and the speed of execution s*/
async function exampleThree() {
  try {
    const data = await fs.readFile("/Users/joe/test.txt", { encoding: "utf8" });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
exampleThree();

// declaring async enables the use of await for async operations
async function exampleFour() {
  // defines the file path
  const fileName = "/Users/joe/test.txt";
  try {
    /* 1. Reads the file asynchronously
    await pauses execution until the file is read and avoids callback nesting */
    const data = await fs.readFile(fileName, "utf8");
    // if successful, log the file's content
    console.log(data);
    /* 2. Writes to the file
    overwrite the file with "Some content" 
    no nested callback, execution proceeds naturally */
    const content = "Some content!";
    await fs.writeFile(fileName, content);
    console.log("Wrote some content!");
    // 3. Read the file again after writing, again avoiding deeply nested callbacks
    const newData = await fs.readFile(fileName, "utf8");
    console.log(newData);
    /* 4. Centralized error handling
  with callbacks, each function needs its own error, 
  this way, single try/catch block, if any operation (readFile, writeFile) fails, 
  it jumps to the catch block */
  } catch (err) {
    console.log(err);
  }
}
exampleFour();

/* factory function - regular function that returns an object
- instances are created by calling them like a normal function
- it does not require new, it's more flexible and easier to customize behavior dynamically
- methods are recreated per instance
- less memory-ficcient because methods are copied to each instance
- uses object composition
- can use closures for private variables
- more flexible, dynamic object creation

class - 
- instances are created with new keyword
- methods are on the prototype
- more memory efficient because of shared prototype methods
- uses extends
- requires #privateFields
- more rigid

URL class in Node.js works similarly to how URLs are handled in browsers
the class is available globally, so I don't need to import it
it follows browser conventions, URL properties are access through special getters
and setter methods, instead of being stored as regular object properties
getter and setter methods - JS methods that allow me to control access to an object's
                            properties
get - retrieve a property's value
set - modify a property's value with additional logic 
"delete" ing a URL property won't actually delete it */

/* new URL(input[, base])
*** The base URL is only used when the input is not an absolute URL.
creates a new URL object by parsing the input relative to the base */
const myURL = new URL("/foo", "https://example.org:81/foo#bar");
// https://example.org/foo

/* URL constructor is accessible as a property on the global object or can be imported
from the built-in url module, to parse, manipulate, and construct URLs 
1. to parse URLs, break down components, to access specific parts 
2. to build URLs dynamically using query parameters without worrying about encoding issues 
3. to resolve relative URLs against a base URL 
4. to modify URL components without breaking the format 
5. to validate and normalize user-generated URLs */
console.log(URL === require("node:url").URL); // Prints 'true'

/* In cases where it is not known in advance if input is an absolute URL and a base is 
provided, it is advised to validate that the origin of the URL object is what is 
expected.
- this prevents security risks from unexpected redirects 
const expectedOrigin = "https://example.org";
const myURLOne = new URL(userInput, expectedOrigin);

if (myURLOne.origin !== expectedOrigin) {
  throw new Error("Unexpected origin detected!");
} */

// url.hash - gets and sets the fragment portion of the URL
console.log(myURL.hash);
// Prints #bar

myURL.hash = "baz";
console.log(myURL.href);
// Prints https://example.org:81/foo#baz

// url.host - gets and sets the host portion of the URL
console.log(myURL.host);
// Prints example.org:81

// url.hostname - gets and sets the host name portion of the URL, not including the port
console.log(myURL.hostname);
// Prints example.org

// Setting the hostname does not change the port
myURL.hostname = "example.com";
console.log(myURL.href);
// Prints https://example.com:81/foo#baz

// Use myURL.host to change the hostname and port
myURL.host = "example.com:82";
console.log(myURL.href);
// Prints https://example.com:82/foo#baz

/* url.href - gets (getting the value is same as url.toString()) and sets the serialized URL
(setting the value to a new value is same as new URL(value)) */
console.log(myURL.href);
// Prints https://example.org:82/foo#baz

myURL.href = "https://example.com/bar";
console.log(myURL.href);
// Prints https://example.com/bar

// url.origin - gets the read-only serialization of the URL's origin
console.log(myURL.origin);
// Prints https://example.com

const idnURL = new URL("https://測試");
console.log(idnURL.origin);
// Prints https://xn--g6w251d

console.log(idnURL.hostname);
// Prints xn--g6w251d

// url.password - gets and sets the password portion of the URL
const myURLTwo = new URL("https://abc:xyz@example.com:8888/abc/xyz?123");
console.log(myURLTwo.password);
// Prints xyz

myURLTwo.password = "123";
console.log(myURLTwo.href);
// Prints https://abc:123@example.com:8888/abc/xyz?123/

//url.pathname - gets and sets the path portion of the URL
console.log(myURLTwo.pathname);
// Prints /abc/xyz

myURL.pathname = "/abcdef";
console.log(myURLTwo.href);
// Prints https://example.com:8888/abcdef?123

// url.port - gets and sets (the value is first converted to a string) the port portion of the URL
console.log(myURLTwo.port);
// Prints 8888

// Default ports are automatically transformed to empty string
// (HTTPS protocol's default port is 443)
myURLTwo.port = "443";
console.log(myURLTwo.port);
// Prints the empty string
console.log(myURLTwo.href);
// Prints https://example.com/abcdef?123

myURLTwo.port = 1234;
console.log(myURLTwo.port);
// Prints 1234
console.log(myURLTwo.href);
// Prints https://example.com:1234/abcdef?123

// Completely invalid port strings are ignored
myURLTwo.port = "abcd";
console.log(myURLTwo.port);
// Prints 1234

// Leading numbers are treated as a port number
myURLTwo.port = "5678abcd";
console.log(myURLTwo.port);
// Prints 5678

// Non-integers are truncated
myURLTwo.port = 1234.5678;
console.log(myURLTwo.port);
// Prints 1234

// Out-of-range numbers which are not represented in scientific notation
// will be ignored.
myURLTwo.port = 1e10; // 10000000000, will be range-checked as described below
console.log(myURLTwo.port);
// Prints 1234

myURLTwo.port = 4.567e21;
console.log(myURLTwo.port);
// Prints 4 (because it is the leading number in the string '4.567e21')

// url.protocol - gets and sets the protocol portion of the URL
console.log(myURLTwo.protocol);
// Prints https:

myURLTwo.protocol = "ftp";
console.log(myURLTwo.href);
// Prints ftp://example.com:1234/abcdef?123

/* a handful of URL protocol schemes are considered special by the WHATWG URL Standard
when a URL is parsed using one of these special protocols, the url.protocol may be changed
to another special protocol but cannot be changed to a non-special protocol */
const u = new URL("http://example.org/abc?123");
u.protocol = "https";
console.log(u.href);
// https://example.org//abc?123

// changing from a special protocol to a non-special protocol won't work
u.protocol = "fish";
console.log(u.href);
// https://example.org/abc?123

// changing from a non-special protocol to a special protocol won't work
const v = new URL("fish://example.org/abc?123");
v.protocol = "http";
console.log(v.href);
// fish://example.org/abc?123

// special protocol schemes are ftp, file, http, https, ws, wss

// url.search - gets and sets the serialized query portion of the URL
console.log(v.search);
// Prints ?123

v.search = "abc=xyz";
console.log(v.href);
// Prints https://example.org/abc?abc=xyz

/* url.toString() is equivalent to url.href and url.toJSON()
url.toJSON() is automatically called when an URL object is serialized with JSON.stringify() */
const myURLs = [
  new URL("https://www.example.com"),
  new URL("https://test.example.org"),
];
console.log(JSON.stringify(myURLs));
// Prints ["https://www.example.com/","https://test.example.org/"]

// URL.canParse(input[,base]) - checks if an input relative to the base can be parsed to a URL
const isValid = URL.canParse("/foo", "https://example.org/"); // true

const isNotValid = URL.canParse("/foo"); // false

// URL.parse(input[,base] - parses a string as a URL)

/* Node.js has events module to handle interactions of the user through events like mouse clicks, 
keyboard button presses, reacting to mouse movements, etc. */
const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();

/* creates a start event, reacts to the start event by just logging
on - EventEmitter object's method used to add a callback that will be executed when the event is triggered 
     alias for emitter.addListener() 
     again, adds a callback that's called when an event is emitted */
eventEmitter.on("start", () => {
  console.log("started");
});

/* emit - EventEmitter object's method to trigger an event 
          synchronously calls every event listener in the order they were registered
triggers event handler callback, and get console log */
eventEmitter.emit("start");

// arguments can be passed to the event handler by passing additional arguments to emit()
eventEmitter.on("go", (number) => {
  console.log(`go ${number}`);
});

eventEmitter.emit("go", 23);

// multiple arguments
eventEmitter.on("begin", (start, end) => {
  console.log(`began from ${start} to ${end}`);
});

eventEmitter.emit("begin", 1, 100);

/* other methods that interact with events:
- once() - add a one-time listener 
- removeListener()/ off() - remove an event listener from an event
- removeAllListeners() - remove all listeners from an event
*/

const door = new EventEmitter();

/* event listener has in-built events:
newListener - when a listener is added
removeListener - when a listener is removed 
door.emit("slam");

// returns an array of strings that represent the events registered on the current EventEmitter object
door.eventNames();

/* gets max amount of listeners that can be added to an EventEmitter, defaults to 10 but can be increased
or decreased using setMaxListener() 
door.getMaxListeners();

// gets count of listeners of the event passed
door.listenerCount("open");

// gets array of listeners of the event passed
door.listeners("open");

// alias for emitter.removeListener();
door.off();

door.on("open", () => {
  console.log("Door was opened");
});

/* adds a callback that's called when an event is emitted for the first time after registering this, called just once
door.once("my-event", () => {
  // call callback function once
});

/* adds a listener and calls it before other listeners
door.prependOnceListener("slam", () => {
  // call callback function before other listeners
});

/* removes all listeners of an EventEmitter object listening to a specific event
door.removeAllListeners("open"); */

/* removes a specific listener
save the callback to a variable, when added, so I can reference it later 
const doSomething = () => {};
door.on("open", doSomething);
door.removeListener("open", doSomething);


// sets the max amt of listeners one cna add to an EventEmitter object, which defaults to 10
door.setMaxListeners(50); */
