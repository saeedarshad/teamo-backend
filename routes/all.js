const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { registerUser, loginUser, getUser } = require('../controllers/user');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', auth, getUser);

module.exports = router;