## Documentação da API — Password Validator Microservice

Esta documentação descreve como integrar o microsserviço de validação de senhas no frontend de login.

---

## Visão geral

O serviço expõe um endpoint REST simples para validar senhas segundo as seguintes regras:

- Mínimo de 8 caracteres
- Ao menos 1 letra maiúscula (A-Z)
- Ao menos 1 número (0-9)
- Ao menos 1 caractere especial do conjunto: `!@#$%^&*`

O código do backend está em Node.js/Express. O endpoint principal é:

- POST /validar-senha

Também existe um health-check:

- GET /

---

## Como rodar localmente (recapitulando)

1. Instale dependências:

```bash
npm install
```

2. Rode em desenvolvimento:

```bash
npm run dev
```

Servidor padrão: `http://localhost:3001`

---

## Endpoint: POST /validar-senha

URL (exemplo):

```
http://localhost:3001/validar-senha
```

Headers:

- `Content-Type: application/json`

Body esperado (JSON):

```json
{ "senha": "SuaSenhaAqui" }
```

Respostas possíveis:

- 200 OK — Body válido e validação executada (mesmo quando a senha é inválida):

```json
{
  "valida": true|false,
  "erros": [/* array de mensagens de erro; vazio se válida */],
  "confirmacao": "Senha válida ✅" // (presente apenas quando valida === true)
}
```

- 400 Bad Request — quando o body não contém `senha` ou `senha` não é string:

```json
{
  "valida": false,
  "erros": ["Campo 'senha' é obrigatório"]
}
```

ou

```json
{
  "valida": false,
  "erros": ["Campo 'senha' deve ser uma string"]
}
```

Observações:

- Quando o campo `senha` existe e é string, o servidor sempre retorna 200 (com `valida` true/false). Somente ausência/tipo incorreto leva a 400.
- O serviço já habilita CORS por padrão, então requisições do frontend (mesmo em origem diferente) funcionam sem configuração adicional.

---

## Exemplo de integração — Fetch API (vanilla JS)

Exemplo mínimo para usar no frontend de login (tratamento de erros e UX simples):

```javascript
async function validarSenhaNoBackend(senha) {
  try {
  const res = await fetch('http://localhost:3001/validar-senha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha })
    });

    // Se status 400, corpo com erros de validação do request
    if (res.status === 400) {
      const errJson = await res.json();
      return { ok: false, valida: false, erros: errJson.erros };
    }

    // Status 200 (resultado da validação)
    const json = await res.json();
    return { ok: true, ...json };
  } catch (e) {
    // Rede/timeout
    return { ok: false, valida: false, erros: ['Erro de rede ao validar senha'] };
  }
}

// Uso em um formulário simples:
document.querySelector('#loginForm').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const senha = document.querySelector('#senha').value;
  const resultado = await validarSenhaNoBackend(senha);

  if (!resultado.ok) {
    // exibir mensagem genérica ou lista de erros
    alert(resultado.erros.join('\n'));
    return;
  }

  if (!resultado.valida) {
    // exibir cada erro para o usuário (boa UX)
    alert('Senha inválida:\n' + resultado.erros.join('\n'));
    return;
  }

  // Se válida, proceder com o fluxo de criação de conta / login
  console.log('Senha válida — continuar fluxo');
});
```

---

## Exemplo de integração — React (hook curto)

```javascript
import { useState } from 'react';

function useValidarSenha() {
  const [loading, setLoading] = useState(false);

  async function validar(senha) {
    setLoading(true);
    try {
      const res = await fetch('/validar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha })
      });
      const json = await res.json();
      return json; // { valida, erros, ... }
    } finally {
      setLoading(false);
    }
  }

  return { validar, loading };
}

export default useValidarSenha;
```

Dica: em produção, prefira usar a URL completa do serviço ou configurar um proxy no seu servidor frontend.

---

## Tratamento das mensagens de erro no frontend

- `erros` é um array de strings (em PT-BR). Mostre-as ao usuário de forma clara e amena.
- Agrupe as mensagens por prioridade (por exemplo: mostre primeiro o requisito de tamanho, depois os outros).
- Para melhor UX, combine validação cliente (feedback instantâneo) com validação servidor (autoridade e segurança).

---

## Health-check

GET `/` retorna JSON com status do serviço. Útil para monitoramento e readiness checks.

Exemplo de resposta:

```json
{
  "service": "Password Validator Microservice",
  "status": "online",
  "version": "1.0.0"
}
```

---

## Observações de segurança e deploy

- O serviço usa `helmet()` e `cors()`; em produção, ajuste políticas de CORS para restringir origens permitidas.
- Considere adicionar rate-limiting se o endpoint ficar público e houver risco de abuso.
- Logs não devem conter senhas em texto em produção — o projeto atual escreve a senha no console para debug; remova ou masque em ambientes reais.

---

## Formato resumido (contrato)

- Entrada: { senha: string }
- Saída (200): { valida: boolean, erros: string[], confirmacao?: string }
- Erro 400: { valida: false, erros: [string] }

---

Se quiser, eu posso gerar um trecho de código pronto para o seu projeto frontend (React/Next/Vue) adaptado ao seu fluxo de login — diga qual stack você usa e eu crio.
