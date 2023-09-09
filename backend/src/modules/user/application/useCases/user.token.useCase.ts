import jwt from 'jsonwebtoken'

export class TokenUseCase {
  generateToken(email: string, isVerified: boolean): string {
    const secretKey = process.env.JWT_SECRET_KEY!

    const token = jwt.sign({email, isVerified }, secretKey, {
      expiresIn: '1h',
    })
    return token
  }
}
