import express from "express";
import morgan from "morgan";
import Food from "./models/Food";

const app = express();
const logger = morgan("dev");

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.get("/barcodes/:id", async (req, res) => {
  const id = req.params.id;
  const food = await Food.findOne({ barcodeNumber: id }).exec();
  if (!food) {
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
  const foodID = food._id;
  return res.status(200).json({
    foodID: foodID,
    status: 200,
  });
});

app.get("/foods/:id([0-9a-f]{24})", async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);
  if (!food) {
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
  // const json = JSON.stringify(food);
  return res.status(200).json({ food, status: 200 });
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
