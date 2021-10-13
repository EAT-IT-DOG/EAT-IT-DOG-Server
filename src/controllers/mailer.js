import nodemailer from "nodemailer";

export const notFoundMailer = (food) => {
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

export const postMailer = (
  foodName,
  safetyLevel,
  safetyGrade,
  edible,
  symptom,
  feedMethod,
  ingredient,
  barcodeNumber
) => {
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
    subject: `POST : 먹어보시개(Eat it dog) DB에 등록한 음식 ${foodName}`,
    text: `등록한 음식 정보
    이름 : ${foodName}
    안전레벨 : ${safetyLevel}
    안전등급 : ${safetyGrade}
    섭취여부 : ${edible}
    증상 : ${symptom}
    섭취방법 : ${feedMethod}
    효능 : ${ingredient}
    바코드 : ${barcodeNumber}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};
