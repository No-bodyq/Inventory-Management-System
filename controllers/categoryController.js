import db from "../config/db.js";

const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO Categories (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res
      .status(201)
      .json({ message: "Category added", category: result.rows[0] });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Error adding category" });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM Categories ORDER BY category_id"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM Categories WHERE category_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Error fetching category" });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const result = await db.query(
      "UPDATE Categories SET name = $1, description = $2 WHERE category_id = $3 RETURNING *",
      [name, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated", category: result.rows[0] });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Error updating category" });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM Categories WHERE category_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category deleted", category: result.rows[0] });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Error deleting category" });
  }
};

export {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
