const express = require('express');
const authMiddleware = require('../middleware');
const { Account } = require('../db');
const router = express.Router();
const mongoose = require('mongoose')


router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId

  const data = await Account.findOne({
    userId: userId
  })

  res.json({
    balance: data.balance
  })
})

router.post("/transfer", authMiddleware, async (req, res) => {
  const fromUserId = req.userId
  const toUserId = req.body.to
  const amount = req.body.amount

  const session = await mongoose.startSession()

  session.startTransaction() // Start Transaction Logic ------------------------------------

  // checking if the amoun to transfer is available with the fromUser
  const fromUserData = await Account.findOne({
    userId: fromUserId
  }).session(session)

  const fromUserBalance = fromUserData.balance

  if (fromUserBalance < amount || !fromUserData) {
    session.abortTransaction()

    res.status(400).json({
      msg: "Not enough balance available"
    })
  }

  const toUserData = await Account.findOne({
    userId: toUserId
  }).session(session)

  if (!toUserData) {
    session.abortTransaction()

    res.status(400).json({
      msg: "Recipient not found"
    })
  }

  // Updating the fromUser and toUser balances
  await Account.findOneAndUpdate({
    userId: fromUserId
  }, {
    $inc: {
      balance: -amount
    }
  }).session(session)

  await Account.findOneAndUpdate({
    userId: toUserId
  }, {
    $inc: {
      balance: amount
    }
  }).session(session)

  session.commitTransaction() // Commiting the Transaction once all goes well ------------------ 

  res.json({
    msg: "The amount has been transfered!!!"
  })
})


module.exports = router
