import db from "../config/db.js";

// Add a new order item
const addOrderItem = async (req, res) => {
  const { order_id, product_id, quantity, unit_price } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO Order_Items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [order_id, product_id, quantity, unit_price]
    );
    res
      .status(201)
      .json({ message: "Order item added", orderItem: result.rows[0] });
  } catch (error) {
    console.error("Error adding order item:", error);
    res.status(500).json({ error: "Error adding order item" });
  }
};

// Get all order items
const getAllOrderItems = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Order_Items");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ error: "Error fetching order items" });
  }
};

// Get order items by order ID
const getOrderItemsByOrderId = async (req, res) => {
  const { order_id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM Order_Items WHERE order_id = $1",
      [order_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order items not found" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ error: "Error fetching order items" });
  }
};

// Update an order item
const updateOrderItem = async (req, res) => {
  const { order_item_id } = req.params;
  const { order_id, product_id, quantity, unit_price } = req.body;

  try {
    const result = await db.query(
      "UPDATE Order_Items SET order_id = $1, product_id = $2, quantity = $3, unit_price = $4 WHERE order_item_id = $5 RETURNING *",
      [order_id, product_id, quantity, unit_price, order_item_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res
      .status(200)
      .json({ message: "Order item updated", orderItem: result.rows[0] });
  } catch (error) {
    console.error("Error updating order item:", error);
    res.status(500).json({ error: "Error updating order item" });
  }
};

// Delete an order item
const deleteOrderItem = async (req, res) => {
  const { order_item_id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM Order_Items WHERE order_item_id = $1 RETURNING *",
      [order_item_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res
      .status(200)
      .json({ message: "Order item deleted", orderItem: result.rows[0] });
  } catch (error) {
    console.error("Error deleting order item:", error);
    res.status(500).json({ error: "Error deleting order item" });
  }
};

export {
  addOrderItem,
  getAllOrderItems,
  getOrderItemsByOrderId,
  updateOrderItem,
  deleteOrderItem,
};
