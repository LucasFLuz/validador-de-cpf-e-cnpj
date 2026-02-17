function onlyDigits(value = '') {
  return String(value).replace(/\D+/g, '');
}

function detectType(document) {
  const digits = onlyDigits(document);
  if (digits.length === 11) return 'CPF';
  if (digits.length === 14) return 'CNPJ';
  return 'UNKNOWN';
}

function isRepeatedSequence(digits) {
  return /^(\d)\1+$/.test(digits);
}

function calculateCpfDigit(baseDigits, factor) {
  let total = 0;
  for (let i = 0; i < baseDigits.length; i += 1) {
    total += Number(baseDigits[i]) * (factor - i);
  }
  const rest = (total * 10) % 11;
  return rest === 10 ? 0 : rest;
}

function validateCPF(cpf) {
  const digits = onlyDigits(cpf);
  if (digits.length !== 11 || isRepeatedSequence(digits)) return false;

  const firstDigit = calculateCpfDigit(digits.slice(0, 9), 10);
  const secondDigit = calculateCpfDigit(digits.slice(0, 10), 11);

  return firstDigit === Number(digits[9]) && secondDigit === Number(digits[10]);
}

function calculateCnpjDigit(baseDigits, weights) {
  const total = baseDigits
    .split('')
    .reduce((sum, digit, index) => sum + Number(digit) * weights[index], 0);

  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function validateCNPJ(cnpj) {
  const digits = onlyDigits(cnpj);
  if (digits.length !== 14 || isRepeatedSequence(digits)) return false;

  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstDigit = calculateCnpjDigit(digits.slice(0, 12), firstWeights);
  const secondDigit = calculateCnpjDigit(`${digits.slice(0, 12)}${firstDigit}`, secondWeights);

  return firstDigit === Number(digits[12]) && secondDigit === Number(digits[13]);
}

function formatCPF(cpf) {
  const digits = onlyDigits(cpf).slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatCNPJ(cnpj) {
  const digits = onlyDigits(cnpj).slice(0, 14);
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

function formatDocument(document, type = 'AUTO') {
  const resolvedType = type === 'AUTO' ? detectType(document) : type;
  if (resolvedType === 'CPF') return formatCPF(document);
  if (resolvedType === 'CNPJ') return formatCNPJ(document);
  return onlyDigits(document);
}

function validateDocument(document, type = 'AUTO') {
  const resolvedType = type === 'AUTO' ? detectType(document) : type;
  if (resolvedType === 'CPF') return validateCPF(document);
  if (resolvedType === 'CNPJ') return validateCNPJ(document);
  return false;
}

function generateMask(type = 'AUTO') {
  if (type === 'CPF') return '000.000.000-00';
  if (type === 'CNPJ') return '00.000.000/0000-00';
  return 'Automático (CPF/CNPJ)';
}

module.exports = {
  detectType,
  formatCNPJ,
  formatCPF,
  formatDocument,
  generateMask,
  onlyDigits,
  validateCNPJ,
  validateCPF,
  validateDocument
};
