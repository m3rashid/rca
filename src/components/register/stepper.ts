import { FormInstance } from 'antd';
import { IRegistration } from 'rca/models/registration';

export type IRegisterPayload = Omit<IRegistration, 'user'> & {
  user?: IRegistration['user'];
  payment: boolean;
};

export type BasicInfo = Pick<
  IRegisterPayload,
  | 'gender'
  | 'fatherName'
  | 'motherName'
  | 'dateOfBirth'
  | 'mobileNumber'
  | 'phoneNumber'
>;

const basicInfo: BasicInfo = {
  dateOfBirth: '' as any,
  fatherName: '',
  gender: '',
  mobileNumber: '',
  motherName: '',
  phoneNumber: '',
};

export type Addresses = Pick<
  IRegisterPayload,
  'permanentAddress' | 'correspondenceAddress'
>;

const addresses: Addresses = {
  correspondenceAddress: {
    city: '',
    country: '',
    postalCode: '',
    state: '',
  },
  permanentAddress: {
    city: '',
    country: '',
    postalCode: '',
    state: '',
  },
};

export type IEducation = Pick<IRegisterPayload, 'education'>['education'];

const education: IEducation = [];

export type IEarlierCompetitiveExams = Pick<
  IRegisterPayload,
  'earlierCompetitiveExams'
>['earlierCompetitiveExams'];

const earlierCompetitiveExams: IEarlierCompetitiveExams = [];

export type IAgreements = Pick<
  IRegisterPayload,
  'agreeToTerms'
>['agreeToTerms'];
const agreeToTerms: IAgreements = {
  informationIsCorrect: false,
  rightToChange: false,
};

export type IUploads = Pick<
  IRegisterPayload,
  'photograph' | 'aadharCard' | 'signature' | 'lastSemesterCertificate'
>;
const uploads: IUploads = {
  aadharCard: '',
  photograph: '',
  signature: '',
  lastSemesterCertificate: '',
};

export const defaultPayload: IRegisterPayload = {
  ...basicInfo,
  ...addresses,
  education,
  earlierCompetitiveExams,
  agreeToTerms,
  ...uploads,
  currentStep: 0,
  testCenter: '' as any,
  payment: false,
  transactionId: '',
};

const stepper = [
  basicInfo,
  addresses,
  education,
  earlierCompetitiveExams,
  uploads,
  { payment: false },
  agreeToTerms,
];
