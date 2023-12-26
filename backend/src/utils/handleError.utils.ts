// This class handles error logging
export class ErrorHandling {
  // This static method logs the error message and throws an error
  static processError(message: string, error: any): never {
    console.error(`${message}: ${error.message}`)
    throw new Error(error.message)
  }
}
