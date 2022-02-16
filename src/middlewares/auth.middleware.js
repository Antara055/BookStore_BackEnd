import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { user } = await jwt.verify(bearerToken, 'your-secret-key');
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const setRole = (role) => {
  return async (req, res, next) => {
    req.body.role = role;
    next();
  };
};

export const adminAuth = async (req, res, next) => {
  try {
    let adminToken = req.header('token');
    if (!adminToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    const admin = await jwt.verify(adminToken,'admin',((err,decode)=>{
      if(err){
        return res.status(401).send({
          status: false,
          message:"Authentication declined"});
      }
      else{
        console.log(req.body);
        if (decode.role == "admin") {
          //req.data
          next();
      } else {
          return res.status(401).send({
              status: false,
              message: 'Unauthorised access'
          });
      }
      }
    }))    
  } catch (error) {
    next(error);
  }
};
