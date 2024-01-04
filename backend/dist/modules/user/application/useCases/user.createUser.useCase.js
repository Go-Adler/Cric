"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
// Import the required modules
const user_dataAccess_1 = require("../../data/user.dataAccess");
const bcrypt_utils_1 = require("../../../../utils/bcrypt.utils");
// Define a class for the user creation use case
class CreateUserUseCase {
    // Define a constructor that initializes the properties
    constructor() {
        // Define an async function that takes a user data object and returns a promise of a boolean value
        this.createUser = async (userData) => {
            // Destructure the user data object into variables for easier access
            const { name, userName, email, gender, phone } = userData;
            // Hash the user password using the password manager utility
            const passwordHash = await this.passwordManager.hashPassword(userData.password);
            // Call the data access method to create a user in the database
            const userId = await this.userDataAccess.createUser(name, userName, gender, email, phone, passwordHash);
            // Return true to indicate successful user creation
            return userId;
        };
        // Initialize the data access and password management instances
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
        this.passwordManager = new bcrypt_utils_1.PasswordManager();
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
