import { UserEntity } from './../domain/user.schema';

export class UserDataAccess {
  // Create a new user
  async createUser(name: string, userName: string, gender:string, email:string, phone: string, password: string) {
    await UserEntity.create({ name, userName, gender, email, phone, password });
  }

  // get user deta with user name
  async getUserByUserName(userName: string) {
    const user = await UserEntity.findOne({ userName });
    return user;
  }

  // check userName already existing
  async checkUserByUserName(userName: string) {
    const user = await UserEntity.findOne({ userName });
    return user ? true : false;
  }

  // get user data with email
  async getUserByEmail(email: string) {
    const user = await UserEntity.findOne({ email });
    return user;
  }

  // check email already exist
  async checkUserByEmail(email: string) {
    const user = await UserEntity.findOne({ email });
    return user ? true : false
  }

  // get user data with phone
  async getUserByPhone(phone: string) {
    const user = await UserEntity.findOne({ phone });
    return user
  }

  // check phone already exist
  async checkUserByPhone(phone: string) {
    const user = await UserEntity.findOne({ phone });
    return user ? true : false
  }

  // get user password with email
  async getUserPasswordByEmail(email: string) {
    const user = await UserEntity.findOne({ email });
    return user?.password || ''
  }

  // get user password with email
  async isVerified(email: string) {
    const { isVerified } = await UserEntity.findOne({ email }).select<{ isVerified: boolean }>('isVerified');
    return isVerified
  }

  async verifyUser(email: string) {
    await UserEntity.findOneAndUpdate({ email }, { isVerified: true})
  }
}
