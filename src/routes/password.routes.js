/**
 * Rotas para validação de senha
 */

const express = require('express');
const { validatePassword } = require('../services/passwordValidator');

const router = express.Router();

// Cores ANSI simples para terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

/**
 * POST /validar-senha
 * Valida uma senha contra as regras estabelecidas
 */
router.post('/validar-senha', (req, res) => {
  const { senha } = req.body;

  // Validação: campo 'senha' é obrigatório
  if (!senha) {
    return res.status(400).json({
      valida: false,
      erros: ['Campo \'senha\' é obrigatório']
    });
  }

  // Validação: senha deve ser string
  if (typeof senha !== 'string') {
    return res.status(400).json({
      valida: false,
      erros: ['Campo \'senha\' deve ser uma string']
    });
  }

  // Executa validação
  const resultado = validatePassword(senha);

  // Log organizado no terminal
  const statusLabel = resultado.valida ? `${colors.green}${colors.bright}VALIDA${colors.reset}` : `${colors.red}${colors.bright}INVÁLIDA${colors.reset}`;
  console.log(`${colors.cyan}--- Validação de Senha ---${colors.reset}`);
  console.log(`Senha: ${colors.dim}${senha}${colors.reset}`);
  console.log(`Resultado: ${statusLabel}`);
  if (resultado.erros && resultado.erros.length > 0) {
    console.log(`${colors.yellow}Erros:${colors.reset}`);
    resultado.erros.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
  } else {
    console.log(`${colors.green}Sem erros encontrados.${colors.reset}`);
  }
  console.log(`${colors.cyan}-------------------------${colors.reset}`);

  // Acrescenta confirmação amigável quando válida
  const payload = { ...resultado };
  if (resultado.valida) {
    payload.confirmacao = 'Senha válida ✅';
  }

  // Retorna resultado (sempre 200 quando body é válido)
  return res.status(200).json(payload);
});

module.exports = router;
