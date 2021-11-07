const mongoose = require("mongoose");

async function mongooseLoader() {
  const dbConnection = mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB Connected..."));
    
    return dbConnection;
}

module.exports = mongooseLoader;
