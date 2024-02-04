const express = require('express');
const zod = require("zod")
const router = express.Router();
const jwt = require('jsonwebtoken')
const { User, Account } = require("../db")
const { JWT_SECRET } = require('../config')
const jwtSecretKey = JWT_SECRET;
const authMiddleware = require('../middleware')


// User Sign Up route ----------------------------------------------------------------
const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string()
});

router.post("/signup", async (req, res) => {
  const isValid = signupBody.safeParse(req.body);

  const username = req.body.username
  const password = req.body.password
  const firstName = req.body.firstName
  const lastName = req.body.lastName

  if (!isValid.success) {
    res.json({
      msg: "invalid inputs"
    })
  }

  const existingUser = await User.findOne({
    username: req.body.username
  })

  if (existingUser) {
    res.status(411).json({
      msg: "The username belongs to a existing User."
    })
  }

  const user = await User.create({
    username,
    password,
    firstName,
    lastName
  })

  const userId = user._id;

  const token = jwt.sign({ userId }, jwtSecretKey);

  // Initializing random amount of money to users
  const randomMoney = Math.floor(Math.random() * 10000)

  await Account.create({
    userId: userId,
    balance: randomMoney
  })

  res.json({
    msg: "User Created Successfully",
    token: token,
    firstName: firstName
  })

})

// User Sign In route ---------------------------------------------------------------------------------------
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string()
})

router.post("/signin", async (req, res) => {

  const isValid = signinBody.safeParse(req.body)

  if (!isValid.success) {
    res.status(411).json({
      msg: "Invalid inputs"
    })
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  })

  if (user) {
    const token = jwt.sign({ userId: user._id }, jwtSecretKey)

    res.json({
      token: token,
      firstName: user.firstName
    })
  } else {
    res.status(411).json({
      msg: "error logging in"
    })
  }
})

// Update User route---------------------------------------------------------------------------------------
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
})
router.put("/", authMiddleware, async (req, res) => {
  const isValid = updateBody.safeParse(req.body)

  if (!isValid.success) {
    res.status(411).json({
      msg: "Invalid inputs"
    })
  }

  await User.updateOne({
    _id: req.userId
  }, req.body)

  res.json({
    msg: "User details updated Successfully"
  })

})


// Find a User route---------------------------------------------------------------------------------------
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{
      firstName: {
        "$regex": filter
      }
    }, {
      lastName: {
        "$regex": filter
      }
    }]
  })

  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  })
})


module.exports = router
