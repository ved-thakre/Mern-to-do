import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {

};


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if(user){
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    })
  } 

  // Hashing the password using bcrypt
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  
   user = await User.create({
    name,
    email,
    password: hashPassword
  });

  sendCookie(user, res, "Registered Successfully", 201);

};

export const login = async (req, res, next) => {
  const {email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  } 

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
  
  sendCookie(user, res, `Welcome back, ${user.name}`, 201);

};

export const getMyProfile = async (req, res) => {
       
    res.status(200).json({
      success: true,
      user: req.user,
    })
};

export const logout = async (req, res) => {
  res.status(200).cookie("token","", { expires : new Date(Date.now())}).json({
    success: true,
    message : "Logging out",
    user: req.user,
  });
};
