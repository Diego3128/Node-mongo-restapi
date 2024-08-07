import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// import different routes
import testRoutes from "./routes/test.routes.js";
import indexRoutes from "./routes/index.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();
//print request
app.use(morgan("dev"));
// allow cors for all routes
app.use(cors()); 
// allow json body parsing
app.use(express.json());

// routes
app.use("/products", productsRoutes);

app.use("/test", testRoutes);

app.use(indexRoutes);
// manage non-existen URLs
app.use((req, res) => {
  res.status(404).json({ message: `${req.url} was not found` });
});

export default app;
