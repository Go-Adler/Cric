import bcrypt from 'bcrypt';

export class PasswordManager {
  private saltRounds: number;

  constructor() {
    this.saltRounds = 10;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}