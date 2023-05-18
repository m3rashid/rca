import { IRegistration } from 'rca/models/registration';

export type BasicInfo = Pick<
  IRegistration,
  | 'gender'
  | 'fatherName'
  | 'motherName'
  | 'dateOfBirth'
  | 'mobileNumber'
  | 'phoneNumber'
>;

export type Addresses = Pick<
  IRegistration,
  'permanentAddress' | 'correspondenceAddress'
>;

export type IEducation = Pick<IRegistration, 'education'>;

export type IPreviousCompetitiveExams = Pick<
  IRegistration,
  'earlierCompetitiveExams'
>;

export type IAgreements = Pick<IRegistration, 'agreeToTerms'>;

export type IUploads = Pick<
  IRegistration,
  'photograph' | 'aadharCard' | 'signature' | 'lastSemesterCertificate'
>;
