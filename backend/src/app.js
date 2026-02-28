
import "dotenv/config";
import express from "express";
import cors from "cors";

import authMiddleware from "./middleware/auth.middleware.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";





const app = express();

app.use(cors());
app.use(express.json());


// ✅ PUBLIC ROUTES (NO AUTH REQUIRED)

app.use("/auth", authRoutes);

// ✅ PROTECTED ROUTES (AUTH REQUIRED)
app.use(authMiddleware);
app.use("/users", userRoutes);
app.use("/invoices", invoiceRoutes);

app.use("/admin", adminRoutes);
app.use("/vendors", vendorRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("PayTrack backend running");
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
