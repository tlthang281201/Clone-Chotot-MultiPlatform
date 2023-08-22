import asyncHandler from "express-async-handler";
import express from "express";
import User from "../Model/UserModel.js";

const userRoutes = express.Router();
// login
userRoutes.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        rating: user.rating,
        numReviews: user.numReviews,
        avatar: user.avatar,
        reviews: user.reviews,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Sai thông tin đăng nhập");
    }
  })
);

// register
userRoutes.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;
    const userExits = await User.findOne({ email });
    const phoneExits = await User.findOne({ phone });
    if (userExits && phoneExits) {
      res.status(400);
      throw new Error("Số điện thoại và email bị trùng lặp");
    }
    if (userExits) {
      res.status(400);
      throw new Error("Email bị trùng lặp");
    }
    if (phoneExits) {
      res.status(400);
      throw new Error("Số điện thoại bị trùng lặp");
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        rating: user.rating,
        numReviews: user.numReviews,
        reviews: user.reviews,
        createdAt: user.createdAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

// profile
userRoutes.get(
  "/profile/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        rating: user.rating,
        numReviews: user.numReviews,
        reviews: user.reviews,
        avatar: user.avatar,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRoutes.put(
  "/profile",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
      if (req.body.avatar) {
        user.avatar = req.body.avatar || user.avatar;
      } else {
        user.password = req.body.password;
      }
      const userupdated = await user.save();
      res.json({
        _id: userupdated._id,
        name: userupdated.name,
        email: userupdated.email,
        phone: userupdated.phone,
        isAdmin: userupdated.isAdmin,
        rating: userupdated.rating,
        numReviews: userupdated.numReviews,
        avatar: userupdated.avatar,
        reviews: userupdated.reviews,
        createdAt: userupdated.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRoutes.put(
  "/review",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.sellerId);
    if (user) {
      user.rating = user.rating + req.body.rating;
      user.numReviews = user.numReviews + 1;
      user.reviews = [
        ...user.reviews,
        {
          userid: req.body.buyerId,
          name: req.body.buyername,
          avatar: req.body.avatar,
          rating: req.body.rating,
          date: req.body.date,
          comment: req.body.comment,
        },
      ];
      const userupdated = await user.save();
      res.json({
        _id: userupdated._id,
        name: userupdated.name,
        email: userupdated.email,
        phone: userupdated.phone,
        isAdmin: userupdated.isAdmin,
        rating: userupdated.rating,
        numReviews: userupdated.numReviews,
        avatar: userupdated.avatar,
        reviews: userupdated.reviews,
        createdAt: userupdated.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default userRoutes;
