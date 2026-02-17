#!/usr/bin/env node
const utils = require('./src/cpfCnpjUtils');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const current = argv[i];
    const next = argv[i + 1];

    if (current === '--cpf' || current === '--cnpj' || current === '--doc') {
      args.document = next;
      args.type = current === '--cpf' ? 'CPF' : current === '--cnpj' ? 'CNPJ' : 'AUTO';
      i += 1;
    }

    if (current === '--help') {
      args.help = true;
    }
  }
  return args;
}

function help() {
  console.log(`\ncpf-cnpj-utils CLI\n\nUso:\n  node index.js --cpf 52998224725\n  node index.js --cnpj 19131243000197\n  node index.js --doc 529.982.247-25\n`);
}

function runCli() {
  const { document, type = 'AUTO', help: wantsHelp } = parseArgs(process.argv);

  if (wantsHelp || !document) {
    help();
    return;
  }

  const detectedType = type === 'AUTO' ? utils.detectType(document) : type;
  const isValid = utils.validateDocument(document, type);

  const output = {
    input: document,
    type: detectedType,
    formatted: utils.formatDocument(document, detectedType),
    clean: utils.onlyDigits(document),
    mask: utils.generateMask(detectedType),
    valid: isValid
  };

  console.log(JSON.stringify(output, null, 2));
}

if (require.main === module) {
  runCli();
}

module.exports = utils;
