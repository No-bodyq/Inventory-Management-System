import db from "../config/db.js";

// Add a new order
const addOrder = async (req, res) => {
  const { customer_id, status } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO Orders (customer_id, status) VALUES ($1, $2) RETURNING *",
      [customer_id, status]
    );
    res.status(201).json({ message: "Order created", order: result.rows[0] });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Orders");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM Orders WHERE order_id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Error fetching order" });
  }
};

// Update an order's status
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await db.query(
      "UPDATE Orders SET status = $1 WHERE order_id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated", order: result.rows[0] });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Error updating order" });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM Orders WHERE order_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted", order: result.rows[0] });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Error deleting order" });
  }
};

export { addOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
