/**
 * Middleware de tratamento de erros global
 * Captura todos os erros não tratados e retorna resposta JSON padronizada
 */

function errorHandler(err, req, res, next) {
  // Log do erro no console (útil para debug)
  console.error('Erro capturado:', err);

  // Status code padrão: 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Resposta de erro em JSON
  const errorResponse = {
    message: err.message || 'Erro interno do servidor'
  };

  // Em desenvolvimento, incluir stack trace
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;
