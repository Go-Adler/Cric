import jwt from 'jsonwebtoken'

export class TokenUseCase {
  generateToken(email: string, isVerified: boolean, userId: string = 'Default User'): string {
    const secretKey = process.env.JWT_SECRET_KEY!

    const token = jwt.sign({userId, email, isVerified }, secretKey, {
      expiresIn: '1h',
    })
    return token
  }
}
