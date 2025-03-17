import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProduct = async (req, res, next) => {
  try {
    console.log(req.file, req.files);
    //validate the product information
    const { error, value } = addProductValidator.validate(
      {
        ...req.body,
        // image: req.file.filename,
        pictures: req.files?.map((file) => {
          return file.filename;
        }),
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(422).json(error);
      //to get only the message replace "error" with "error.details[0].message"
    }
    //save product information in database
    const result = await ProductModel.create(value);
    //return response
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;
    //ferch products from database
    const result = await ProductModel.find(JSON.parse(filter)).sort(
      JSON.parse(sort)
    );
    //return response
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const countProducts = (req, res) => {
  res.send("all products count!");
};

export const updateProduct = (req, res) => {
  res.send(`product with id ${req.params.id} updated!`);
};

export const deleteProduct = (req, res) => {
  res.send(`product with id ${req.params.id} deleted`);
};
