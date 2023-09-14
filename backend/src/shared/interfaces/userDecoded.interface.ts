import { Types } from "mongoose"

export interface I_UserDecoded {
  userId: Types.ObjectId,
  isVerified: boolean
}