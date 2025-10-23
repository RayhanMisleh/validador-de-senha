# 🔐 Password Validator Microservice

Microsserviço de validação de senhas com regras customizadas implementadas usando **Regex** (sem loops). Desenvolvido em Node.js com Express seguindo boas práticas de desenvolvimento backend.

## 📋 Descrição

Este microsserviço fornece um endpoint REST para validação de senhas baseado em critérios de segurança modernos. Todas as regras de validação são implementadas utilizando expressões regulares, garantindo performance e elegância no código.

### Regras de Validação

Uma senha válida deve atender **todos** os seguintes critérios:

1. ✅ Mínimo de **8 caracteres**
2. ✅ Pelo menos **1 letra maiúscula** (A-Z)
3. ✅ Pelo menos **1 número** (0-9)
4. ✅ Pelo menos **1 caractere especial** da lista: `!@#$%^&*`

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd password-validator-microservice

# Instale as dependências
npm install
```

### Executando o Servidor

```bash
# Modo desenvolvimento (com hot-reload)
npm run dev

# Modo produção
npm start
```

O servidor estará disponível em: `http://localhost:3000`

### Executando os Testes

```bash
# Rodar testes com cobertura
npm test

# Rodar linter
npm run lint
```

## 📡 Como Usar o Endpoint

### Endpoint Principal

**POST** `/validar-senha`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "senha": "suaSenhaAqui"
}
```

### Exemplos de Requisições

#### 1. Usando cURL (Senha Válida)

```bash
curl -X POST http://localhost:3000/validar-senha \
  -H "Content-Type: application/json" \
  -d '{"senha":"Abcdef1!"}'
```

**Resposta (200 OK):**
```json
{
  "valida": true,
  "erros": []
}
```

#### 2. Usando cURL (Senha Inválida)

```bash
curl -X POST http://localhost:3000/validar-senha \
  -H "Content-Type: application/json" \
  -d '{"senha":"abc123"}'
```

**Resposta (200 OK):**
```json
{
  "valida": false,
  "erros": [
    "A senha precisa ter no mínimo 8 caracteres",
    "A senha precisa ter pelo menos 1 letra maiúscula",
    "A senha precisa ter pelo menos 1 caractere especial (!@#$%^&*)"
  ]
}
```

#### 3. Usando HTTPie (Senha Válida)

```bash
http POST localhost:3000/validar-senha senha="MyP@ssw0rd123"
```

**Resposta:**
```json
{
  "valida": true,
  "erros": []
}
```

#### 4. Usando HTTPie (Senha Inválida)

```bash
http POST localhost:3000/validar-senha senha="semsenha"
```

**Resposta:**
```json
{
  "valida": false,
  "erros": [
    "A senha precisa ter pelo menos 1 letra maiúscula",
    "A senha precisa ter pelo menos 1 número",
    "A senha precisa ter pelo menos 1 caractere especial (!@#$%^&*)"
  ]
}
```

#### 5. Requisição sem o campo senha (400 Bad Request)

```bash
curl -X POST http://localhost:3000/validar-senha \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Resposta (400 Bad Request):**
```json
{
  "valida": false,
  "erros": [
    "Campo 'senha' é obrigatório"
  ]
}
```

## 🖼️ Como Testar com Insomnia/Postman

### Passo 1: Criar requisição POST
1. Abra o Insomnia ou Postman
2. Crie uma nova requisição POST
3. URL: `http://localhost:3000/validar-senha`
4. Selecione Body → JSON

### Passo 2: Testar senha válida
```json
{
  "senha": "Abcdef1!"
}
```
**Print esperado:** Status 200, resposta com `"valida": true`

### Passo 3: Testar senha inválida
```json
{
  "senha": "senha123"
}
```
**Print esperado:** Status 200, resposta com `"valida": false` e array de erros

### Passo 4: Testar erro de validação
```json
{}
```
**Print esperado:** Status 400, erro informando que campo é obrigatório

## 🛡️ Por que Validar Dados no Backend?

Mesmo que o frontend já implemente validação de senhas, **é crucial validar novamente no backend** pelos seguintes motivos:

### 1. **Segurança**
- O frontend pode ser facilmente burlado por usuários mal-intencionados
- Ferramentas como Postman, cURL ou scripts podem fazer requisições diretas à API, ignorando completamente a interface
- Desenvolvedores podem usar as extensões do navegador para modificar o código JavaScript

