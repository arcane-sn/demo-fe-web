export const isPasswordLeast8Char = (value: string) => /^.{8,}$/.test(value);

export const isPasswordContainUppercase = (value: string) =>
  /^(?=.*[A-Z]).*$/.test(value);

export const isPasswordCombinationLetterNumberSymbol = (value: string) => {
  // Check if password contains at least one letter, one number, and one symbol
  // Symbol is any character that is not a letter or digit
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[^A-Za-z\d]/.test(value);
  return hasLetter && hasNumber && hasSymbol;
};
