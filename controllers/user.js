import { UserModel } from "../models/user.js";
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from "../validators/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  //validate user information
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //check if user exists already
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (user) {
    return res.status(409).json("user already exists");
  }
  //hash plaintext password
  const hashedPassword = bcrypt.hashSync(value.password, 10);
  //create user record in database
  const result = await UserModel.create({
    ...value,
    password: hashedPassword,
  });
  //send registration email to user
  //(optional) generate access token for user
  //return response
  res.status(201).json("user registered successfully");
};

export const loginUser = async (req, res, next) => {
  //validate user information
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // find matching user record in database
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (!user) {
    return res.status(404).json("user does not exists");
  }
  //compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json("invalid credentials");
  }
  //generate access token for user
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  //return response
  res.status(200).json({
    accessToken,
    user: await UserModel.findById(user.id).select({ password: false }),
    //OR user: {
    //   role: user.role,
    //   email: user.email,
    // },
  });
};

export const updateUser = async (req, res, next) => {
  //validate request body
  const { error, value } = updateUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //update user in database
  const result = await UserModel.findByIdAndUpdate(
    //for a user to update themselves (req.auth.id),
    //for a superadmin to update themselves
    req.params.id,
    value,
    { new: true }
  );
  //return response
  res.status(200).json(result);
};

export const getAuthenticatedUser = async (req, res, next) => {
  try {
    //get user by id using req.auth.id
    const result = await UserModel.findById(req.auth.id).select({
      password: false,
    });
    //return response
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;
    //ferch products from database
    const result = await UserModel.find(JSON.parse(filter)).sort(
      JSON.parse(sort)
    );
    //return response
    res.json(result);
  } catch (error) {
    next(error);
  }
};
