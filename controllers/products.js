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
    // //check product does not exist already (prevents the error from happening)
    // const count = await ProductModel.countDocuments({
    //   name: value.name,
    // });
    // if (count) {
    //   return res.status(409).json("Product with name already exists");
    // }
    //save product information in database
    const result = await ProductModel.create({
      ...value,
      userId: req.auth.id,
    });
    //return response
    res.status(201).json(result);
  } catch (error) {
    //handles the error after it happens
    if (error.name === "MongooseError") {
      return res.status(409).json(error.message);
    }
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

export const replaceProduct = async (req, res, next) => {
  //validate incoming request body

  //perform model replace operation
  const result = await ProductModel.findOneAndReplace(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );
  //return response
  res.status(200).json(result);
};

export const deleteProduct = (req, res) => {
  res.send(`product with id ${req.params.id} deleted`);
};
