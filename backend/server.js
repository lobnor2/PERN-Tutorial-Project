import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//ALL ROUTES
//apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, //specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({
          success: false,
          error: "Too many requests",
        });
      } else if (decision.reason.isBot()) {
        res.status(403).json({
          success: false,
          error: "Bot detected",
        });
      } else {
        res.status(403).json({
          success: false,
          error: "Forbidden",
        });
      }
      return;
    }

    //check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({
        success: false,
        error: "Spoofed bot detected",
      });
      return;
    }

    next(); //proceed to the next middleware
  } catch (error) {
    console.error(error);
    next(error);
  }
});
app.use("/api/products", productRoutes);

//Initializes database connection
const initDB = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;
    console.log("Database initialized successfully");
  } catch (err) {
    console.error(err);
  }
};

initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
