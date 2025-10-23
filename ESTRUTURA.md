# 📂 Estrutura do Projeto

```
password-validator-microservice/
│
├── 📄 package.json                      # Dependências e scripts npm
├── 📄 package-lock.json                 # Lock de versões
├── 📄 .gitignore                        # Arquivos ignorados pelo Git
├── 📄 .eslintrc.json                    # Configuração do ESLint
├── 📄 jest.config.js                    # Configuração do Jest
├── 📄 README.md                         # Documentação principal
├── 📄 EXEMPLOS.md                       # Exemplos de uso da API
├── 📄 DEPLOY.md                         # Guia de deploy
│
├── 📁 src/                              # Código fonte
│   ├── 📄 server.js                     # Servidor Express principal
│   │
│   ├── 📁 routes/                       # Rotas da API
│   │   └── 📄 password.routes.js        # Rota POST /validar-senha
│   │
│   ├── 📁 services/                     # Lógica de negócio
│   │   └── 📄 passwordValidator.js      # Validação com Regex
│   │
│   └── 📁 middlewares/                  # Middlewares Express
│       └── 📄 errorHandler.js           # Tratamento de erros
│
└── 📁 test/                             # Testes automatizados
    └── 📄 passwordValidator.test.js     # 18 testes unitários
```

---

## 📋 Detalhes dos Arquivos

### 🔧 Configuração

| Arquivo | Descrição |
|---------|-----------|
| `package.json` | Dependências (express, cors, helmet, jest, nodemon, eslint) |
| `.gitignore` | Ignora node_modules, coverage, .env, etc |
| `.eslintrc.json` | Regras de qualidade de código |
| `jest.config.js` | Configuração de testes e cobertura |

### 💻 Código Fonte (`src/`)

| Arquivo | Linhas | Responsabilidade |
|---------|--------|------------------|
| `server.js` | ~35 | Inicializa Express, registra middlewares e rotas |
| `routes/password.routes.js` | ~40 | Define endpoint POST /validar-senha |
| `services/passwordValidator.js` | ~55 | Lógica de validação com Regex (sem loops) |
| `middlewares/errorHandler.js` | ~25 | Tratamento global de erros em JSON |

### 🧪 Testes (`test/`)

| Arquivo | Testes | Cobertura |
|---------|--------|-----------|
| `passwordValidator.test.js` | 18 | 100% do service layer |

---

## 🎯 Fluxo de Requisição

```
Cliente HTTP
    ↓
POST /validar-senha
    ↓
Express Middleware (helmet, cors, json parser)
    ↓
password.routes.js
    ↓
Valida presença do campo 'senha'
    ↓
passwordValidator.validatePassword()
    ↓
Testa 4 Regex:
  - Comprimento >= 8
  - /[A-Z]/ (maiúscula)
  - /\d/ (número)
  - /[!@#$%^&*]/ (especial)
    ↓
Retorna { valida: boolean, erros: string[] }
    ↓
Response JSON (200)
    ↓
Cliente recebe resposta
```

---

## 📦 Dependências

### Produção
- **express** `^4.18.2` - Framework web
- **cors** `^2.8.5` - Cross-Origin Resource Sharing
- **helmet** `^7.1.0` - Segurança via headers HTTP

### Desenvolvimento
- **nodemon** `^3.0.2` - Auto-reload em desenvolvimento
- **jest** `^29.7.0` - Framework de testes
- **eslint** `^8.55.0` - Linter de código

---

## 🚀 Scripts NPM

```bash
npm run dev      # Inicia com nodemon (auto-reload)
npm start        # Inicia servidor em produção
npm test         # Executa testes com cobertura
npm run lint     # Verifica qualidade do código
```

---

## 📊 Estatísticas do Projeto

- **Total de arquivos:** 13
- **Linhas de código:** ~200
- **Testes:** 18
- **Cobertura:** 100% (service layer)
- **Dependências:** 6 (3 prod + 3 dev)
- **Node.js:** >= 18.0.0

---

## ✅ Checklist de Qualidade

- [x] ✅ Separação de responsabilidades (routes/services/middlewares)
- [x] ✅ Validação com Regex (sem loops)
- [x] ✅ Testes unitários completos
- [x] ✅ Tratamento de erros padronizado
- [x] ✅ Segurança (helmet + CORS)
- [x] ✅ Documentação completa
- [x] ✅ ESLint configurado
- [x] ✅ Pronto para CI/CD
- [x] ✅ .gitignore adequado
- [x] ✅ Health check endpoint

---

**Projeto pronto para produção! 🎉**
