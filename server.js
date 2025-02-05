/* - Sets up a basic webserver with Node.js using the HTTP module
Node.js app runs in a single process, without creating a new thread for every request
- it coes not create a new thread for every request, like Java
- it uses an async, non-blocking, single-threaded event loop to handle multiple requests
Node.js provides a set of async I/O primitives that prevent JS code from blocking 
when Node.js performs an I/O operation (reading from the nework, accessing a database or
filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will
resume the oeprations when the response comes back 

Node.js can handle thousands of concurrent connections with a single server, without 
introducing the burden of managing thread concurrently 
createServer() method of http creates a new HTTP server and returns it */
const { createServer } = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

/* when a browser sends a request to http://127.0.0.1:3000/ the event loop detects it and 
invokes the callback inside createServer() 
no new thread is created, the same main event loop handles the request 
whenever a new request is received, the request event is called
the callback receives two objects
req - the request object (http.IncomingMessage object )contains request details
res - the response object (http.ServerResponse) is used to send data back */
const server = createServer((req, res) => {
  // res object returns data to the caller, first indicating a successful response
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  /* the response is generated immediately and does not involve any I/O operation 
  close the response, adding the content as an argument to end() */
  res.end("Hello World");
});

/* server starts listening for incoming HTTP requests on the specified port and host name
Node.js registers this operation and does not block execution
the event loop continuously listens for incoming requests */
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/* differences between Node.js and the browser
1. in the browser, I am mostly interacting with the DOM or other Web Platform APIs like cookies
  these do not exist in Node.js, I don't have the document, window and other objects provided 
  by the browser 
2. Node.js provides all the nice APIs through its modules, like filesystem access functionality 
3. in Node.js, I control the environment, and I know whcih version of Node.js I will run the app on
4. Node.js supports both CommonJS and ES module systems 

V8 - JS engine that parses and executes JS code 
     it's independent of the browser in which it's hosted
     it's written in C++
modern JS engines compile JS, V8 internally compiles JS with just-in-time compilation to speed up execution
ever since Google Maps in 2024, JS went from executing a few dozen lines of code to complete applications
with thousands to hundreds of thousands of lines running in the browser
- compiling JS makese sense bc it takes a bit more to have the JS ready, once it's done, it'll be more 
  performant than purely interpreted code
DOM * other Web Platform APIs are provided by the browser 

npm - standard package manager for Node.js
      installs, updates, and manages downloads of dependencies
- npm registry has over 2.1 million packages, it's the biggest single language code repository on Earth
- started as way to download anad manage dependencies of Node.js, but it's now a tool used in frontend JS
- if project has a package.json file, npm install will install everything the project needs
- npm install <package-name> installs a specific package
  this line will also add <package-name> to the package.json file dependencies
- package.json devDependencies has dev tolls like a testing library, dependencies are bundled with the app
  in production 
- npm update checks all packages for a newer version or npm update <package-name>
- npm install <package-name>@<version> to install a specific version of a package
- very common to use the npm run <task-name> format from package.json file to specify command line tasks, 
  like to run Webpack (module bundler that takes multiple modules, processes them, and outputs optimized 
  bundles that can be efficiently loaded in a browser)  
- Node.js is built against modern versions of V8, so new features from JS ECMA-262 get brought to Node.js developers
- runtime flag - configurable option that alters the behavior of a program while it's running
- grep - command-line tool used to search for lines that match a pattern
- a few libraries in the npm registry recognize using the NODE_ENV variable and default it to a development setting
*** always run my Node.js with NODE_ENV=production set
- four stages/environments where my app is run: Development, Testing, Staging, and Production
- I should not combine optimization and software behavior with the environment my software is running on
- setting NODE_ENV to anything but production is considered an antipattern
- antipattern - common but flawed approach that leads to inefficiency, maintainability issues, or failures
- pattern - proven, effective solution
- WebAssembly - high-performance assembly-like language that can be compiled from C++
                it allows running code written in C at near-native speeds
- assembly language - low-level programming language that provides a human-readable way to write machine instructions
                      for a specific computer architecture
- using Node.js with WebAssembly leverages high-performance, low-level code while still benefiting from the scalability
  and ecosystem of JS
- WebAssembly runs at near-native speeds and can outperform JS for CPU-intensive operations like cryptgraphy, image &
 video processing, data compression, and machine learning
- many high-performance libraries are written in C, C++, or Rust
  they don't need to be rewritten in JS, they can be compiled to WebAssembly and used in Node.js
- to use WebAssembly, need:
  1. a .wasm binary file
  2. set of APIs to communicate with WebAssembly (Node.js provides the APIs via the global WebAssembly object)
- once I have a WebAssembly module, I can use the Node.js WebAssembly object to instantiate it

start with --inspect switch, Node.js process listens for a debugging client
Node.js will also start listening for debugging messages if it receives a SIGUSR1 signal, this activates either the
legacy Debugger API or the Inspector API
- careful not to expose the debugger port on public and private networks

- profile Node.js apps - measure its performance by analyzing the CPU , memory, and other runtime metrics
- to id bottlnecks, high CPU usage, memory leaks, or slow function calls
- Node.js built-in profiler uses the profiler inside V8, which samples the stack at regular intervals during execution
- jit compiles - just-in-time compilation, starts with interpretation that then turns into compilation of frequently
                 executed hot code

Threat List
Denial of Service (DoS) attack - designed to overload a web server by exhausting its resources, making it slow or 
                                 comletely unavailable to legitimate users
                                 ex. Slowloris attack - exploits how servers handle HTTP connections by keeping partial 
                                                        HTTP requests open, preventing new connections
1. Node.js HTTP server receives HTTP requests
2. HTTP server hands them over to the app code via the registered request handler
servers should be created with an error handler, otherwise it'll be vulnerable to DoS
DNS rebinding attack - attack tricks a victim's browser into violating the same-origin policy by dynamically changing
                       a domain's IP address to access private network resources
                       attack depends not on the request's contents, but on the timing and pattern of the requests being
                       sent to the server
typosquatting attacks - when one of the Node.js app's dependencies is compromised, due to a common typo in the spec
exposure of sensitive information to an unauthorized actor - 
proxy server - intermediary between a client and the internet, forwarding requests and responses between them
HTTP request smuggling - attacker manipulates HTTP request processing between frontend and backend servers to bypass 
                         security controls, steal data, or exploit internal services
information exposure through timing attacks - allows attacker to learn potentially sensitive information by measuring
                                              how long it takes for the app to respond to a request
malicious third-party modules
memory access violation - from a combination of memory management errors and an exploitable memory allocator
monkey patching - modification of properties in runtime aiming to change the existing behavior
prototype pollution attack - possibility of modifying or injecting properties into JS language by abusing the usage of
                             _proto_, _contructor, prototype and other properties inherited from built-in prototypes
uncontrolled search path element

*/
