import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products
    ORDER BY created_at DESC`;
    console.log("fetched products", products);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, price } = req.body; // Destructuring the request body with the use of express.json() middleware in server.js file
  if (!name || !image || !price) {
    return res.status(400).json({
      success: false,
      error: "All fields are required",
    });
  }
  try {
    const product = await sql`
        INSERT INTO products (name, image, price)
        VALUES (${name}, ${image}, ${price})
        RETURNING *`;
    console.log("created product", product);
    res.status(201).json({
      success: true,
      data: product[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sql`SELECT * FROM products WHERE id = ${id}`;
    console.log("fetched product", product);
    res.status(200).json({
      success: true,
      data: product[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;

  try {
    const product = await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}
            WHERE id = ${id}
            RETURNING *`;
    if (product.length === 0) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    console.log("updated product", product);
    res.status(200).json({
      success: true,
      data: product[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sql`
                DELETE FROM products
                WHERE id = ${id}
                RETURNING *`;
    if (product.length === 0) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    console.log("deleted product", product);
    res.status(200).json({
      success: true,
      data: product[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
