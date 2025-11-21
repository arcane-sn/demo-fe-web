const isPasswordLeast8Char = (value: string) => {
  const validation = /^.{8,}$/;
  return validation.test(value);
};

const isPasswordContainUppercase = (value: string) => {
  const validation = /^(?=.*[A-Z]).*$/;
  return validation.test(value);
};

const isPasswordCombinationLetterNumberSymbol = (value: string) => {
  // Check if password contains at least one letter, one number, and one symbol
  // Symbol is any character that is not a letter or digit
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[^A-Za-z\d]/.test(value);
  return hasLetter && hasNumber && hasSymbol;
};

export {
  isPasswordLeast8Char,
  isPasswordContainUppercase,
  isPasswordCombinationLetterNumberSymbol,
};
