export class UserExistingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserExistingError';
  }
}