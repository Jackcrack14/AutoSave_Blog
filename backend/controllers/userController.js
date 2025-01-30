const User = require("../models/UserModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const avatar = req.file.buffer;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter all the fields");
  }
  if (!req.file) {
    res.status(400);
    throw new Error("File is missing!");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User exists! Please login!");
  }
  const user = await new User({
    name: name,
    email: email,
    password: hashedPassword,
    avatar: req.file.buffer,
  });

  console.log(user);
  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create User");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  // console.log(user, validPassword)
  if (user && validPassword) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

module.exports = { registerUser, authUser };
