import { getToday } from "./utils.js";
import nodemailer from "nodemailer";

export function checkEmail(myEmil) {
  if (myEmil === undefined || myEmil.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, email, personal, prefer, phone }) {
  const myTemplate = `
        <html>
            <body>
                <h1>이름: ${name}</h1>
                <div>이메일: ${email}</div>
                <div>주민등록번호: ${personal}</div>
                <div>선호하는 사이트: ${prefer}</div>
                <div>휴대폰 번호: ${phone}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `;
  // console.log(myTemplate)
  return myTemplate;
}

export async function sendTemplateToEmail(myEmail, myTemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: myEmail,
    subject: "전송완료!!!",
    html: myTemplate,
  });
  console.log(result);
}
