import { NextFunction, Request, Response} from 'express';
import jwt,{JsonWebTokenError} from 'jsonwebtoken';
import {JWT_SECRETE} from '../../constants/config';
import { formatResponse } from '../../utils/response.helper';


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


const unauthenticatedError = (res:Response) =>{
  return  res.status(401).json(formatResponse(
    {
      errors: 'unauthenticated',
    },false
  ));
}

function jwtAuthMiddleware(userRole:[string]|null = null){
  return async (req:Request,res:Response,next:NextFunction)=>{

    try{
      const token = getTokenFromBearer(req);
      await jwt.verify(token,JWT_SECRETE);
      res.locals.token = token;
      const decoded:any = jwt.decode(token);


      const role = decoded?.user?.role;
      
      // role check 
      
      if(userRole){
        if(role && role?.name){
          if(userRole.indexOf(role?.name.toLowerCase()) !== -1){
            next();
            return;
          }
        }
        return unauthenticatedError(res);
      }else{ // role check 
        next();
      }


    }catch(e){
      if(e instanceof JsonWebTokenError){
        unauthenticatedError(res);
        return;
      }// end if
    
      res.status(500).json({
        message: "Internal server Error",
        errors: e.message,
        stack: e.stack
      });
    }

    

  }
}





export default jwtAuthMiddleware;

