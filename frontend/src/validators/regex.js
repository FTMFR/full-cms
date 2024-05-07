const textEmail = (value) => {
  const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g;

  return emailPattern.test(value);
};

const testCodeMeli = (value) => {
  const codeMeliRegex = /[0-9]{9}\d/g;

  return codeMeliRegex.test(value);
};

const testPhoneNumber = (value) => {
  const phoneNumberRegex = /^09\d{9}$/g;

  return phoneNumberRegex.test(value);
};

export default { textEmail, testCodeMeli, testPhoneNumber };
