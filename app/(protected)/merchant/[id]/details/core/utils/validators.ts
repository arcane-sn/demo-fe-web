
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function isValidIndonesianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.startsWith('628') && cleaned.length >= 11 && cleaned.length <= 15;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidWebsite(website: string): boolean {
  if (!website) return false;
  
  // Add protocol if missing
  const url = website.startsWith('http') ? website : `https://${website}`;
  return isValidUrl(url);
}

export function isValidAccountNumber(accountNumber: string): boolean {
  const cleaned = accountNumber.replace(/\D/g, '');
  return cleaned.length >= 8 && cleaned.length <= 20;
}

export function isValidPostalCode(postalCode: string): boolean {
  const postalRegex = /^\d{5}$/;
  return postalRegex.test(postalCode);
}

export function isValidBusinessRegistration(registrationNumber: string): boolean {
  // Indonesian business registration format
  const businessRegex = /^\d{2}\.\d{3}\.\d{3}\.\d{1}-\d{3}\.\d{3}$/;
  return businessRegex.test(registrationNumber);
}

export function isValidTaxNumber(taxNumber: string): boolean {
  // Indonesian tax number format
  const taxRegex = /^\d{2}\.\d{3}\.\d{3}\.\d{1}-\d{3}\.\d{3}$/;
  return taxRegex.test(taxNumber);
}

export function isRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

export function isValidCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, '');
  return cleaned.length >= 13 && cleaned.length <= 19;
}

export function isValidBankCode(bankCode: string): boolean {
  const bankCodeRegex = /^[A-Z]{3,6}$/;
  return bankCodeRegex.test(bankCode);
}