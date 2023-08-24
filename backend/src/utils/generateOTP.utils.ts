// Function to generate a random otp of length 6
export const generateOTP = () => {
  return Math.floor(Math.random() * 900000) + 100000
}