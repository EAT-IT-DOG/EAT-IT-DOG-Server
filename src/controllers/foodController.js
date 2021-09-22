import Food from "../models/Food";

export const getByBarcode = async (req, res) => {
  const barcodenum = req.params.barcodenum;
  const food = await Food.findOne({ barcodeNumber: barcodenum }).exec();
  if (!food) {
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
    return res.status(404).json({ error: "Not found.", status: 404 });
  }
  return res.status(200).json({
    food,
    status: 200,
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
};
