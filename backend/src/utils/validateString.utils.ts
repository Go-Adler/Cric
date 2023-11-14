// Helper function to validate string parameters
export function validateString(param: string, paramName: string) {
  if (typeof param !== "string" || param.length === 0) {
    throw new Error(`Invalid ${paramName}`)
  }
}

