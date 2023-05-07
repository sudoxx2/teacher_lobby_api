require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8080;

const userRoute = require("./Routes/User");

app.use("/user", userRoute);

// Using Node.js `require()`
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PASS +
      "@teacherlobbyapi.yc7jlo3.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected!"))
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`));
