import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import customerRouter from "./routes/customerRoutes.js";
import productRouter from "./routes/productRoutes.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import categoryRouter from "./routes/categoryRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import orderItemRouter from "./routes/orderItemRoutes.js";
import inventoryMovementRouter from "./routes/inventoryMovementRoutes.js";
import userRouter from "./routes/userRoutes.js";

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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/supplier", categoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/order-item", orderItemRouter);
app.use("/api/v1/inventory-movement", inventoryMovementRouter);
export default app;
