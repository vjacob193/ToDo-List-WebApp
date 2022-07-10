// 13.0 Cut + paste date generator into new function in separate .js file


 //13.1 export the getDate function. Don't use () on the function, because that would be calling it.
exports.getDate = function getDate() {
  const today = new Date(); //get today's date
  const options = { //object with parameters passed into the toLocaleDateString() function
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return today.toLocaleDateString("en-US", options); //get date's day as number 0-6 (0=Sun)
}

exports.getDay = function getDay() {
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
}


// console.log(module); //check out the node module's properties, such as EXPORTS
// console.log(module.exports);
