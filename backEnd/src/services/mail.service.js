import nodemailer from "nodemailer";
import { PASS_NODEMAILER, USER_NODEMAILER } from "../config/auth.config.js";

class MailService {
  async sendMailToNotifyMe(messageContent) {

    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: USER_NODEMAILER,
        pass: PASS_NODEMAILER,
      },
    });

    const mailTemplate = `
    <h1>You received a message from your portfolio!</h1>
  
  <p>FROM: ${messageContent.name}</p>
  <br/>
  <p>E-Mail: ${messageContent.email}</p
  <br/>
  <p>FROM: ${messageContent.message}</p>`;

    const mailOptions = {
      from: "My Portfolio",
      to: "migue.arenas91@gmail.com",
      subject: "You received a message from your portfolio",
      html: mailTemplate,
    };

    try {
      const result = await transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`error sending mail: ${error}`);
        } else {
          console.log(`mail succesfully send ${info.response}`);
        }
      })
      return result
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

const mailService = new MailService();
export default mailService;
