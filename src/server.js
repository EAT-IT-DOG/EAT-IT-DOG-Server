import express from "express";
import morgan from "morgan";
import Food from "./models/Food";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 바코드 번호로 음식 조회, 객체 반환
app.get("/barcodes/:barcodenum", async (req, res) => {
  const barcodenum = req.params.barcodenum;
  const food = await Food.findOne({ barcodeNumber: barcodenum }).exec();
  if (!food) {
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
  return res.status(200).json({
    food,
    status: 200,
  });
});

// 음식 이름으로 음식 조회, 객체 반환
app.get("/search/:foodname", async (req, res) => {
  const foodname = decodeURI(req.params.id);
  const food = await Food.findOne({ foodName: foodname }).exec();
  if (!food) {
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
  return res.status(200).json({
    food,
    status: 200,
  });
});

// 음식 등록
app.post("/foods", async (req, res) => {
  const {
    foodName,
    safetyLevel,
    safetyGrade,
    edible,
    symptom,
    feedMethod,
    ingredient,
    barcodeNumber,
  } = req.body;
  try {
    await Food.create({
      foodName,
      safetyLevel,
      safetyGrade,
      edible,
      symptom,
      feedMethod,
      ingredient,
      barcodeNumber,
    });
    return res.status(200).json({
      status: 200,
      message: "Succeed to add new food",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      error: "Registration failed, Please try again.",
    });
  }
});

export default app;
