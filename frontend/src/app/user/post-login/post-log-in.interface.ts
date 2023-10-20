export interface User {
  name: string;
}

export interface FindUser {
  _id: string,
  userName: string,
  profilePicture: string,
  name: string
}

export interface Users {
  users: FindUser[]
}