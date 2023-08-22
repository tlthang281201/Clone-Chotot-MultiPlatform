import asyncHandler from "express-async-handler";
import express from "express";
import Clothe from "../Model/ClothesModel.js";
import ProductBlog from "../Model/ProductsBlogModel.js";
const productRoute = express.Router();
// get all product
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const blog = await ProductBlog.find({});
    res.json(blog);
  })
);
//get single product
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const blog = await ProductBlog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

//add product blog
productRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      userId,
      category,
      title,
      image,
      image1,
      image2,
      description,
      price,
      isNew,
      city,
      district,
      ward,
    } = req.body;
    const product = await ProductBlog.create({
      userId,
      category,
      title,
      image,
      imageList: [image, image1, image2],
      description,
      price,
      isNew,
      city,
      district,
      ward,
    });
    if (product) {
      res.status(201).json({
        _id: product._id,
      });
    } else {
      res.status(400);
      throw new Error("Fail to create");
    }
  })
);

//get all product of userID
productRoute.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const product = await ProductBlog.find({ userId: req.params.id }).exec();
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

//get all product is showing and is accept
productRoute.get(
  "/show/accept",
  asyncHandler(async (req, res) => {
    const blog = await ProductBlog.find({
      isShow: true,
      isAccept: 1,
      isSold: false,
    });
    res.json(blog);
  })
);

// update status isShow of blog
productRoute.put(
  "/update-status",
  asyncHandler(async (req, res) => {
    const blog = await ProductBlog.findById(req.body.id);
    if (blog) {
      blog.isShow = req.body.status;
      const blogupdated = await blog.save();
      res.json(blogupdated);
    } else {
      res.status(404);
      throw new Error("Blog not found");
    }
  })
);

productRoute.put(
  "/update-blog",
  asyncHandler(async (req, res) => {
    const blog = await ProductBlog.findById(req.body.id);
    if (blog) {
      blog.category = req.body.category || blog.category;
      blog.isNew = req.body.isNew || blog.isNew;
      blog.price = req.body.price || blog.price;
      blog.title = req.body.title || blog.title;
      blog.description = req.body.description || blog.description;
      blog.city = req.body.city || blog.city;
      blog.district = req.body.district || blog.district;
      blog.ward = req.body.ward || blog.ward;
      blog.isAccept = 0;
      blog.image = req.body.image || blog.image;
      blog.imageList = [
        req.body.image || blog.image,
        req.body.image1 || blog.imageList[1],
        req.body.image2 || blog.imageList[2],
      ];
      const blogupdated = await blog.save();
      res.json(blogupdated);
    } else {
      res.status(404);
      throw new Error("Blog not found");
    }
  })
);

productRoute.put(
  "/update-sold",
  asyncHandler(async (req, res) => {
    const blog = await ProductBlog.findById(req.body.id);
    if (blog) {
      blog.isSold = req.body.status;
      const blogupdated = await blog.save();
      res.json(blogupdated);
    } else {
      res.status(404);
      throw new Error("Blog not found");
    }
  })
);

export default productRoute;
