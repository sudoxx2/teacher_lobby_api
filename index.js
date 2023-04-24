require("dotenv").config();
const express = require("express");
const app = express();

// Using Node.js `require()`
const mongoose = require("mongoose");
const UserMain = require("./models/UserModel");

const PORT = 8080;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await UserMain.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
// get a user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await UserMain.findById(id);
    res.status(200).json(User);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// create a user
app.post("/user", async (req, res) => {
  try {
    const User = await UserMain.create(req.body);
    res.status(200).json(User);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }

  console.log(req.body);
  // res.send(req.body);
});

// update a user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await UserMain.findByIdAndUpdate(id, req.body);
    // we cannot find any User in database
    if (!User) {
      return res
        .status(404)
        .json({ message: `cannot find any User with ID ${id}` });
    }
    const updatedUser = await UserMain.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await UserMain.findByIdAndDelete(id);
    if (!User) {
      return res
        .status(404)
        .json({ message: `cannot find any User with ID ${id}` });
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
