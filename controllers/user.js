import { UserModel } from "../models/user.js";
import {
  loginUserValidator,
  registerUserValidator,
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
  res.status(200).json({ accessToken });
};
