/* HTTP module - allows Node.js to transfer data over HTTP
require sincludes a module */
const http = require("http");

/* creates my own module that returns the current date and time 
exports keyword makes the properties and methods available outside the module file 
should be its own file, myfirstmodule.js */
/*
exports.myDateTime = function () {
  return Date();
};
*/
const dt = require("./myfirstmodule");

/* URL module easily splits the query string into readable parts */
const url = require("url");

// fs module allows me to work with the file system on my computer
const fs = require("fs");

/* creates a server object
tells computer to run function(req, res), write string if a browser tries to access 
my computer on port 8080  
the req in function(req, res) is an object, http.IncomingMessage object */
// response body content at http://localhost:8080/
http
  .createServer(function (req, res) {
    /* HTTP header that specifies the server response is supposed to be displayed as HTML 
    first argument is status code, 
    second argument is object containing the response headers 
    (vs. res.writeHead(200, { "Content-Type": "text/plain" }); )*/
    res.writeHead(200, { "Content-Type": "text/html" });
    // writes the part of the url that comes after the domain name
    // res.write(req.url);
    // writes a response tot the client
    // res.write("The date and time are currently: " + dt.myDateTime());
    /* extracts query parameters from the URL
    req.url - contains the full request URL, true tells Node.js to automatically parse the 
              query string into an object
    .parse - parses the URL into an object
    .query - extracts the query parameters as an object 
    if request URL is: 
    http://localhost:8080/?year=2025&month=February 
    q becomes: {year: "2025", month: "February"} */
    const q = url.parse(req.url, true).query;
    const txt = q.year + " " + q.month;
    // ends the response with this string and closes the connection
    res.end(txt);
  })
  // the server object listens on port 8080
  .listen(8080);

// results displayed in the CLI
console.log("This example is different!");
console.log("The result is displayed in the Command Line Interface");

/* Node.js 
- it's an open source server environment 
- it's single-threaded, non-blocking, asynchronous, memory-efficient programming 

How Node.js handles a file request:
1. sends the task to the computer's file system
2. ready to handle the next request (bc it's non-blocking and async, so no waiting!!)
3. when the file system has opened and read the file, the server returns the content to the client 

Node.js can:
- generate dynamic page content
- create, open, read, write, delete, and close files on the server, using the built-in fs module
  - store structured or unstructured logs, static sdata in JSON, logs, CSV, manual read-write
  - flate file storage
  - work with text files, binary files, and streams
  - risk fo file locks and race conditions
  - not very scalable
- collect form data
- can add, delete, modify data in my database using SQL
  - query and filter relational data dynamically, query-base retrieval
  - tables and collection storage
  - handle concurrent user access efficiently 
  - meant for scaling 
  
Node.js file - .js file containing a task that will be executed on certain events
ex. event is someone trying to access a port on the server
Node.js files must be initiated on the server before having any effect 
- node <filename> to initiate the file 
- then my computer works as a server
- if any browser tries to access my computer on port 8080, it will get the string message in return 
Node.js modules are like JS libraries - set of functions I want to include in my app */

/* reads the HTML file, and returns the content
 creates a server object, will run function(req, res) if a browser tries to access 9090 
 sever starts and listens on port 9090,
 when a request is received: index.html is read, if successful the file content is sent as an HTML response
 if an error occurs, it sends a 404 response */
http
  .createServer(function (req, res) {
    /* async method that reads content of index.html 
    function(err, data) runs once the file reading is complete 
    err - if error occurs, err holds the error
    data - contains the contents of the file if successfully read */
    fs.readFile("index.html", function (err, data) {
      // sets the HTTP response header, tells browser the response is HTML content
      res.writeHead(200, { "Content-Type": "text/html" });
      // writes the file content to the response body
      res.write(data);
      /* res.end signals that the response is complete, return ensures the function exits 
      after sending the response */
      return res.end();
    });
  })
  .listen(9090);

/* appends specified content to a file - creates and updates the file
if the file does not exist, the file will be created 
fs.appendFile(filename, data, callback) 
filename - name of the file to write to
data - text to append at the end of the file
callback - executes when the operation is complete 
APPENDS "HELLO CONTENT!"
fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
  /* if an error occurs, err will contain the error details 
  throw err- stops execution and prints the error message 
  if (err) throw err;
  // if no error occurs, Saved is printed to console
  console.log("Saved!");
}); */

/* fs.open() second argument is a flag
w is for writing, and the file is opened for writing
if the file does not exist, an empty file is created 
EMPTIES THE FILE */
fs.open("mynewfile1.txt", "w", function (err, file) {
  if (err) throw err;
  console.log("Saved!");
});

