if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongooseLoader = require("./loaders/mongoose");
const expressAppLoader = require("./loaders/express");

async function startApplication() {
  try {
    const app = express();

    await mongooseLoader();
    await expressAppLoader(app);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}...`));
  } catch (error) {
    console.error("Server starting failed");
    console.error(error);
    process.exit();
  }
}

startApplication();




