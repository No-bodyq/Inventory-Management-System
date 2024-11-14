import express from "express";
import morgan from "morgan";
import cors from "cors";

import customerRouter from "./routes/customerRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Hello",
  });
});

app.use("/api/v1/customer", customerRouter);

export default app;
