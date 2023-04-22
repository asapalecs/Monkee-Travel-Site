const db = require("../db");
const fortune = require("./fortune");

exports.home = (req, res) => res.render("home");

exports.about = (req, res) =>
  res.render("about", { fortune: fortune.getFortune() });

exports.notFound = (req, res) => res.render("404");

// Express recognizes the error handler by way of its four
// argumetns, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render("500");
/* eslint-enable no-unused-vars */

exports.home = (req, res) => res.render("home");

// **** these handlers are for browser-submitted forms
exports.newsletterSignup = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render("newsletter-signup", { csrf: "CSRF token goes here" });
};
exports.newsletterSignupProcess = (req, res) => {
  console.log("CSRF token (from hidden form field): " + req.body._csrf);
  console.log("Name (from visible form field): " + req.body.name);
  console.log("Email (from visible form field): " + req.body.email);
  res.redirect(303, "/newsletter-signup/thank-you");
};
exports.newsletterSignupThankYou = (req, res) =>
  res.render("newsletter-signup-thank-you");
// **** end browser-submitted form handlers

// **** these handlers are for fetch/JSON form handlers
exports.newsletter = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render("newsletter", { csrf: "CSRF token goes here" });
};
exports.api = {};

exports.api.newsletterSignup = (req, res) => {
  console.log("CSRF token (from hidden form field): " + req.body._csrf);
  console.log("Name (from visible form field): " + req.body.name);
  console.log("Email (from visible form field): " + req.body.email);
  res.send({ result: "success" });
};

exports.listVacations = async (req, res) => {
  const vacations = await db.getVacations({ available: true });
  const currency = req.session.currency || "USD";
  const context = {
    currency: currency,
    vacations: vacations.map((vacation) => {
      return {
        sku: vacation.sku,
        name: vacation.name,
        description: vacation.description,
        inSeason: vacation.inSeason,
        price: convertFromUSD(vacation.price, currency),
        qty: vacation.qty,
      };
    }),
  };
  res.render("vacations", context);
};
// **** end fetch/JSON form handlers

const pathUtils = require("path");
const fs = require("fs");

// create directory to store vacation photos (if it doesn't already exist)
const dataDir = pathUtils.resolve(__dirname, "..", "data");
const vacationPhotosDir = pathUtils.join(dataDir, "vacation-photos");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(vacationPhotosDir)) fs.mkdirSync(vacationPhotosDir);

function saveContestEntry(contestName, email, year, month, photoPath) {
  // TODO...this will come later
}

// i'll want these promise-based versions of fs functions in async function
const { promisify } = require("util");
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);

exports.api.vacationPhotoContest = async (req, res, fields, files) => {
  const photo = files.photo[0];
  const dir = vacationPhotosDir + "/" + Date.now();
  const path = dir + "/" + photo.originalFilename;
  await mkdir(dir);
  await rename(photo.path, path);
  saveContestEntry(
    "vacation-photo",
    fields.email,
    req.params.year,
    req.params.month,
    path
  );
  res.send({ result: "success" });
};

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log("field data: ", fields);
  console.log("files: ", files);
  res.redirect(303, "/contest/vacation-photo-thank-you");
};
