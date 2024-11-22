import db from "../config/db.js";

// Add a new inventory movement
const addInventoryMovement = async (req, res) => {
  const { product_id, movement_type, quantity, remarks } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO Inventory_Movements (product_id, movement_type, quantity, remarks) VALUES ($1, $2, $3, $4) RETURNING *",
      [product_id, movement_type, quantity, remarks]
    );
    res
      .status(201)
      .json({ message: "Inventory movement added", movement: result.rows[0] });
  } catch (error) {
    console.error("Error adding inventory movement:", error);
    res.status(500).json({ error: "Error adding inventory movement" });
  }
};

// Get all inventory movements
const getAllInventoryMovements = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Inventory_Movements");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching inventory movements:", error);
    res.status(500).json({ error: "Error fetching inventory movements" });
  }
};

// Get inventory movements for a specific product
const getInventoryMovementsByProductId = async (req, res) => {
  const { product_id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM Inventory_Movements WHERE product_id = $1",
      [product_id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No inventory movements found for this product" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching inventory movements:", error);
    res.status(500).json({ error: "Error fetching inventory movements" });
  }
};

// Update an inventory movement
const updateInventoryMovement = async (req, res) => {
  const { movement_id } = req.params;
  const { product_id, movement_type, quantity, remarks } = req.body;

  try {
    const result = await db.query(
      "UPDATE Inventory_Movements SET product_id = $1, movement_type = $2, quantity = $3, remarks = $4 WHERE movement_id = $5 RETURNING *",
      [product_id, movement_type, quantity, remarks, movement_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Inventory movement not found" });
    }
    res
      .status(200)
      .json({
        message: "Inventory movement updated",
        movement: result.rows[0],
      });
  } catch (error) {
    console.error("Error updating inventory movement:", error);
    res.status(500).json({ error: "Error updating inventory movement" });
  }
};

// Delete an inventory movement
const deleteInventoryMovement = async (req, res) => {
  const { movement_id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM Inventory_Movements WHERE movement_id = $1 RETURNING *",
      [movement_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Inventory movement not found" });
    }
    res
      .status(200)
      .json({
        message: "Inventory movement deleted",
        movement: result.rows[0],
      });
  } catch (error) {
    console.error("Error deleting inventory movement:", error);
    res.status(500).json({ error: "Error deleting inventory movement" });
  }
};

export {
  addInventoryMovement,
  getAllInventoryMovements,
  getInventoryMovementsByProductId,
  updateInventoryMovement,
  deleteInventoryMovement,
};
