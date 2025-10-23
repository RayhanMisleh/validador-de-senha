# 🚀 Guia de Deploy - Password Validator Microservice

## 📦 Preparação para Publicação no GitHub

### 1. Inicializar Git (se ainda não foi feito)

```bash
cd /Users/ray/Documents/Personal\ Projects/Microsass\ Backend
git init
git add .
git commit -m "feat: implementação inicial do microsserviço de validação de senhas"
```

### 2. Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `password-validator-microservice`
3. Descrição: "Microsserviço de validação de senhas com regras customizadas usando Regex"
4. Público ou Privado (sua escolha)
5. **NÃO** inicialize com README (já temos um)
6. Clique em "Create repository"

### 3. Conectar e Fazer Push

```bash
# Adicione o remote (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/password-validator-microservice.git

# Renomeie branch para main (se necessário)
git branch -M main

# Faça o push
git push -u origin main
```

---

## 🌐 Deploy em Plataformas Cloud

### Opção 1: Heroku (Gratuito/Pago)

#### Pré-requisitos
- Conta no Heroku
- Heroku CLI instalado

#### Passos

1. **Login no Heroku**
```bash
heroku login
```

2. **Criar aplicação**
```bash
heroku create password-validator-api
```

3. **Deploy**
```bash
git push heroku main
```

4. **Verificar logs**
```bash
heroku logs --tail
```

5. **Abrir aplicação**
```bash
heroku open
```

Sua API estará disponível em: `https://password-validator-api.herokuapp.com`

---

### Opção 2: Render (Gratuito)

1. Acesse https://render.com
2. Conecte sua conta GitHub
3. Clique em "New +" → "Web Service"
4. Selecione o repositório `password-validator-microservice`
5. Configure:
   - **Name:** password-validator-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Clique em "Create Web Service"

Sua API estará disponível em: `https://password-validator-api.onrender.com`

---

### Opção 3: Railway (Gratuito/Pago)

1. Acesse https://railway.app
2. Login com GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecione o repositório
5. Railway detecta automaticamente Node.js
6. Deploy é automático!

---

### Opção 4: Vercel (Serverless)

**Nota:** Requer pequena adaptação para serverless

1. Instale Vercel CLI:
```bash
npm i -g vercel
```

2. Execute:
```bash
vercel
```

3. Siga as instruções interativas

---

### Opção 5: AWS EC2 (Controle total)

#### Passos básicos:

1. **Criar instância EC2**
   - Ubuntu Server 22.04 LTS
   - t2.micro (elegível para free tier)
   - Configurar Security Group (portas 22, 80, 3000)

2. **Conectar via SSH**
```bash
ssh -i sua-chave.pem ubuntu@seu-ip-publico
```

3. **Instalar Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clonar e executar**
```bash
git clone https://github.com/SEU_USUARIO/password-validator-microservice.git
cd password-validator-microservice
npm install
npm start
```

5. **Usar PM2 para manter rodando**
```bash
sudo npm install -g pm2
pm2 start src/server.js --name password-validator
pm2 startup
pm2 save
```

---

### Opção 6: Docker + Docker Hub

#### 1. Criar Dockerfile

Crie arquivo `Dockerfile` na raiz:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
```

#### 2. Criar .dockerignore

```
node_modules
npm-debug.log
coverage
.git
.gitignore
README.md
```

#### 3. Build e Push

```bash
# Build
docker build -t seu-usuario/password-validator:latest .

# Login no Docker Hub
docker login

# Push
docker push seu-usuario/password-validator:latest
```

#### 4. Rodar localmente com Docker

```bash
docker run -p 3000:3000 seu-usuario/password-validator:latest
```

---

## 🔐 Variáveis de Ambiente

Para produção, configure:

```bash
# .env (não comitar!)
PORT=3000
NODE_ENV=production
```

Na plataforma de deploy, configure:
- `PORT` → Geralmente auto-configurado
- `NODE_ENV` → `production`

---

## ✅ Checklist Pré-Deploy

- [ ] Todos os testes passando (`npm test`)
- [ ] Sem erros de lint (`npm run lint`)
- [ ] `.gitignore` configurado corretamente
- [ ] README.md atualizado
- [ ] Variáveis de ambiente documentadas
- [ ] Health check endpoint funcionando
- [ ] CORS configurado adequadamente
- [ ] Helmet ativado para segurança

---

## 📊 Monitoramento (Opcional)

### PM2 Monitoring
```bash
pm2 install pm2-logrotate
pm2 monit
```

### New Relic (APM)
```bash
npm install newrelic
```

### Sentry (Error tracking)
```bash
npm install @sentry/node
```

---

## 🔄 CI/CD com GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "password-validator-api"
          heroku_email: "seu-email@example.com"
```

---

## 📝 Documentação da API (Swagger - Opcional)

Para adicionar Swagger UI:

```bash
npm install swagger-ui-express swagger-jsdoc
```

Será necessário configuração adicional - consulte documentação do Swagger.

---

## 🎯 Próximos Passos

1. ✅ Publicar no GitHub
2. ✅ Escolher plataforma de deploy
3. ✅ Configurar domínio customizado (opcional)
4. ✅ Implementar rate limiting (opcional)
5. ✅ Adicionar logging estruturado (Winston)
6. ✅ Configurar CI/CD
7. ✅ Monitoramento e alertas

---

**Pronto para produção! 🚀**
