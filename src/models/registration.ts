import mongoose from 'mongoose';
import { BaseModel } from '.';

export interface IRegistration extends BaseModel {
  currentStep: number;
}

const registrationSchema = new mongoose.Schema<IRegistration>(
  {},
  { timestamps: true }
);

export const Registration =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>('Registration', registrationSchema);
