import express from "express";
import {
  addOrderItem,
  getAllOrderItems,
  getOrderItemsByOrderId,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItemController.js";

const orderItemRouter = express.Router();

orderItemRouter.route("/").get(getAllOrderItems).post(addOrderItem);

orderItemRouter
  .route("/:order_item_id")
  .get(getOrderItemsByOrderId)
  .put(updateOrderItem)
  .delete(deleteOrderItem);

export default orderItemRouter;