/* fs.writeFile replaces the file and content if it exists - creates and updates the file
if the file does not exist, a new file with the specified content, will be created 
WRITES "HI CONTENT!"*/
fs.writeFile("mynewfile1.txt", "Hi content!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

/* appends "This is my text." to the end of the file "mynewfile1.txt" 
fs.appendFile("This is my text.") appends, but another fs.appendFile() may still be running,
so since multiple operations may overlap, unintended partial writes (nt! geting duplicated)
can happen */
fs.appendFile("mynewfile1.txt", " This is my text.", function (err) {
  if (err) throw err;
  console.log("Updated!");
});

/* to ensure proper execution order: 
async function manageFile() {
  try {
    await fs.writeFile("mynewfile1.txt", "Hi content!");
    console.log("File overwritten with 'Hi content!'");

    await fs.appendFile("mynewfile1.txt", " This is my text.");
    console.log("Appended: 'This is my text.'");
  } catch (err) {
    console.error("Error:", err);
  }
}

manageFile(); */

fs.writeFile("mynewfile2.txt", "This is my text", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

// DELETES the file
fs.unlink("mynewfile2.txt", function (err) {
  if (err) throw err;
  console.log("File deleted!");
});

// RENAMES "mynewfile1.txt" to "myrenamedfile.txt"
fs.rename("mynewfile1.txt", "myrenamedfile.txt", function (err) {
  if (err) throw err;
  console.log("File Renamed!");
});

/* URL module splits up a web address into readable parts */
const adr = "http://localhost:8080/default.htm?year=2017&month=february";
/* url.parse() parses an address, and it will return a URL object with each part of the
address as properties */
const q = url.parse(adr, true);

//returns 'localhost:8080'
console.log(q.host);
//returns '/default.htm'
console.log(q.pathname);
//returns '?year=2017&month=february'
console.log(q.search);
//returns an object: { year: 2017, month: 'february' }
var qdata = q.query;
//returns 'february'
console.log(qdata.month);

/* Node.js can be a file server, and it can serve the file request by the client, after 
parsing the query string 
creates an HTTP server that listens for incoming requests */
http
  .createServer(function (req, res) {
    /* extracts query parameters from the URL
    req.url - contains the full request URL, 
    .parse - parses the URL into an object
    true - tells Node.js to automatically parse the query string into an object
    .query - extracts the query parameters as an object 
    query string and URL pathname are parsed separately within one object, q
    but they are accessed as distinct properties 
    example:  
    {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: '?name=John',
        query: { name: 'John' },  // Query string parsed separately
        pathname: '/about.html',   // Path is parsed separately
        path: '/about.html?name=John',
        href: '/about.html?name=John'
    }
    parses the URL, storing the path and the query parameters in q */
    var q = url.parse(req.url, true);
    // converts the pathname into a filename ex. "/about.html to ./about.html"
    var filename = "." + q.pathname;
    /* reads filename, callback runs once the file reading is complete */
    fs.readFile(filename, function (err, data) {
      /* if error occurs, sets HTTP response header with failure status code, and tells 
      browser response is HTML content */
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        // signals the response is complete, ends the response with string and closes connection
        return res.end("404 Not Found");
      }
      /* if no error, sets HTTP response header with successful status code, and tells browser
      response is HTML content */
      res.writeHead(200, { "Content-Type": "text/html" });
      // writes the file content to the response body
      res.write(data);
      /* res.end signals that the response is complete, return ensures the function exits 
      after sending the response */
      return res.end();
    });
  })
  .listen(8081);

/* package - has all the files for a module
module - a JS library I can include in my project 
every action on a computer is an event
objects in Node.js can fire events, readStream object fires events when opening and closing a file */
const rs = fs.createReadStream("./myrenamedfile.txt");
rs.on("open", function () {
  console.log("The file is open");
});

const events = require("events");
/* all event properties and methods are an instance of an EventEmitter object 
access these properties and methods through the EventEmitter object */
const eventEmitter = new events.EventEmitter();

// creates an event handler
const myEventHandler = function () {
  console.log("I hear a scream!");
};

/* I can assign event handlers to my own events with the EventEmitter object 
myEventHandler will be executed when a "scream" event is fired */
//Assign the event handler to an event:
eventEmitter.on("scream", myEventHandler);

// emit fires the 'scream' event
eventEmitter.emit("scream");

const formidable = require("formidable");
