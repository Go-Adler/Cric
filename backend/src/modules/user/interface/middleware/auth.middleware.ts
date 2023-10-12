import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TokenUseCase } from '../../application/useCases/user.token.useCase'
import { SendOTP_UseCase } from '../../application/useCases/user.sendOTP.useCase'

// Extend the Request interface to include a user property for decoded JWT payload
declare module 'express' {
  interface Request {
    user?: JwtPayload
  }
}

export class JwtMiddleware {
  private tokenUseCase: TokenUseCase
  private sendOtpUseCase: SendOTP_UseCase
  constructor() {
    this.tokenUseCase = new TokenUseCase()
    this.sendOtpUseCase = new SendOTP_UseCase()
  }
  // Middleware function to verify JWT token
  verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const secretKey: string = process.env.JWT_SECRET_KEY!

      // Extract the Authorization header
      const authHeader = req.header('Authorization')

      // Check if Authorization header is missing
      if (!authHeader) {
        return res
          .status(401)
          .json({ message: 'Access denied. No token provided.' })
      }

      // Extract token from the Authorization header
      const token = authHeader.split(' ')[1]

      // Check if token is missing
      if (!token) {
        return res
          .status(401)
          .json({ message: 'Access denied. No token provided.' })
      }
      // Verify the token using the provided secret key
      const decoded = jwt.verify(token, secretKey) as JwtPayload

      // Attach the decoded user information to the request object
      req.user = decoded

      
      const { isVerified } = decoded

      const { userId } = decoded

      // if (!isVerified) {
      //   await this.sendOtpUseCase.sendOTP(email)

      //   const token = this.tokenUseCase.generateTokenWithUserId(email, false)
      //   return res.json({ notVerified: true, token })
      // }
      // Proceed to the next middleware 
      next()
    } catch (error) {
      // Handle token verification errors
      return res.json({ invalidToken: true })
    }
  }

  verifyToken = async (req: Request, res: Response) => {
   try {
    const { token } = req.body
    const secretKey: string = process.env.JWT_SECRET_KEY!

    jwt.verify(token, secretKey) as JwtPayload
    res.json({validToken: true})
   } catch(error: any) {
    
    if (error.message === 'jwt malformed') {
      
      res.json({invalidToken: true})
    }
   }
    
  }

  verifyVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const secretKey: string = process.env.JWT_SECRET_KEY!

      // Extract the Authorization header
      const authHeader = req.header('Authorization')

      // Check if Authorization header is missing
      if (!authHeader) {
        return res
          .status(401)
          .json({ message: 'Access denied. No token provided.' })
      }
      
      // Extract token from the Authorization header
      const verifyToken = authHeader.split(' ')[1]

      // Check if token is missing
      if (!verifyToken) {
        return res
          .status(401)
          .json({ message: 'Access denied. No token provided.' })
      }
      // Verify the token using the provided secret key
      const decoded = jwt.verify(verifyToken, secretKey) as JwtPayload

      // Attach the decoded user information to the request object
      req.user = decoded
      const { isVerified } = decoded

      const { userId } = decoded

      // if (!isVerified) {
      //   await this.sendOtpUseCase.sendOTP(email)

      //   const token = this.tokenUseCase.generateTokenWithUserId(email, false)
      //   return res.json({ notVerified: true, token })
      // }
      // Proceed to the next middleware 
      next()
    } catch (error) {
      console.error(error)
      // Handle token verification errors
      return res.json({ invalidToken: true })
    }
  }
}
