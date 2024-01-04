// Import the required modules
import { UserDataAccess } from "../../data/user.dataAccess"
import { User } from "../../../../shared/interfaces/user.interface"
import { PasswordManager } from "../../../../utils/bcrypt.utils"

// Define a class for the user creation use case
export class CreateUserUseCase {
  // Declare private properties for data access and password management
  private userDataAccess: UserDataAccess
  private passwordManager: PasswordManager

  // Define a constructor that initializes the properties
  constructor() {
    // Initialize the data access and password management instances
    this.userDataAccess = new UserDataAccess()
    this.passwordManager = new PasswordManager()
  }

  // Define an async function that takes a user data object and returns a promise of a boolean value
  createUser = async (userData: User) => {
    // Destructure the user data object into variables for easier access
    const { name, userName, email, gender, phone } = userData

    // Hash the user password using the password manager utility
    const passwordHash = await this.passwordManager.hashPassword(userData.password)

    // Call the data access method to create a user in the database
    const userId = await this.userDataAccess.createUser(name, userName, gender, email, phone, passwordHash)

    // Return true to indicate successful user creation
    return userId
  }

  editUserName = async (userId: string, userName: string) => {
    // Call the data access method to create a user in the database
    await this.userDataAccess.editUserName(userId, userName)

    // Return true to indicate successful user creation
    return userId
  }


  editEmail = async (userId: string, email: string) => {
    // Call the data access method to create a user in the database
    await this.userDataAccess.editEmail(userId, email)

    // Return true to indicate successful user creation
    return userId
  }

  editName = async (userId: string, name: string) => {
    // Call the data access method to create a user in the database
    await this.userDataAccess.editName(userId, name)

    // Return true to indicate successful user creation
    return userId
  }

  editPhone = async (userId: string, phone: number) => {
    // Call the data access method to create a user in the database
    await this.userDataAccess.editNumber(userId, phone)

    // Return true to indicate successful user creation
    return userId
  }
}
