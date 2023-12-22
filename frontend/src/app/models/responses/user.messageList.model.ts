import { Types } from "mongoose";

interface Chat {
  message: string;
  sendByUser: boolean;
  _id: Types.ObjectId;
  time: Date;
}

interface PersonDetails {
  email: string;
  userName: string;
  name: string;
  profilePicture: string;
  socketId: string[]
}

export interface ResultItem {
  personDetails: PersonDetails;
  latestChatText: Chat;
  read: boolean
}