import mongoose from "mongoose";

const writingSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  safetyLv: { type: Number, required: true },
  safetyGrade: { type: String, required: true },
  edible: { type: String, required: true },
  sympton: { type: String },
  feedMethod: { type: String },
  ingredient: { type: String },
  barcodeNumber: { type: Number, required: true },
});
