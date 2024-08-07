import Product from "../models/products.models.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fse from "fs-extra";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductId = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    //if the product is not found, the findById method returns null
    if (!product) {
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (e) {
    // console.log(e);
    res.status(404).json({
      message: `Something went wrong trying to find the product with id ${productId}`,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      throw new Error("Missing required fields");
    }
    // create a new product from the model
    const newProduct = new Product({ name, description, price });
    // If there is an object with the name 'picture', upload it.
    if (req.files && req.files.picture) {
      const picture = req.files.picture;
      const picturePath = picture.tempFilePath;
      // use function uploadImage from cloudinary.js
      const result = await uploadImage(picturePath);
      const { public_id, secure_url } = result;
      // add the public_id and secure_url to the image property of the newProduct object
      newProduct.image.public_id = public_id;
      newProduct.image.secure_url = secure_url;
      // delete the picture from 'uploads' using fse.
      await fse.unlinkSync(picturePath);
    }
    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  // receive the id from the params
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
    //if the product is not found, the findByIdAndDelete method returns null
    //throw an error
    if (!product) {
      throw new Error("Product not found");
    }
    // if the product has a propertie 'image' then check its 'public_id' value and delete from cloudinary
    if (product.image.public_id) {
      const {public_id} = product.image;
      console.log("Sth was from clodinary");
      await deleteImage(public_id);
    } else {
      console.log("Nothing to delete from clodinary");
    }
    res.json(product);
  } catch (e) {
    // coonsole.log(e);
    res.json({
      message: `Error trying to delete product ${e.message}`,
    });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    if (!req.body) {
      throw new Error("Missing required fields");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true },
    );
    res.json(updatedProduct);
  } catch (e) {
    res.status(500).json({ message: "Error creating product" });
  }
};
