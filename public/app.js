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

function validateCPF(cpf) {
  const digits = onlyDigits(cpf);
  if (digits.length !== 11 || isRepeatedSequence(digits)) return false;

  const sumOne = digits.slice(0, 9).split('').reduce((sum, n, i) => sum + Number(n) * (10 - i), 0);
  const sumTwo = digits.slice(0, 10).split('').reduce((sum, n, i) => sum + Number(n) * (11 - i), 0);
  const d1 = (sumOne * 10) % 11 % 10;
  const d2 = (sumTwo * 10) % 11 % 10;

  return d1 === Number(digits[9]) && d2 === Number(digits[10]);
}

function validateCNPJ(cnpj) {
  const digits = onlyDigits(cnpj);
  if (digits.length !== 14 || isRepeatedSequence(digits)) return false;
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calc = (base, weights) => {
    const total = base.split('').reduce((sum, n, i) => sum + Number(n) * weights[i], 0);
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const d1 = calc(digits.slice(0, 12), w1);
  const d2 = calc(`${digits.slice(0, 12)}${d1}`, w2);
  return d1 === Number(digits[12]) && d2 === Number(digits[13]);
}

function formatDocument(doc, type) {
  const digits = onlyDigits(doc);
  if (type === 'CPF') {
    return digits.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  if (type === 'CNPJ') {
    return digits.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
  return digits;
}

const input = document.querySelector('#document');
const select = document.querySelector('#docType');
const result = document.querySelector('#result');

function handleValidate() {
  const raw = input.value;
  const selectedType = select.value;
  const type = selectedType === 'AUTO' ? detectType(raw) : selectedType;
  const valid = type === 'CPF' ? validateCPF(raw) : type === 'CNPJ' ? validateCNPJ(raw) : false;

  result.classList.remove('hidden');
  result.innerHTML = `
    <strong>Tipo:</strong> ${type}<br />
    <strong>Formatado:</strong> ${formatDocument(raw, type)}<br />
    <strong>Status:</strong> ${valid ? 'válido ✅' : 'inválido ❌'}
  `;
  result.style.borderColor = valid ? '#0e958d' : '#9c3457';
}

document.querySelector('#validateButton').addEventListener('click', handleValidate);
document.querySelector('#clearButton').addEventListener('click', () => {
  input.value = '';
  result.classList.add('hidden');
});
