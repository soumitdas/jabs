if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((e) => console.error(e));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    optionsSuccessStatus: 200,
  })
);
app.disable("x-powered-by");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  next(err);
});

// Error Handelling
app.use((err, req, res, next) => {
  if (err) {
    const statusCode = err.name === "UnauthorizedError" ? 401 : 400;

    return res.status(statusCode).json({
      status: "ERROR",
      data: {},
      message: err.message,
    });
  }
  next();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}...`));
