import jwt from 'jsonwebtoken';

export class TokenUseCase {
  generateToken(email: string): string {
    const secretKey = process.env.JWT_SECRET_KEY!; 

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return token;
  }
}
