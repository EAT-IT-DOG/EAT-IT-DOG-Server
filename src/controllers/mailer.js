import nodemailer from "nodemailer";

export const mailer = (food) => {
  const transporter = nodemailer.createTransport({
    secure: false,
    service: "Gmail",
    auth: {
      user: "eatitdog13@gmail.com",
      pass: process.env.EMAIL_PW,
    },
  });

  const mailOptions = {
    from: "eatitdog13@gmail.com",
    to: "eatitdog13@gmail.com",
    subject: "먹어보시개(Eat it dog) 찾지 못한 음식",
    text: `찾지 못한 음식 이름이나 바코드 : ${food}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};
