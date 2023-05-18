import mongoose from 'mongoose';
import { BaseModel } from 'rca/models';
import { IUser } from 'rca/models/user';
import { ITestCenter } from 'rca/models/testCenter';

export interface IAddress {
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IEducation {
  degree: string;
  percentage: number;
  division?: number;
  board: string;
  institutionName?: string;
  passYear: number;
}

export interface IEarlierCompetitiveExams {
  name: string;
  year: number;
  cleared: boolean;
}

export interface IRegistration extends BaseModel {
  user: IUser; // ObjectId
  currentStep: number;
  gender: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date; // also calculate age from this
  mobileNumber: string;
  phoneNumber?: string;
  permanentAddress: IAddress;
  correspondenceAddress: IAddress;
  education: Array<IEducation>;
  testCenter: ITestCenter; // ObjectId
  earlierCompetitiveExams: Array<IEarlierCompetitiveExams>;
  agreeToTerms: {
    informationIsCorrect: boolean;
    rightToChange: boolean;
  };

  // Static Assets
  photograph: string;
  signature: string;
  aadharCard: string;
  lastSemesterCertificate?: string;
}

export const genders = ['M', 'F', 'O'] as const;

const addressSchema = {
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: 'India' },
};

const registrationSchema = new mongoose.Schema<IRegistration>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    currentStep: { type: Number, default: 0 },
    gender: { type: String, enum: genders, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    mobileNumber: { type: String, required: true },
    phoneNumber: { type: String },
    permanentAddress: addressSchema,
    correspondenceAddress: addressSchema,
    education: [
      {
        degree: { type: String, required: true },
        percentage: { type: Number, required: true },
        division: { type: Number },
        board: { type: String, required: true },
        institutionName: { type: String },
        passYear: { type: Number, required: true },
      },
    ],
    testCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'TestCenter' },
    agreeToTerms: {
      informationIsCorrect: { type: Boolean, required: true },
      rightToChange: { type: Boolean, required: true },
    },
    photograph: { type: String, required: true },
    signature: { type: String, required: true },
    aadharCard: { type: String, required: true },
    lastSemesterCertificate: { type: String },
    earlierCompetitiveExams: [
      {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        cleared: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Registration =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>('Registration', registrationSchema);
