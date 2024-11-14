import db from "../config/db.js";

// Add a new customer
const addCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    await db.connect();

    const result = await db.query(
      "INSERT INTO Customers (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, address]
    );
    res
      .status(201)
      .json({ message: "Customer added", customer: result.rows[0] });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ error: "Error adding customer" });
  } finally {
    db.end();
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    await db.connect();

    const result = await db.query("SELECT * FROM Customers");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Error fetching customers" });
  } finally {
    db.end();
  }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
  const { customerId } = req.params;
  try {
    await db.connect();

    const result = await db.query(
      "SELECT * FROM Customers WHERE customer_id = $1",
      [customerId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Error fetching customer" });
  } finally {
    db.end();
  }
};

// Update a customer's information
const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    await db.connect();

    const result = await db.query(
      "UPDATE Customers SET name = $1, email = $2, phone = $3, address = $4 WHERE customer_id = $5 RETURNING *",
      [name, email, phone, address, customerId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res
      .status(200)
      .json({ message: "Customer updated", customer: result.rows[0] });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Error updating customer" });
  } finally {
    db.end();
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    await db.connect();

    const result = await db.query(
      "DELETE FROM Customers WHERE customer_id = $1 RETURNING *",
      [customerId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res
      .status(200)
      .json({ message: "Customer deleted", customer: result.rows[0] });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Error deleting customer" });
  } finally {
    db.end();
  }
};

export {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
