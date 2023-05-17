import mongoose from 'mongoose';
import { BaseModel } from '.';

export interface IAddress {
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IEducation {
  degree: string;
  percentage: number;
  division: number;
  board: string;
  institutionName: string;
  passYear: number;
}

export interface IEarlierCompetitiveExams {

}

export interface IRegistration extends BaseModel {
  email: string;
  currentStep: number;
  fullName: string;
  gender: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date;
  age: number;
  mobileNumber: string;
  phoneNumber: string;
  permanentAddress: IAddress;
  correspondenceAddress: IAddress;
  education: Array<IEducation>;
  testCenter: string; // Objectid
  agreeToTerms: {
    informationIsCorrect: boolean;
    rightToChange: boolean;
  };

  // Static Assets
  photograph: string;
  signature: string;
  aadharCard: string;
  lastSemesterCertificate?: string;
  earlierCompetitiveExams: Array<IEarlierCompetitiveExams>;
}

const registrationSchema = new mongoose.Schema<IRegistration>(
  {
		
	},
  { timestamps: true }
);

export const Registration =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>('Registration', registrationSchema);
