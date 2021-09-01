import express from "express";
import morgan from "morgan";
import Food from "./models/Food";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.get("/foods/:id([0-9a-f]{24})", async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);
  if (!food) {
    return res.status(404).json({ error: "검색 결과를 찾을 수 없습니다 );" });
  }
  return res.json(food);
});

export default app;
