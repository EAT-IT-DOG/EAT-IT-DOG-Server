import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  safetyLevel: { type: Number, required: true },
  safetyGrade: { type: String, required: true },
  edible: { type: String, required: true },
  symptom: { type: String },
  feedMethod: { type: String },
  ingredient: { type: String },
  barcodeNumber: { type: Number, required: true },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
