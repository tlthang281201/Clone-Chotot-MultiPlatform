import express from "express";
import clothes from "./data/Clothes.js";
import users from "./data/users.js";
import User from "./Model/UserModel.js";
import asyncHandler from "express-async-handler";
import Clothe from "./Model/ClothesModel.js";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/product",
  asyncHandler(async (req, res) => {
    await Clothe.remove({});
    const importProduct = await Clothe.insertMany(clothes);
    res.send({ importProduct });
  })
);

export default ImportData;
