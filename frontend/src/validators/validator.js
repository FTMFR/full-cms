import regex from "./regex";
import rules from "./rules";

const validator = (value, validations) => {
  console.log(value, validations);

  let validatorResults = [];

  for (const validator of validations) {
    if (validator.value === rules.requiredValue) {
      value.trim().length === 0 && validatorResults.push(false);
    }
    if (validator.value === rules.minValue) {
      value.trim().length < validator.min && validatorResults.push(false);
    }
    if (validator.value === rules.maxValue) {
      value.trim().length > validator.max && validatorResults.push(false);
    }
    if (validator.value === rules.emailValue) {
      !regex.textEmail(value) && validatorResults.push(false);
    }
  }
  console.log(validatorResults);

  if (validatorResults.length) {
    return false;
  } else {
    return true;
  }
};

export default validator;
