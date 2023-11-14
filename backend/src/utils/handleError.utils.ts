// Helper function to handle errors and log messages
export function handleError(error: any) {
  console.error(error.message)
  throw new Error(error.message)
}
