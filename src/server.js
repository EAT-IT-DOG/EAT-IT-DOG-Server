import express from "express";
import morgan from "morgan";
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
import rootRouter from "./routers/rootRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);

export default app;
