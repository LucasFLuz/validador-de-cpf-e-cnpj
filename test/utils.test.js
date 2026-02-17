const test = require('node:test');
const assert = require('node:assert/strict');

const utils = require('../src/cpfCnpjUtils');

test('valida CPF e CNPJ válidos', () => {
  assert.equal(utils.validateCPF('529.982.247-25'), true);
  assert.equal(utils.validateCNPJ('19.131.243/0001-97'), true);
});

test('rejeita CPF e CNPJ inválidos', () => {
  assert.equal(utils.validateCPF('111.111.111-11'), false);
  assert.equal(utils.validateCNPJ('00.000.000/0000-00'), false);
});

test('formatação funciona para CPF/CNPJ', () => {
  assert.equal(utils.formatCPF('52998224725'), '529.982.247-25');
  assert.equal(utils.formatCNPJ('19131243000197'), '19.131.243/0001-97');
});

test('auto detecta tipo e máscara', () => {
  assert.equal(utils.detectType('52998224725'), 'CPF');
  assert.equal(utils.detectType('19131243000197'), 'CNPJ');
  assert.equal(utils.generateMask('CPF'), '000.000.000-00');
});
