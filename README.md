# cpf-cnpj-utils (validador + formatador) 

Utilitário em Node.js para validar CPF/CNPJ, formatar/desformatar e o usuário sentir a expêriencia de uma interface dark.

## O que o código faz?

-  Valida CPF e CNPJ
-  Formata documento automaticamente
-  Remove máscara (`onlyDigits`)
-  Gera máscara por tipo (`generateMask`)
-  Possui CLI (`node index.js --cpf ...`)
-  Possui interface web dark com efeitos

## Instalação

```bash
npm install
```

## CLI rápida

```bash
node index.js --cpf 52998224725
node index.js --cnpj 19131243000197
node index.js --doc 19.131.243/0001-97
```

## Interface dark

```bash
npm start
# abrir http://localhost:3000
```

## Uso no código

```js
const {
  validateDocument,
  formatDocument,
  onlyDigits,
  generateMask,
  detectType
} = require('./index');

const doc = '19.131.243/0001-97';

console.log(validateDocument(doc)); // true
console.log(formatDocument(doc)); // 19.131.243/0001-97
console.log(onlyDigits(doc)); // 19131243000197
console.log(generateMask(detectType(doc))); // 00.000.000/0000-00
```

## Tabela de funções

| Função | Descrição | Exemplo |
|---|---|---|
| `validateCPF(cpf)` | Valida CPF | `validateCPF('529.982.247-25')` |
| `validateCNPJ(cnpj)` | Valida CNPJ | `validateCNPJ('19.131.243/0001-97')` |
| `validateDocument(doc, type?)` | Valida documento com tipo automático ou manual | `validateDocument('52998224725')` |
| `formatCPF(cpf)` | Formata CPF | `formatCPF('52998224725')` |
| `formatCNPJ(cnpj)` | Formata CNPJ | `formatCNPJ('19131243000197')` |
| `formatDocument(doc, type?)` | Formata automaticamente por tipo | `formatDocument('19131243000197')` |
| `onlyDigits(value)` | Remove máscara e caracteres extras | `onlyDigits('529.982.247-25')` |
| `generateMask(type)` | Retorna máscara padrão por tipo | `generateMask('CPF')` |
| `detectType(doc)` | Detecta tipo por tamanho | `detectType('19131243000197')` |

## Testes

```bash
npm test
```
