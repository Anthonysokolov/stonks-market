const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const tradesRouter = require('./trades')

router.use('/users',usersRouter)
router.use('/trades',tradesRouter)

// Error handling
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
})

module.exports = router
