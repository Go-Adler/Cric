export interface Friend {
  name: string,
  profilePicture: string,
  userName: string
}

export interface UserFriend {
 friends: Array<Friend>
}

