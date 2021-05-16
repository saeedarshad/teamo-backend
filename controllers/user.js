const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  validateUser,
  validateLoginData
} = require('../validators/user');
const { User } = require('../models/user');
const { secretKey } = require('../config');

const registerUser = async (req, res) => {
  const {error} = validateUser(req.body);
  if (error) {
    return res.status(400).send({error: error.details[0].message});
  }
  
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({error: 'A user already exists with this email.'});
  }

  user = new User({ ...req.body });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  return res.send({user: { id: user.id, email: user.email }});
}

const loginUser = async (req, res) => {
  const {error} = validateLoginData(req.body);
  if (error) {
    return res.status(400).send({error: error.details[0].message});
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({error: 'Invalid email or password!'});
  }

  const passwordValidated = await bcrypt.compare(req.body.password, user.password);
  if (!passwordValidated) {
    return res.status(400).send({error: 'Invalid email or password!'});
  }
  
  const token = jwt.sign({id: user._id}, secretKey);
  res.send({token: token});
}

const getUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.send({user: user});
}

module.exports = {
  registerUser,
  loginUser,
  getUser
};