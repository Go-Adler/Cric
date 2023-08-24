// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface RequestType extends Request {
//   user: { userId: string}
// }

// export class AuthMiddleware {
//   static verifyToken(req: RequestType, res: Response, next: NextFunction) {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ message: 'Token missing' });
//     }

//     const secretKey = process.env.SECRET_KEY!

//     try {
//       const decoded = jwt.verify(token, secretKey); 
//       req.user = { userId: decoded.userId };
//       next(); 
//     } catch (error) {
//       return res.status(401).json({ message: 'Token invalid' });
//     }
//   }
// }
