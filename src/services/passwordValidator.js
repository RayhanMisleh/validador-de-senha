/**
 * Serviço de validação de senhas usando Regex
 * Implementa todas as regras de validação sem uso de loops
 */

// Mensagens de erro em PT-BR
const errorMessages = {
  minLength: 'A senha precisa ter no mínimo 8 caracteres',
  uppercase: 'A senha precisa ter pelo menos 1 letra maiúscula',
  number: 'A senha precisa ter pelo menos 1 número',
  special: 'A senha precisa ter pelo menos 1 caractere especial (!@#$%^&*)'
};

// Regras definidas como pares { name, check, message }
const rules = [
  {
    name: 'minLength',
    check: (s) => typeof s === 'string' && s.length >= 8,
    message: errorMessages.minLength
  },
  {
    name: 'uppercase',
    check: (s) => /[A-Z]/.test(s),
    message: errorMessages.uppercase
  },
  {
    name: 'number',
    check: (s) => /\d/.test(s),
    message: errorMessages.number
  },
  {
    name: 'special',
    check: (s) => /[!@#$%^&*]/.test(s),
    message: errorMessages.special
  }
];

/**
 * Valida uma senha contra as regras definidas em `rules`.
 * Retorna um objeto simples { valida, erros }.
 */
function validatePassword(senha) {
  if (typeof senha !== 'string') {
    return { valida: false, erros: ['Campo \'senha\' deve ser uma string'] };
  }

  const erros = rules
    .filter((r) => !r.check(senha))
    .map((r) => r.message);

  return { valida: erros.length === 0, erros };
}

module.exports = {
  validatePassword
};