### 2. **Consistência de Regras**
- O backend é a **fonte única da verdade** (single source of truth)
- Garante que todas as aplicações (web, mobile, desktop) sigam as mesmas regras
- Evita inconsistências quando múltiplos clientes consomem a mesma API

### 3. **Conformidade e Auditoria**
- Regulamentações como LGPD, GDPR e PCI-DSS exigem controles no servidor
- Logs de validação no backend fornecem trilha de auditoria
- Demonstra due diligence em caso de incidentes de segurança

### 4. **Resiliência**
- Protege contra bugs ou desabilitação de JavaScript no navegador
- Garante integridade dos dados independente do estado do cliente
- Permite evolução das regras de forma centralizada

### 5. **Defesa em Profundidade**
- Segurança em camadas: validação no frontend (UX) + backend (segurança)
- O frontend melhora a experiência do usuário com feedback imediato
- O backend garante que dados inválidos nunca entrem no sistema

**Conclusão:** A validação no frontend é para melhorar a experiência do usuário. A validação no backend é para **garantir a segurança e integridade do sistema**.

## 🏆 Desafio Bônus

✅ **Implementado!** Todas as regras de validação foram implementadas usando **expressões regulares (Regex)** em vez de loops.

### Regex Utilizadas:

```javascript
// Letra maiúscula
/[A-Z]/

// Número
/\d/

// Caractere especial permitido
/[!@#$%^&*]/
```

A validação é feita usando o método `.test()` de cada regex, garantindo código limpo, performático e fácil de manter.

## 📁 Estrutura do Projeto

```
password-validator-microservice/
├── src/
│   ├── server.js                    # Inicialização do servidor Express
│   ├── routes/
│   │   └── password.routes.js       # Definição da rota POST /validar-senha
│   ├── services/
│   │   └── passwordValidator.js     # Lógica de validação com Regex
│   └── middlewares/
│       └── errorHandler.js          # Tratamento global de erros
├── test/
│   └── passwordValidator.test.js    # Testes unitários com Jest
├── package.json                      # Dependências e scripts
├── jest.config.js                    # Configuração do Jest
├── .eslintrc.json                    # Configuração do ESLint
├── .gitignore                        # Arquivos ignorados pelo Git
└── README.md                         # Documentação
```

## 🔧 Decisões Técnicas

### Arquitetura
- **Separação de responsabilidades**: Rotas, serviços e middlewares em arquivos separados
- **Service Layer**: Lógica de negócio isolada em `passwordValidator.js`
- **Middleware de erro centralizado**: Tratamento consistente de erros em toda a aplicação

### Segurança
- **Helmet.js**: Protege a aplicação de vulnerabilidades conhecidas via headers HTTP
- **CORS**: Configurado para permitir requisições cross-origin
- **Validação de entrada**: Verifica tipo e presença do campo senha

### Qualidade de Código
- **ESLint**: Mantém padrões de código consistentes
- **Jest**: Cobertura completa de testes unitários
- **Regex puras**: Validação eficiente sem loops

### Performance
- Uso de Regex nativas do JavaScript (muito performáticas)
- Sem processamento desnecessário em loops
- Retorno imediato quando todos os critérios são atendidos

## 📊 Cobertura de Testes

Os testes cobrem:
- ✅ Senhas válidas
- ✅ Cada regra de validação individualmente
- ✅ Múltiplas falhas simultâneas
- ✅ Edge cases (senha vazia, muito longa, etc.)
- ✅ Formato correto do retorno da função
- ✅ Funcionamento das regex individuais

Execute `npm test` para ver o relatório de cobertura completo.

## 🌐 Health Check

O serviço fornece um endpoint de health check:

**GET** `/`

```bash
curl http://localhost:3000/
```

**Resposta:**
```json
{
  "service": "Password Validator Microservice",
  "status": "online",
  "version": "1.0.0"
}
```

## 📝 Licença

MIT

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido como parte de um desafio de microsserviços, demonstrando:
- Clean Code e boas práticas de Node.js
- Uso eficiente de Regex para validação
- Testes automatizados
- Documentação completa
- Pronto para deploy em produção

---

**Desenvolvido com ❤️ usando Node.js e Express**
