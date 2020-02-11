// let helloPromise = new Promise((resolve, reject) => {
//     setTimeout(function() {
//         resolve("Hello!")
//         // Or can rejct
//         reject({message: "Could not find data"})
//     }, 1000)
// });

// helloPromise.then(message => {
//     console.log("Promise is finally done after so many secs and adds to this message + " + message);
// });

// console.log("Goodbye! prints first even though it's on the last line")


let helloPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello!"), 1000);
  });
  
  helloPromise.then(message => {
      // First promise
    console.log("Promise is done! " + message);
    return new Promise((resolve) => {
        // Second promise
      setTimeout(() => resolve("Hello 2!"), 1000);
    });
  }).then(message => {
      // Second promise
    console.log("Second promise is done! " + message);
  })
