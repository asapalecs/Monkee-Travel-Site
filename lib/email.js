//here we're encapsulating Email Functionality
//we send it with email-library.js
const nodemailer = require('nodemailer')
const htmlToFormattedText = require('html-to-formatted-text')

module.exports = credentials => {

	const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
      user: credentials.sendgrid.user,
      pass: credentials.sendgrid.password,
    },
	})

	const from = '"Monkee Travel" <info@monkeetravel.com>'
	const errorRecipient = 'youremail@gmail.com'

	return {
    send: (to, subject, html) => 
      mailTransport.sendMail({
        from,
        to,
        subject,
        html,
        text: htmlToFormattedText(html),
      }),
  }
}