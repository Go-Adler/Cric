import { Document, Types } from 'mongoose'

// Interface for the ChatText schema
export interface IChatText {
  time: Date;
  message: string;
  sendByUser: boolean;
}

// Interface for the Chat schema
export interface IChat extends Document {
  read: boolean;
  chatTexts: IChatText[];
  personId: Types.ObjectId;
}