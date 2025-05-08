import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "unauthorised-no token" });
    }
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (!verify) {
      return res.status(401).json({ message: "unauthorised-invalid token" });
    }
    const user = await User.findById(verify.userid).select("-password");
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in middleware" });
  }
};
