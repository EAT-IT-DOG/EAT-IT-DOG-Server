import express from "express";
import morgan from "morgan";
import {
  getByBarcode,
  getByFoodname,
  getDislike,
  getFoodList,
  getLike,
  postFood,
} from "./controllers/foodController";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 바코드 번호로 음식 조회, 객체 반환
app.get("/barcodes/:barcodenum", getByBarcode);

// 음식 이름으로 음식 조회, 객체 반환
app.get("/search/:foodname", getByFoodname);

// 음식에 따라 도움이 된 여부
app.get("/like/:id", getLike);
app.get("/dislike/:id", getDislike);

// 음식 이름 리스트 조회
app.get("/list", getFoodList);

// 음식 등록
app.post("/foods", postFood);

export default app;
