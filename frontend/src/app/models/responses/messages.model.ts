import { Document, Types } from 'mongoose'

// Interface for the ChatText schema
export interface IChatText {
  message: string;
  time: Date;
  sendByUser: boolean;
}

// Interface for the Chat schema
export interface IChat extends Document {
  personId: Types.ObjectId;
  chatTexts: IChatText[];
}

export interface MessageResponse {
  messages: IChatText[]
}

export interface ChatFormMessage {
  message: string
}