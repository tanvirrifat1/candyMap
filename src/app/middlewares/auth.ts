import { NextFunction } from 'express';
import { AppError } from '../../utils/AppError';
import { jwtHelpers } from '../../Helpers/JwtHelpers';
import config from '../config';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization as string | undefined;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser; // role  , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
