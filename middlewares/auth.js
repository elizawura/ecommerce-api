import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    //find user by id
    const user = await UserModel.findById(req.auth.id);
    //check if roles includes user role
    if (roles?.includes(user.role)) {
      next();
    } else {
      res.status(403).json("You are not authorized");
    }
  };
};
//for typing yourself
// import jwt from "jsonwebtoken";

// export const isAuthenticated = (req, res, next) => {
//   //get authorization header
//   const authorization = req.headers.authorization;
//   //check the presence of authorization
//   if (!authorization) {
//     res.status(401).json("authorization header does not exist!");
//   }
//   // get access token from authorization
//   const token = authorization.split(" ")[1];
//   //check if token exists
//   if (!token) {
//     res.status(402).json("access token not provided");
//   }
//   //verify and decode accesss token
//   jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
//     //handle verify error
//     if (error) {
//       return res.status(401).json(error);
//     }
//     //add decoded to request object
//     req.user = decoded;
//     //proceed to next handler
//     next();
//   });
// };
