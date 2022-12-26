const usersDB = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegister } = require("../validation/register");
const validateLogIn = require("../validation/logIn");
const key = process.env.SECRET_KEY;
const User = require("../models/usersModel");

const getAllUsers = async (req, res) => {
  await usersDB.find({}).then((result, error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        massage: `${error}`,
      });
    }
    if (result.length === 0) {
      return res.status(300).json({
        success: false,
        massage: "the collection data is empty",
      });
    }
    return res.status(200).json({
      success: true,
      massage: result,
    });
  });
};

const addNewUser = async (req, res) => {
  await usersDB
    .insertMany(req.body)
    .then(() =>
      res
        .status(300)
        .json({ success: true, massage: "success in adding new user" })
    )
    .catch((error) => res.status(400).json({ success: false, error }));
};

const getUserById = async (req, res) => {
  await usersDB
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.json({ success: false, massage: "user not found" });
      }
      return res
        .status(200)
        .json({ success: true, massage: `success in finding user: ${user}` });
    })
    .catch((error) => res.status(400).json({ success: false, error }));
};

const register = async (req, res) => {
  const { error } = validateRegister(req.body);
  console.log(error);
  if (error) return res.status(400).json(error);
  await usersDB
    .findOne({ email: req.body.email })
    .then((user, err) => {
      if (err) return res.status(400).json(err);
      if (user) return res.json({ massage: "email already taken" });
    })
    .catch((err) => {
      console.log(err);
    });

    if(req.body.password!==req.body.passwordRep)return res.json({
       massage: "the password and the pasword repetition are not the same" });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  req.body.active = false;
  await usersDB
    .insertMany(req.body)
    .then(() => {
      res.json({massage:`success in adding ${req.body}`});
    })
    .catch((err) => console.log(err));
};

const logIn = async (req, res) => {
  const { error } = validateLogIn(req.body);
  // if (error) return res.status(400).json({ error});
  const email = req.body.email;
  const password = req.body.password;
  const user = await usersDB.findOne({ email });
  if (!user) {
    console.log(req.body, 'fvdfdfdfaa');
    return res.status(404).json({ emailNotFound: "Email not found" });
  }
  const isMatch = await bcrypt.compare(`${password}`, `${user.password}`);
  if (isMatch) {
    const payload = {
      id: user._id,
      email: user.email,
    };
    jwt.sign(
      payload,
       key,
      //  { expiresIn: 31556926 },
        (err, token) => {
      if (err) return res.status(400).json({ err});
      // return res.json({ success: true, token: `${token}, ${req.header}`, });
      // const token = jwt.sign({ _id: user._id }, key);  
      return res.header("authToken", token).json({ user, token});
    });
  } else {
    return res.status(400).json({  passwordIncorrect: "Password incorrect" });
  }
};

const updateUser = async (req, res) => {
  await usersDB
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((error) => res.status(400).json({ success: false, error }));
};

const deleteUser = async (req, res) => {
  await usersDB
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(300).json({ success: true }))
    .catch((error) => res.status(400).json({ success: false, error }));
};

module.exports = {
  getAllUsers,
  addNewUser,
  getUserById,
  register,
  logIn,
  updateUser,
  deleteUser,
};
