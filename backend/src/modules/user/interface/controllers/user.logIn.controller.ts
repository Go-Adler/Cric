import { Request, Response, NextFunction } from 'express';
import { UserExistingUseCase } from '../../application/useCases/user.existing.useCase'
import { UserLoginUseCase } from '../../application/useCases/user.logIn.useCase'
import { TokenUseCase } from '../../application/useCases/user.token.useCase';
import { UserPostDataAccess } from '../../data/user.postDataAccess';

export class UserLoginController {
  private userExistingUseCase: UserExistingUseCase
  private userLogInUseCase: UserLoginUseCase
  private tokenUseCase: TokenUseCase;
  private userPostDataAccess: UserPostDataAccess
  
  constructor() {
    this.userExistingUseCase = new UserExistingUseCase()
    this.userLogInUseCase = new UserLoginUseCase()
    this.tokenUseCase = new TokenUseCase();
    this.userPostDataAccess = new UserPostDataAccess()
  }

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    
    try {
      const isUserExisting = await this.userExistingUseCase.userExistingLogIn(email)
      if(!isUserExisting) {
        return res.json({userNotExisting: true})
      }
      await this.userLogInUseCase.userLogIn(email, password);
      console.log(29, 29);
      
      await this.userLogInUseCase.isVerified(email)
      const token = this.tokenUseCase.generateToken(email);

      res.json({ message: 'Verification success', token });
    } catch (error: any) {
      if (error.message === 'InvalidPassword') {
        return res.json({wrongPassword: true})
      } else if (error.message === 'NotVerified') {
        return res.json({notVerified: true})
      }
      return next(error);
    }
  }
}
