import express from "express";
import {
  addInventoryMovement,
  getAllInventoryMovements,
  getInventoryMovementsByProductId,
  updateInventoryMovement,
  deleteInventoryMovement,
} from "../controllers/inventoryMovementController.js";

const inventoryMovementRouter = express.Router();

inventoryMovementRouter
  .route("/")
  .get(getAllInventoryMovements)
  .post(addInventoryMovement);

inventoryMovementRouter
  .route("/:movement_id")
  .get(getInventoryMovementsByProductId)
  .put(updateInventoryMovement)
  .delete(deleteInventoryMovement);

export default inventoryMovementRouter;
