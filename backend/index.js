import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { Token } from "./models/token.model.js";
import { User } from "./models/user.model.js";
import { createMessage } from "./scraping.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/tokens/phone", async (req, res) => {
  const result = await Token.find();
  res.send(result);
});

// 회원가입 API
app.post("/users", async (req, res) => {
  const { name, email, personal, prefer, pwd, phone } = req.body;
  const og = await createMessage(prefer);
  console.log(og);

  //주민번호 ** 만들기
  const userData = await new User({
    name,
    email,
    personal,
    prefer,
    pwd,
    phone,
    og: {
      title: og["og:title"],
      description: og["og:description"],
      image: og["og:image"],
    },
  });
  const token = await Token.findOne({ phone: phone }, { isAuth: true });
  const isValid = checkEmail(email);

  if (isValid === false) {
    res.status(422).send("이메일 확인 제대로 해주세요");
  }
  if (!token) {
    res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.");
  }
  await userData.save();

  const myTemplate = getWelcomeTemplate({
    name,
    email,
    personal,
    prefer,
    phone,
  });
  sendTemplateToEmail(email, myTemplate);

  const userId = await User.findOne({ phone: phone });
  console.log(userId);
  res.send(userId._id);
});

// 회원 목록 조회 API
app.get("/users", async (req, res) => {
  const result = await User.find();
  console.log(result);
  res.send(result);
});

// 토큰 인증 요청 API
app.post("/tokens/phone", async (req, res) => {
  const mytoken = getToken();
  const phoneNum = req.body.phone;

  const token = new Token({
    token: mytoken,
    phone: phoneNum,
    isAuth: false,
  });
  const result = await Token.findOne({ phone: phoneNum });
  if (!result) {
    await token.save();
  } else {
    await Token.updateOne({ phone: phoneNum }, { token: mytoken });
  }
  console.log(result);
  sendTokenToSMS(phoneNum, mytoken);
  res.send(`${phoneNum}으로 인증 문자가 전송되었습니다.`);
});

// 인증 완료 API
app.patch("/tokens/phone", async (req, res) => {
  const result = await Token.findOne({ phone: req.body.phone });
  if (!result) {
    res.send("false");
  } else if (result.token === req.body.token) {
    await Token.updateOne({ phone: req.body.phone }, { isAuth: true });
    res.send("true");
  }
  console.log(req.body.token);
});

// db 접속 포트 27017
mongoose
  .connect("mongodb://my-database:27017/mydocker10")
  .then(() => {
    console.log("db 접속 성공");
  })
  .catch(() => {
    console.log("db 접속 실패");
  });

// 포트 3000
app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});
