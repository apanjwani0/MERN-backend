const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  try {
    let token=req.header('Authorization').replace('Bearer ','')
    if (token) {
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          res.status(401).json({
            success: false,
            message: 'Failed to authenticate token',
            error:err
          });
        } else {

          req.decoded = decoded;
          next();

        }
      });

    } else {
      res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
  }catch(err){
    res.status(401).json({
      success:false,
      message:'Please Login or Signup',
      error:err
    })
  }
}
