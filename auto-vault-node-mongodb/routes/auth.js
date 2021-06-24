const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('confirmPassword')
      .trim()
      .isLength({ min: 5 })
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match!');
        }
        return true;
      }),
    body('name').trim().not().isEmpty(),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Username already exists!');
          }
        });
      }),
    body('consumerType').trim().not().isEmpty(),
    body('phone').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post('/signin', authController.login);

// router.get('/status', isAuth, authController.getUserStatus);

// router.patch(
//   '/status',
//   isAuth,
//   [
//     body('status')
//       .trim()
//       .not()
//       .isEmpty()
//   ],
//   authController.updateUserStatus
// );

module.exports = router;
