const productModel = require("../models/productsModel");
const bcrypt = require("bcryptjs");
const key = process.env.SECRET_KEY;
const fs = require("fs");
const cloudinary = require("../DB/cloudinaryDB");

const getAllProducts = async (req, res) => {
  await productModel.find({}).then((result, error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        massage: error,
      });
    }
    if (result.length === 0) {
      return res.status(300).json({
        success: false,
        massage: "there are no products available",
      });
    }
    return res.status(200).json({
      success: true,
      massage: result,
    });
  });
};
const addNewProduct = async (req, res) => {
  // console.log(image);
  try {
    const image  = req.body.image;
    console.log(image);
  const result = await cloudinary.uploader.upload(image, {
    folder: "products",
  });
  
    const product = await productModel({
      // name,
      images: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await product.save()
    res.status(200).json({result})
    // console.log(product);
    // await productModel
    //   .insertMany(product)
    //   .then(() =>
    //     res
    //       .status(300)
    //       .json({ success: true, massage: "success in adding new product" })
    //   )
    //   .catch((error) => res.status(400).json({ success: false, gfgfgf:error }));
  } 
  catch (err) {
    return console.log({ success: false, err });
  }
};

const getProductById = async (req, res) => {
  await productModel
    .findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.json({
          success: false,
          massage: "product is not available",
        });
      }
      return res.status(200).json({ success: true, product });
    })
    .catch((error) => res.status(400).json({ success: false, error }));
};

const updateProduct = async (req, res) => {
  await productModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((error) => res.status(400).json({ success: false, error }));
};

const deleteProduct = async (req, res) => {
  await productModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(300).json({ success: true }))
    .catch((error) => res.status(400).json({ success: false, error }));
};

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
