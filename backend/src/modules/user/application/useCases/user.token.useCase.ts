import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

export class TokenUseCase {
  generateTokenWithUserId(userId: Types.ObjectId, isVerified?: boolean): string {
    const secretKey = process.env.JWT_SECRET_KEY!
    
    const token = jwt.sign({ isVerified, userId }, secretKey, {
      expiresIn: '1h',
    })
    return token
  }
}
