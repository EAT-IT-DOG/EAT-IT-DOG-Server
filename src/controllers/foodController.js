import Food from "../models/Food";
import { notFoundMailer, postMailer } from "./mailer";
import { PythonShell } from "python-shell";

export const getByBarcode = async (req, res) => {
  const barcodenum = req.params.barcodenum;
  const food = await Food.findOne({ barcodeNumber: barcodenum }).exec();
  if (!food) {
    notFoundMailer(barcodenum);
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
  return res.status(200).json({
    food,
    status: 200,
  });
};

export const getByFoodname = async (req, res) => {
  const foodname = decodeURI(req.params.foodname);
  const food = await Food.findOne({ foodName: foodname }).exec();
  if (!food) {
    notFoundMailer(foodname);
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
  return res.status(200).json({
    food,
    status: 200,
  });
};

export const getFoodList = async (req, res) => {
  let foods = [];
  const foodObjects = await Food.find({});
  for (var i = 0; foodObjects[i] != null; i++) {
    foods.push(foodObjects[i].foodName);
  }
  return res.status(200).json({
    foods,
  });
};

export const getLike = async (req, res) => {
  const { id } = req.params;
  const food = await Food.find({ _id: id });
  if (!food) {
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
};

export const getDislike = async (req, res) => {
  const { id } = req.params;
  const food = await Food.find({ _id: id });
  if (!food) {
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
};

export const postAnimalHospital = async (req, res) => {
  const { latitude, longitude } = req.body;

  let options = {
    mode: "text",
    scriptPath: "./",
    pythonOptions: ["-u"],
    args: [String(latitude), String(longitude)],
    encoding: "utf8",
  };

  PythonShell.run("scrapHospital.py", options, function (err, results) {
    if (err) {
      return res.status(400).json({ error: "Cannot find", status: 400 });
    }
    let data = results[0].replace(`b\'`, "").replace(`\'`, "");
    let buff = Buffer.from(data, "base64");
    let text = buff.toString("utf-8");
    console.log(text);
  });

  return res.status(200).json({
    status: 200,
    message: "Succeed to find nearby animal hospital.",
  });
};

export const postFood = async (req, res) => {
  const {
    foodName,
    safetyLevel,
    safetyGrade,
    edible,
    symptom,
    feedMethod,
    ingredient,
    barcodeNumber,
    password,
  } = req.body;
  if (password !== process.env.POST_PW) {
    return res.status(400).json({
      status: 400,
      message: "Post Password is incorrect.",
    });
  }
  const food = await Food.findOne({ foodName });
  if (food) {
    food.foodName = foodName;
    food.safetyLevel = safetyLevel;
    food.safetyGrade = safetyGrade;
    food.edible = edible;
    food.symptom = symptom;
    food.feedMethod = feedMethod;
    food.ingredient = ingredient;
    food.barcodeNumber = barcodeNumber;
    await food.save();
    return res.status(200).json({
      status: 200,
      message: "Succeed to update a food",
    });
  }
  const barcodeExists = await Food.exists({ barcodeNumber });
  if (barcodeExists) {
    return res.status(400).json({
      status: 400,
      error: "Barcode Number is already in use.",
    });
  }
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
    postMailer(
      foodName,
      safetyLevel,
      safetyGrade,
      edible,
      symptom,
      feedMethod,
      ingredient,
      barcodeNumber
    );
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
};
