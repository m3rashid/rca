import mongoose from 'mongoose';
import { BaseModel } from 'rca/models';

export const UserTypes = ['ADMIN', 'USER'] as const;
export type IUserType = (typeof UserTypes)[number];

export interface IUser extends BaseModel {
  name: string;
  password: string;
  email: string;
  type: IUserType;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, maxlength: 100 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true, enum: UserTypes },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
