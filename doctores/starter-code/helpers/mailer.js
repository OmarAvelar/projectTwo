require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'omar.avelar.f@gmail.com',
    pass: 'addodd902347abd.'
  },
  });

exports.welcomeMail = (username, email) => {
  transporter
    .sendMail({
      from: "Doctores",
      to: email,
      subject: "Welcome",
      html: `
      <h2>bienvenido ${username} </h2>
    `
    })
    .then(info => {
      console.log(info);
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};