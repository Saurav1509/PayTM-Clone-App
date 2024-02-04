const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(403).json({
      msg: "No auth token provided"
    })
  }

  const word = auth.split(" ");

  const jwtToken = word[1];
  try {
    const decoded = jwt.verify(jwtToken, JWT_SECRET);

    req.userId = decoded.userId; // putting the userId in the request object which we have decoded from the token

    next();
  } catch (err) {
    res.status(403).json({
      err: err
    })
  }

}

module.exports = authMiddleware
