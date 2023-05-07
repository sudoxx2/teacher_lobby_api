const express = require("express");
const router = express.Router();

const UserMain = require("../Models/UserModel");

router.get("/", async (req, res) => {
  try {
    const users = await UserMain.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// get a user
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;
