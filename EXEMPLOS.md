# 🧪 Exemplos de Uso - Password Validator API

## Respostas de Exemplo Detalhadas

### 1️⃣ Senha VÁLIDA ✅

**Requisição (cURL):**
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

---

### 2️⃣ Senha INVÁLIDA - Múltiplos erros ❌

**Requisição (cURL):**
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

---

### 3️⃣ Senha INVÁLIDA - Falta apenas maiúscula ❌

**Requisição (cURL):**
```bash
curl -X POST http://localhost:3000/validar-senha \
  -H "Content-Type: application/json" \
  -d '{"senha":"abcdef1!"}'
```

**Resposta (200 OK):**
```json
{
  "valida": false,
  "erros": [
    "A senha precisa ter pelo menos 1 letra maiúscula"
  ]
}
```

---

### 4️⃣ Campo 'senha' ausente ⚠️

**Requisição (cURL):**
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

---

### 5️⃣ Senha completamente inválida ❌

**Requisição (cURL):**
```bash
curl -X POST http://localhost:3000/validar-senha \
  -H "Content-Type: application/json" \
  -d '{"senha":"abc"}'
```

**Resposta (200 OK):**
```json
{
  "valida": false,
  "erros": [
    "A senha precisa ter no mínimo 8 caracteres",
    "A senha precisa ter pelo menos 1 letra maiúscula",
    "A senha precisa ter pelo menos 1 número",
    "A senha precisa ter pelo menos 1 caractere especial (!@#$%^&*)"
  ]
}
```

---

### 6️⃣ Senha válida complexa ✅

**Requisição (cURL):**
```bash
curl -X POST http://localhost:3000/validar-senha \
  -H "Content-Type: application/json" \
  -d '{"senha":"MyP@ssw0rd!2023"}'
```

**Resposta (200 OK):**
```json
{
  "valida": true,
  "erros": []
}
```

---

## 📱 Exemplos com HTTPie

### Senha válida
```bash
http POST localhost:3000/validar-senha senha="Test123!"
```

### Senha inválida
```bash
http POST localhost:3000/validar-senha senha="semsenha"
```

### Formato JSON bonito
```bash
http POST localhost:3000/validar-senha senha="abc" --pretty=all
```

---

## 🧪 Exemplos com JavaScript (fetch)

### Browser/Node.js
```javascript
// Senha válida
fetch('http://localhost:3000/validar-senha', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ senha: 'Abcdef1!' })
})
  .then(res => res.json())
  .then(data => console.log(data));
// { valida: true, erros: [] }

// Senha inválida
fetch('http://localhost:3000/validar-senha', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ senha: 'senha123' })
})
  .then(res => res.json())
  .then(data => console.log(data));
// { valida: false, erros: [...] }
```

---

## 🔍 Health Check

**Requisição:**
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

---

## 📊 Casos de Teste Completos

| Senha | Válida | Erros |
|-------|--------|-------|
| `Abcdef1!` | ✅ Sim | - |
| `MyP@ssw0rd123` | ✅ Sim | - |
| `Test123!` | ✅ Sim | - |
| `abc123` | ❌ Não | Tamanho, Maiúscula, Especial |
| `abcdef1!` | ❌ Não | Maiúscula |
| `Abcdefg!` | ❌ Não | Número |
| `Abcdef12` | ❌ Não | Especial |
| `Test1!` | ❌ Não | Tamanho |
| `abc` | ❌ Não | Todas as regras |
| `` (vazio) | ❌ Não | Todas as regras |

---

## 💡 Dicas para Testes

### Postman/Insomnia
1. Crie uma Collection chamada "Password Validator"
2. Adicione requests para cada cenário acima
3. Use Tests/Scripts para validar respostas automaticamente
4. Exporte a collection para compartilhar com o time

### Automated Testing
Execute os testes automatizados:
```bash
npm test
```

Isso irá validar todos os 18 casos de teste implementados!
