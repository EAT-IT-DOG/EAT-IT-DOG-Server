import express from "express";
import {
  getByBarcode,
  getByFoodname,
  getDislike,
  getFoodList,
  getLike,
  postFood,
  postAnimalHospital,
  getFoodDetails,
} from "./controllers/foodController";

const rootRouter = express.Router();

// 바코드 번호로 음식 조회, 객체 반환
rootRouter.get("/barcodes/:barcodenum", getByBarcode);

// 음식 이름으로 음식 조회, 객체 반환
rootRouter.get("/search/:foodname", getByFoodname);

// 음식에 따라 도움이 된 여부
rootRouter.get("/like/:id", getLike);
rootRouter.get("/dislike/:id", getDislike);

// 음식 이름 리스트 조회
rootRouter.get("/list", getFoodList);

// 음식 DB 상세 조회
rootRouter.get("/detail", getFoodDetails);

// 인근 동물병원 조회
rootRouter.post("/hospital", postAnimalHospital);

// 음식 등록
rootRouter.post("/foods", postFood);

export default rootRouter;
