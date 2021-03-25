import { NextFunction, Request, Response} from 'express';
import jwt,{JsonWebTokenError} from 'jsonwebtoken';
import {JWT_SECRETE} from '../../constants/config';
import {formatResponse} from '../../utils/response.helper';



export const getTokenFromBearer = (req:Request)=>{
  const authorization = req.headers.authorization;
  if(!authorization){
    throw new JsonWebTokenError("No authorization Header");
  }

  try{
    let token = authorization?.split('Bearer ')[1];
    return token
  }catch{
    throw new JsonWebTokenError("Invalid token format")
  }
} 

async function jwtAuthMiddleware(req:Request,res:Response,next:NextFunction){
  try{
    const token = getTokenFromBearer(req);
    await jwt.verify(token,JWT_SECRETE);
    res.locals.token = token;
    res.locals.decoded = jwt.decode(token);
    next();
  }catch(e){
    if(e instanceof JsonWebTokenError){
      res.status(401).json(formatResponse(
        {
          message: 'unauthenticated',
        },false
      ));
      return;
    }// end if

    res.status(500).json({
      message: "Internal server Error",
      error: e.message,
      stack: e.stack
    });

  }
}



export default jwtAuthMiddleware;

