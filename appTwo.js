/* 1. Import required modules
handles http requests and responses */
const http = require("http");
// handles file uploads by parsing multipart/form-data submissions, i.e. file uploads
const formidable = require("formidable");
// performs file system operations, like movign uploaded files
const fs = require("fs");

/* 2. Creates an HTTP server that listens for incoming req
callback is called when a req is received, and it sends a res */
http
  .createServer(function (req, res) {
    /* 3. Handle file uploads (/fileupload route) 
    if the requested URL is /fileupload means the user has submitted the file upload form 
    and got redirected there */
    if (req.url == "/fileupload") {
      // ensures upload directory exists
      const uploadDir = "./uploads";
      // .existsSync checks if fs has this path
      if (!fs.existsSync(uploadDir)) {
        // if not, .mkdirSync makes the path
        fs.mkdirSync(uploadDir);
      }
      // creates a new IncomingForm instance from formidable, which handles the file upload
      const form = new formidable.IncomingForm();
      // sets the upload directory
      form.uploadDir = uploadDir;
      // preserves file extensions
      form.keepExtensions = true;
      // allows empty files
      form.allowEmptyFiles = true;
      // limits file size to 20MB
      form.maxFileSize = 20 * 1024 * 1024;
      // allows only single-file uploads
      form.multiples = false;
      /* 4. debugging - helps debug large file uploads
      4a. logs request headers */
      console.log("Request received:", req.headers);
      /* 4b. built-in HTTP data event
      req.on fires when a chunk of the request body arrives
      req.on() listens to raw incoming request data 
      logs data chunk sizes and helps debug large file uploads */
      req.on("data", (chunk) => {
        console.log("Received data chunk of size:", chunk.length);
      });
      /* B. USER SELECTS A FILE & SUBMITS - browser sends POST /fileupload request 
      4c. built-in Formidable fileBegin event
      form.on fires when a file starts uploading and it begins transferring to the server
      form.on() listens to Formidable events and the moment a file starts uploading
      logs when a file starts uploading and sets the correct file path before writing begins */
      form.on("fileBegin", (name, file) => {
        // logs the file path
        file.filepath = `${uploadDir}/${file.originalFilename}`;
        // log when the file begins uploading
        console.log("Uploading file:", file.filepath);
      });

      /* 4d. built-in Formidable file event 
      form.on fires when a file is fully uploaded 
      form.on() listens to each file getting fulling uploaded 
       ensures files are logged and processed first and logs name and size of uploaded files */
      form.on("file", (name, file) => {
        /* logs file details 
        ensures file is detected when the upload is still ongoing */
        console.log(
          "File detected:",
          file.originalFilename,
          "Size:",
          file.size
        );
      });
      /* 4e. built-in HTTP end event 
      req.on() fires when the entire request body (all file data + metadata), all files and form data, is 
      fully received 
      req.on() listens to the end of the HTTP request
      confirms that all data has arrived for http and it does not handle file processing */
      req.on("end", () => {
        console.log("Upload request fully received.");
      });

      /* 4f. built-in Formidable error event
      form.on() - fires when an error occurs during file parsing */
      form.on("error", (err) => {
        console.error("Formidable error:", err);
      });

      /* 4g. built-in Formidable end event
      form.on() - fires when all fields and files have been parsed 
      confirms when formidable finishes processing the file */
      form.on("end", () => {
        console.log("Form parsing completed.");
      });

      /* C. SERVER RECEIVES FILE - Formidable processes the file
         2. Parse the uploaded file
            the form data, files included, from the req gets parsed 
            err - contains an error if something goes wrong
            fields - object containing non-file form fields
            files - object containing uploaded files */
      form.parse(req, function (err, fields, files) {
        // if Formidable runs into an error, send 500 Interal Server error
        console.log("Parsed files:", files);
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("Error parsing the file upload.");
        }
        // if no file uploaded, return 400 Bad Request
        if (!files.filetoupload) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("No file uploaded.");
        }
        /* D. FILE IS TEMPORARILY SAVED - stored in ./uploads/ 
        temporary path where the uploaded file is stored */
        const oldpath =
          files.filetoupload?.[0]?.filepath || files.filetoupload?.[0]?.path;
        if (!oldpath) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("File path not found.");
        }
        /* newpath is the destination path where the file will be moved to, 
        moves the uploaded file from oldpath to newpath */
        const newpath = `./uploads/${files.filetoupload[0].originalFilename || files.filetoupload[0].newFilename}`;
        console.log("Checking old file path:", oldpath);
        console.log("Checking new file path:", newpath);

        /* E. FILE IS MOVED TO FINAL LOCATION - fs.rename(oldpath, newpath) renames file
         moves/renames the uploaded file from temporary storage/old path to the desired location/new path, /uploads/ */
        fs.rename(oldpath, newpath, function (err) {
          // throw err stops execution and logs the 500 Internal Server Error
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Error moving file.");
          }
          /* F. SERVER RESPONDS - file uploaded and moved
          writes file uploaded to the response */
          res.write("File uploaded and moved!");
          // ends the response, confirming that the file has been received
          res.end();
        });
      });
      /* if request is not to /fileupload, serve an HTML form for uploading files */
    } else {
      /* A. USER VISITS / - HTML form is served (choose file and submit)
      1. Create an upload HTML form with an upload field 
      sends an HTTP 200 OK status with HTML content type */
      res.writeHead(200, { "Content-Type": "text/html" });
      // creates an HTML form dynamically using res.write()
      res.write(
        // form submits data to /fileupload, uses POST since files can't be sent via GET
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      // automatically display a Choose File button that allows users to select a file
      res.write('<input type="file" name="filetoupload">');
      /* automatically displays a Submit button that sends the selected file to the /fileupload route 
      using POST and submits the form */
      res.write('<input type="submit">');
      res.write("</form>");
      // ends the response after sending the HTML form to the client
      return res.end();
    }
  })
  // server starts listening on port 8080, users access the upload page at http://localhost:8080/
  .listen(8080);

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "acheng10002@gmail.com",
    pass: "rxoi yrkt sgcq btno",
  },
});

const mailOptions = {
  from: "acheng10002@gmail.com",
  to: "acheng10002@gmail.com",
  subject: "Sending Email using Node.js",
  // text: "That was easy!",
  html: "<h1>Welcome</h1><p>That was easy!</p>",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
