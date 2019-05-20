const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, "The_Quick_Brown_Fox(C0d3$$y.10)_Jumped_Over_The_Lazy_Dog");
    next();
  } catch (error) {
    res.status(401).json({
      message: 'User Not Authorized'
    })
  }
}
