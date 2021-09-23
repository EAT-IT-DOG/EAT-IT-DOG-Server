import express from "express";
import morgan from "morgan";
import {
  getByBarcode,
  getByFoodname,
  getFoodList,
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

// 음식 이름 리스트 조회
app.get("/list", getFoodList);

// 음식 등록
app.post("/foods", postFood);

export default app;
