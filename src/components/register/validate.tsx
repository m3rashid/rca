import { camelCaseToSentenceCase } from 'rca/utils/strings';

export const validateRegister = (payload: any) => {
  const errors: string[] = [];
  [
    'currentStep',
    'gender',
    'fatherName',
    'motherName',
    'dateOfBirth',
    'mobileNumber',
    'testCenter',
    'transactionId',
    'category',
    'photograph',
    'signature',
  ].forEach((t) => {
    // @ts-ignore
    if (!payload[t] || payload[t] === '')
      errors.push(`${camelCaseToSentenceCase(t)} is required`);
  });

  ['permanentAddress', 'correspondenceAddress'].forEach((t) => {
    ['postalCode', 'cityOrTown', 'district', 'state'].forEach((i) => {
      // @ts-ignore
      if (!payload[t][i] || payload[t][i] === '')
        errors.push(
          `${camelCaseToSentenceCase(i)} in ${camelCaseToSentenceCase(
            t
          )} is required`
        );
    });
  });

  if (payload.education.length > 0) {
    payload.education.forEach((t: any) => {
      ['education', 'passYear', 'percentage', 'boardOrUni'].forEach((m) => {
        // @ts-ignore
        if (!t[m] || t[m] === '')
          errors.push(
            `${camelCaseToSentenceCase(m)} in ${t.degree} is required`
          );
      });
    });
  }

  if (payload.earlierCompetitiveExams.length > 0) {
    payload.earlierCompetitiveExams.forEach((t: any) => {
      ['name', 'year'].forEach((k) => {
        // @ts-ignore
        if (!t[k] || t[k] === '') errors.push(`${k} in ${t} is required`);
      });
    });
  }

  return errors;
};
