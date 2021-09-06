import express from "express";
import morgan from "morgan";
import Food from "./models/Food";

const app = express();
const logger = morgan("dev");

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.get("/foods/:id([0-9a-f]{24})", async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);
  if (!food) {
    return res.status(404).json({ error: "검색 결과를 찾을 수 없습니다 );" });
  }
  const json = JSON.stringify(food);
  return res.status(200).json(json);
});
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
    console.log("try문 진입!!");
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
    return res.status(400).json({
      status: 400,
      error: "Registration failed, Please try again.",
    });
  }
});

export default app;
