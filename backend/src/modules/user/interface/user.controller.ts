import { Request, Response } from 'express';

export class SignUpController {
  login(req: Request, res: Response) {
    console.log(req.body);
    
    const { userName, password } = req.body;

    if (userName === 'goadler' && password === 'Amg4w4i-') {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
