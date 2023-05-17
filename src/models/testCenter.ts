import mongoose from 'mongoose';
import { BaseModel } from 'rca/models';

export interface ITestCenter extends BaseModel {
  codeName: string;
  address: string;
  mobileNumber?: string;
  email?: string;
  phoneNumber?: string;
}

const testCenterSchema = new mongoose.Schema<ITestCenter>(
  {
    codeName: { type: String, required: true },
    address: { type: String, required: true },
    mobileNumber: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

export const TestCenter =
  mongoose.models.TestCenter ||
  mongoose.model<ITestCenter>('TestCenter', testCenterSchema);
