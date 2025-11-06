/**
 * Servidor Express - Microsserviço de Validação de Senhas
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passwordRoutes = require('./routes/password.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança e parsing
app.use(helmet()); // Segurança com headers HTTP
app.use(cors()); // Habilita CORS
app.use(express.json()); // Parser de JSON no body

// Rota de health check
app.get('/', (req, res) => {
  res.json({
    service: 'Password Validator Microservice',
    status: 'online',
    version: '1.0.0'
  });
});

// Registra rotas de validação de senha
app.use('/', passwordRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Endpoint disponível: POST http://localhost:${PORT}/validar-senha`);
  console.log(`🏥 Health check: GET http://localhost:${PORT}/`);
});

module.exports = app;
