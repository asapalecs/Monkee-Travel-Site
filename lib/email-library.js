// Importing the 'credentials' module and assigning it 
//to a constant variable called 'credentials'
const credentials = require("./credentials");

// Importing the 'email' module and passing the 'credentials' to it, 
//then assigning the returned value to a constant variable called 'emailService'
const emailService = require("./lib/email")(credentials);

// Defining a string variable 'email'
const email = "e@zepln.com";

// Checking if the 'email' variable is truthy (not null, undefined, 0, false, or an empty string)
if (email) {
  // Calling the 'send' method of the 'emailService' object, passing the 'email', email subject,
  // and email body as arguments, and then handling the promise returned by the 'send' method using '.then' and '.catch' methods.
  emailService
    .send(
      email,
      "Hood River tours on sale today!",
      "Get 'em while they're hot!"
    )
    .then(() => {
      console.log("sent successfully!");
    })
    .catch((err) => {
      console.log("failed to send email: ", err.message);
    });
} else {
  console.log("Edit this file, and specify an email address to test....");
}
