import { Request, Response, NextFunction } from 'express';
import { UserExistingUseCase } from '../../application/useCases/user.existing.useCase'
import { UserLoginUseCase } from '../../application/useCases/user.logIn.useCase'
import { WrongPasswordError } from '../../../../shared/errors/wrongPassword.error'
import { TokenUseCase } from '../../application/useCases/user.token.useCase';

export class UserLoginController {
  private userExistingUseCase: UserExistingUseCase
  private userLogInUseCase: UserLoginUseCase
  private tokenUseCase: TokenUseCase;
  
  constructor() {
    this.userExistingUseCase = new UserExistingUseCase()
    this.userLogInUseCase = new UserLoginUseCase()
    this.tokenUseCase = new TokenUseCase();
  }

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    
    try {
      const isUserExisting = await this.userExistingUseCase.userExistingLogIn(email)
      if(!isUserExisting) {
        return res.json({userNotExisting: true})
      }
      const user = await this.userLogInUseCase.userLogIn(email, password);

      const token = this.tokenUseCase.generateToken(email);

      res.json({ message: 'Verification success', token });
    } catch (error) {
      if (error instanceof WrongPasswordError) {
        return res.status(409).json({ message: error.message });
      }
      return next(error);
    }
  }
}
