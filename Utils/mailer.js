module.exports = function () {
  const nodemailer = require('nodemailer')
  require('dotenv').config()

  this.Mailer = (emailTo, subject, mailBody) => {
    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })

    var mailOptions = {
      from: process.env.SMTP_USER,
      to: emailTo,
      subject: subject,
      text: mailBody
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Email Not sent: ' + error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
  this.MailerNew = (smtp, emailTo, subject, mailBody) => {
    var transporter = nodemailer.createTransport({
      host: smtp.SMTP_SERVER,
      port: smtp.SMTP_PORT,
      secure: smtp.SMTP_SECURE,
      auth: {
        user: smtp.SMTP_USER,
        pass: smtp.SMTP_PASSWORD
      }
    })

    var mailOptions = {
      from: smtp.SMTP_USER,
      to: emailTo,
      subject: subject,
      text: subject,
      html: mailBody
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Email Not sent: ' + error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}
