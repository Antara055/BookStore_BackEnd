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
    let userToken = req.header('token');
    if (!userToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    //bearerToken = bearerToken.split(' ')[1];
    const user  = await jwt.verify(userToken, process.env.user,((err,decode)=>{
      if(err){
        return res.status(401).send({message:"Authentication decliend"})
      }
      else{
        req.body['data']=decode;
        next();
      }
    }));
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
    const admin = await jwt.verify(adminToken,process.env.user,((err,decode)=>{
      if(err){
        return res.status(401).send({
          status: false,
          message:"Authentication declined"});
      }
      else{
        if (decode.role == "admin") {
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
