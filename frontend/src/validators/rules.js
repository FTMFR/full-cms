const requiredValue = "REQUIRED_VALUE";
const minValue = "MIN_VALUE";
const maxValue = 'MAX_VALUE';
const emailValue = "EMAIL_VALUE";

export const requiredValidator = () => ({
  value: requiredValue,
});

export const minValidator = (min) => ({
  value: minValue,
  min,
});

export const emailValidator = () => ({
  value: emailValue,
});

export const maxValidator =(max)=>({
  value:maxValue,
  max
})

export default { requiredValue, minValue, emailValue,maxValue };
