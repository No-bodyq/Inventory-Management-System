import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import customerRouter from "./routes/customerRoutes.js";
import productRouter from "./routes/productRoutes.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Hello",
  });
});

app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/product", productRouter);

export default app;
