import express from "express";
import {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/").get(getAllOrders).post(addOrder);

orderRouter
  .route("/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

export default orderRouter;
