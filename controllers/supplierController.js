import db from "../config/db.js";

// Add a new supplier
const addSupplier = async (req, res) => {
  const { name, contact_name, phone, email, address } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO Suppliers (name, contact_name, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, contact_name, phone, email, address]
    );
    res
      .status(201)
      .json({ message: "Supplier added", supplier: result.rows[0] });
  } catch (error) {
    console.error("Error adding supplier:", error);
    res.status(500).json({ error: "Error adding supplier" });
  }
};

// Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Suppliers");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ error: "Error fetching suppliers" });
  }
};

// Get a supplier by ID
const getSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM Suppliers WHERE supplier_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching supplier:", error);
    res.status(500).json({ error: "Error fetching supplier" });
  }
};

// Update a supplier's information
const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, contact_name, phone, email, address } = req.body;

  try {
    const result = await db.query(
      "UPDATE Suppliers SET name = $1, contact_name = $2, phone = $3, email = $4, address = $5 WHERE supplier_id = $6 RETURNING *",
      [name, contact_name, phone, email, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res
      .status(200)
      .json({ message: "Supplier updated", supplier: result.rows[0] });
  } catch (error) {
    console.error("Error updating supplier:", error);
    res.status(500).json({ error: "Error updating supplier" });
  }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM Suppliers WHERE supplier_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res
      .status(200)
      .json({ message: "Supplier deleted", supplier: result.rows[0] });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    res.status(500).json({ error: "Error deleting supplier" });
  }
};

export {
  addSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
