const express = require('express');
const router = express.Router();
const userRouter = require('./User/User');
const { accountRouter } = require('./User/Account');

router.use('/user', userRouter);

router.use('/account', accountRouter);
module.exports = router;