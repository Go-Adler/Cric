import mongoose, { Document, Model } from 'mongoose';

interface OTP {
  email: string;
  OTP: number;
}

interface OTPModel extends Model<OTPDocument> {}

interface OTPDocument extends OTP, Document {}

const OTPSchema = new mongoose.Schema<OTPDocument, OTPModel>({
  email: {
    type: String,
    required: true,
  },
  OTP: {
    type: Number,
    required: true,
  },
});

export const OTP_Entity: OTPModel = mongoose.model<OTPDocument, OTPModel>('OTP', OTPSchema);
