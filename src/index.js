function component() {
  /* callbacks - functions that are passed into another function as an argument 
  this is a function declaration:
  - has function keyword
  1. it's hoisted, can be called before it appears in the code
  2. it's named, always has an identifier that's useful in stack traces
  3. more readable, useful for stack traces and debugging */
  function namedFunkyFunction(music, isWhiteBoy) {
    if (isWhiteBoy) {
      // function body
      console.log("Play: " + music);
    }
  }
  /* this is a function expression:
  1. it's not hoisted
  2. can be used as an argument to another function or assigned dynamically
  3. can be anonymous or named - naming helps in debugging 
  
  anonymous functions are mostly used by passing them into other functions as a callback */
  const anonymousFunkyFunction = function (music, isWhiteBoy) {
    if (isWhiteBoy) {
      console.log("Play: " + music);
    }
  };

  /* arrow functions are a shorter way to to write functions
  if there is only one argument - parenthesis can be omitted
  if arrow function is only one line, brackets and return keyword can be omitted */
  const arrowFunkyFunction = (music, isWhiteBoy) => {
    if (isWhiteBoy) {
      console.log("Play: " + music);
    }
  };

  // each of the above functions can be called exactly the same way
  namedFunkyFunction("that funky music", true);

  // I can call all of these functions like: `playThe('blues')`
  const playTheOne = (funky) => {
    return funky + " music";
  };

  const playTheTwo = (funky) => {
    return funky + " music";
  };

  const playTheThree = (funky) => funky + " music";

  // these functions are identical, they're arrow functions without an argument
  const playThatFour = () => "funky music";

  const playThatFive = () => {
    return "funky music";
  };

  const playThatSix = () => {
    return "funky music";
  };

  const notes = ["do", "re", "me"];

  /* forEach array method takes a callback as its argument 
  all these do the same thing */
  notes.forEach((note) => console.log(note));

  notes.forEach(function (note) {
    console.log(note);
  });

  notes.forEach(console.log);

  // what forEach might look like under the hood
  function myForEach(array, callback) {
    // calls callback function each time it loops over an item
    for (let i = 0; i < array.length; i++) {
      // calls the callback function
      callback(array[i]);
    }
  }

  const myArry = [2, 3, 4, 2];
  /* item comes from the function calling the callback with an argument
  callback(array[i*]) calls the callback with an argument, which is 
  defined here inline as an anonymous function */
  myForEach(myArry, (item) => {
    console.log(item + 2);
  });

  // () not needed since there's only one argument
  myForEach(myArry, (item) => console.log(item + 2));

  myForEach(myArry, function (item) {
    console.log(item + 2);
  });

  /* declares the function I want to use as a callback 
  defines item as a parameter to be passed in when it's called by the myForEach function */
  function printItemPlusTwo(item) {
    console.log(item + 2);
  }

  // item already declared elsewhere
  myForEach(myArry, printItemPlusTwo);

  function myMap(array, callback) {
    const myNewArray = [];

    for (let i = 0; i < array.length; i++) {
      const callbackResult = callback(array[i]);
      myNewArray.push(callbackResult);
    }

    return myNewArray;
  }

  const addedArrayOne = myMap([1, 2, 3], (arrayNum) => {
    return arrayNum + 2;
  });
  console.log(addedArrayOne);

  // or
  const addedArrayTwo = myMap([1, 2, 3], (arrayNum) => arrayNum + 2);
  console.log(addedArrayTwo);

  const elementOne = document.querySelector("#myId");
  /* event is passed into the callback from the .addEventListener function
  when it receives a click event 
  the callback is an anonymous arrow function */
  elementOne.addEventListener("click", (event) => {
    console.log(event.target.value);
  });

  // callback here is a function declaration
  const elementTwo = document.querySelector("#myId");
  /* event object is passed into the callback function by the .addEventListener 
  function, .addEventListener function calling the callback function */
  elementTwo.addEventListener("click", function (event) {
    console.log(event.target.value);
  });

  /* I could declare a function outside of the argument list and just add it by
  its name as well */
  function myEventHandler(event) {
    // do something, probably with 'event'
  }

  const elementThree = document.querySelector("#otherId");
  elementThree.addEventListener("click", myEventHandler);

  const element = document.createElement("div");

  element.innerHTML = "Hello";

  return element;
}

document.body.appendChild(component());

/* // create a server
// anytime I get a network request, run this callback
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // function responds with the text, 'Hello World!'
    // if I go to the browser and navigate to the correct address and port, I will see this text
    res.end('Hello World');
}).listen(8080);
*/
