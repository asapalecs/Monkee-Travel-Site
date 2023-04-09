const nodemailer = require('nodemailer')

const credentials = require('./credentials')

const mailTransport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password,
  },
})

async function go() {
    try {
      const result = await mailTransport.sendMail({
        from: '"Monkee Travel" <info@monkeetravel.com>',
        to: 'asapalecs@gmail.com',
        subject: 'Your Monkee Travel Tour',
        text: 'Thank you for booking your trip with Monkee Travel.  ' +
          'We look forward to your visit!',
      })
      console.log('mail sent successfully: ', result)
    } catch(err) {
      console.log('could not send mail: ' + err.message)
    }
  }
  
  go()