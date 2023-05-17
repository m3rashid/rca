import mongoose from 'mongoose';

export const UserTypes = ['ADMIN', 'CO_ADMIN', 'OTHER'] as const;
export type IUserType = (typeof UserTypes)[number];

export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  type: IUserType;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: UserTypes,
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
