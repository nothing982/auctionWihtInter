const express = require('express');
const { body } = require('express-validator/check');

const threadController = require('../controllers/thread');
const isAuth = require('../middleware/is-auth');
const thread = require('../models/thread');

const router = express.Router();

router.post('/createthread', isAuth, threadController.createThread);

router.get('/getthreads', threadController.getThreads);

router.get('/getthread', threadController.getThread);

module.exports = router;
