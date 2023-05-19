import { FormInstance } from 'antd';
import { type } from 'os';
import { IRegistration } from 'rca/models/registration';

export type IRegisterPayload = Omit<IRegistration, 'user'> & {
  user?: IRegistration['user'];
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
};

const stepper = [
  basicInfo,
  addresses,
  education,
  earlierCompetitiveExams,
  uploads,
  agreeToTerms,
];

export const validate = (form: FormInstance<any>, currentStep: number) => {
  const currentStepPayload = stepper[currentStep];
  const keys = Object.keys(currentStepPayload);
  const errors: any = {};
  console.log({ keys });

  keys.forEach((key) => {
    const err = form.getFieldError(key);
    console.log({ err });
    if (err.length) {
      errors[key] = {
        errors: err,
      };
    }
  });
  if (errors.length) {
    form.setFields(errors);
    return false;
  }

  return true;
};
