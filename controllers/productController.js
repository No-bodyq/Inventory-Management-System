import db from "../config/db.js";

// Add a new product
const addProduct = async (req, res) => {
  const { name, description, price, quantity, supplier_id } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO Products (name, description, price, quantity, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, price, quantity, supplier_id]
    );
    res.status(201).json({ message: "Product added", product: result.rows[0] });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Error adding product" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Products");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM Products WHERE product_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Update a product's information
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, supplier_id } = req.body;
  try {
    const result = await db.query(
      "UPDATE Products SET name = $1, description = $2, price = $3, quantity = $4, supplier_id = $5 WHERE product_id = $6 RETURNING *",
      [name, description, price, quantity, supplier_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated", product: result.rows[0] });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM Products WHERE product_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted", product: result.rows[0] });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
