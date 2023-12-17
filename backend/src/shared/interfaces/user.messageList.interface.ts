import { Types } from "mongoose"

interface Chat {
  message: string;
  read: boolean;
  sendByUser: boolean;
  _id: Types.ObjectId;
  time: Date;
}

interface PersonDetails {
  name: string;
  userName: string;
  email: string;
  profilePicture: string;
  socketId: string[]
}

export interface ResultMessageList {
  personDetails: PersonDetails;
  latestChatText: Chat;
}