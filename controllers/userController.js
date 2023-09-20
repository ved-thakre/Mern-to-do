import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/errros.js";

export const register = async (req, res, next) => {
   try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    // Hashing the password using bcrypt
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    sendCookie(user, res, "Registered Successfully", 201);
   } catch (error) {
     next(error);
   }

};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};
export const getMyProfile = (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    })
};
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Developement" ? false : true,
    })
    .json({
      success: true,
      message: "Logging out",
      user: req.user,
    });
};
