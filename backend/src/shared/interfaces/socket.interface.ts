import { Document } from "mongoose"

export interface Socket extends Document {
  userName: string,
  socketId: string
}