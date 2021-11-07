const express = require("express");
const cors = require("cors");
const { HttpError } = require("../utils/helper");

const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/user");
const categoryRoutes = require("../routes/category");
const productRoutes = require("../routes/product");
const orderRoutes = require("../routes/order");

async function expressAppLoader(appInstance) {

  appInstance.use(express.json());
  appInstance.use(
    cors({
      origin: process.env.FRONTEND_BASE_URL,
      optionsSuccessStatus: 200,
    })
  );
  appInstance.disable("x-powered-by");

  // Health check route;
  appInstance.get("/status", (_, res) => {
    res.json({
      status: "SUCCESS",
      data: {},
      message: "Running...",
    });
  });

  appInstance.use("/auth", authRoutes);
  appInstance.use("/users", userRoutes);
  appInstance.use("/categories", categoryRoutes);
  appInstance.use("/products", productRoutes);
  appInstance.use("/orders", orderRoutes);

  // catch 404 and forward to error handler
  appInstance.use((req, res, next) => {
    const err = new HttpError(404, "Not Found");
    next(err);
  });

  // Error Handelling
  appInstance.use((err, req, res, next) => {
    if (err) {
      if (!err.statusCode) {
        err.statusCode = err.name === "UnauthorizedError" ? 401 : 400;
      }
      return res.status(err.statusCode).json({
        status: "ERROR",
        data: {},
        message: err.message,
      });
    }
    next();
  });

}

module.exports = expressAppLoader;
