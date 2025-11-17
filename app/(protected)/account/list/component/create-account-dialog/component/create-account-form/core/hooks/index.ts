const isPasswordLeast8Char = (value: string) => {
  const validation = /^.{8,}$/;
  return validation.test(value);
};

const isPasswordContainUppercase = (value: string) => {
  const validation = /^(?=.*[A-Z]).*$/;
  return validation.test(value);
};

const isPasswordCombinationLetterNumberSymbol = (value: string) => {
  const validation =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return validation.test(value);
};

export {
  isPasswordLeast8Char,
  isPasswordContainUppercase,
  isPasswordCombinationLetterNumberSymbol,
};
