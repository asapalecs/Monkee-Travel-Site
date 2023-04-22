const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const handlers = require("./lib/handlers");
const multiparty = require('multiparty');
const credentials = require('./credentials');
const expressSession = require('express-session');
const flashMiddleware = require('./lib/middleware/flash');

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
app.set('env', 'production');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Cookies
app.use(cookieParser(credentials.cookieSecret));
//Sessions
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}))

app.use(express.static(__dirname + "/public"));

//adding Flash Middleware
app.use(flashMiddleware)

app.get("/", handlers.home);

// handlers for browser-based form submission
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// handlers for fetch/JSON form submission
app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

// vacation photo contest
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
    console.log('got fields: ', fields)
    console.log('and files: ', files)
    handlers.vacationPhotoContestProcess(req, res, fields, files)
  })
})

// vacations
app.get('/vacations', handlers.listVacations)

app.get("/about", handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);
if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port} ` +
      "; press Ctrl-C to terminate."
    );
  });
} else {
  module.exports = app;
}
