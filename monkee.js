const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const handlers = require("./lib/handlers");
const app = express();

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

// handlers for browser-based form submission
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.get("/about", handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        "; press Ctrl-C to terminate."
    );
  });
} else {
  module.exports = app;
}
