import { Request, Response } from 'express';

export class UserController {
  login(req: Request, res: Response) {
    
    const { username, password } = req.body;

    if (username === 'demo' && password === 'password') {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
