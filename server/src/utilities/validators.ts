export const checkMandatoryFields = (mandatoryFields: string[], reqBody: any): string | null => {
  const missingFields = [];

  mandatoryFields.forEach((mandatoryField: string) => {
    if (!reqBody[mandatoryField]) {
      missingFields.push(mandatoryField);
    }
  });

  return missingFields.length > 0 ? createMandatoryFieldsErrorMsg(missingFields) : null;
};

const createMandatoryFieldsErrorMsg = (missingFields: string[]): string => {
  let msg = 'Missing fields:';
  missingFields.forEach((field: string) => {
    msg = msg.concat(`,${field}`);
  });
  return msg;
};
