/**
 * Testes unitários para o validador de senhas
 */

const { validatePassword, passwordRegex, errorMessages } = require('../src/services/passwordValidator');

describe('Password Validator Service', () => {
  
  describe('validatePassword - Senhas válidas', () => {
    test('deve validar senha com todos os requisitos atendidos', () => {
      const resultado = validatePassword('Abcdef1!');
      
      expect(resultado.valida).toBe(true);
      expect(resultado.erros).toEqual([]);
    });

    test('deve validar senha complexa com múltiplos caracteres especiais', () => {
      const resultado = validatePassword('MyP@ssw0rd!#');
      
      expect(resultado.valida).toBe(true);
      expect(resultado.erros).toEqual([]);
    });

    test('deve validar senha com exatamente 8 caracteres', () => {
      const resultado = validatePassword('Test123!');
      
      expect(resultado.valida).toBe(true);
      expect(resultado.erros).toEqual([]);
    });
  });

  describe('validatePassword - Falhas individuais', () => {
    test('deve falhar quando senha tem menos de 8 caracteres', () => {
      const resultado = validatePassword('Test1!');
      
      expect(resultado.valida).toBe(false);
      expect(resultado.erros).toContain(errorMessages.minLength);
      expect(resultado.erros.length).toBeGreaterThan(0);
    });

    test('deve falhar quando senha não tem letra maiúscula', () => {
      const resultado = validatePassword('abcdef1!');
      
      expect(resultado.valida).toBe(false);
      expect(resultado.erros).toContain(errorMessages.uppercase);
    });

    test('deve falhar quando senha não tem número', () => {
      const resultado = validatePassword('Abcdefg!');
      
      expect(resultado.valida).toBe(false);
      expect(resultado.erros).toContain(errorMessages.number);
    });

    test('deve falhar quando senha não tem caractere especial', () => {
      const resultado = validatePassword('Abcdef12');
      
      expect(resultado.valida).toBe(false);
      expect(resultado.erros).toContain(errorMessages.special);
    });
  });

  describe('validatePassword - Múltiplas falhas', () => {
    test('deve retornar múltiplos erros quando senha falha em várias regras', () => {
      const resultado = validatePassword('abc');
      
      expect(resultado.valida).toBe(false);
      expect(resultado.erros).toContain(errorMessages.minLength);
      expect(resultado.erros).toContain(errorMessages.uppercase);
      expect(resultado.erros).toContain(errorMessages.number);
      expect(resultado.erros).toContain(errorMessages.special);
      expect(resultado.erros.length).toBe(4);
    });

    test('deve retornar 3 erros para senha sem maiúscula, número e especial', () => {
      const resultado = validatePassword('abcdefgh');
      
      expect(resultado.valida).toBe(false);
      expect(resultado.erros.length).toBe(3);
      expect(resultado.erros).toContain(errorMessages.uppercase);
      expect(resultado.erros).toContain(errorMessages.number);
      expect(resultado.erros).toContain(errorMessages.special);
    });
  });

  describe('validatePassword - Formato de retorno', () => {
    test('deve sempre retornar objeto com propriedades valida e erros', () => {
      const resultado = validatePassword('Test123!');
      
      expect(resultado).toHaveProperty('valida');
      expect(resultado).toHaveProperty('erros');
      expect(typeof resultado.valida).toBe('boolean');
      expect(Array.isArray(resultado.erros)).toBe(true);
    });

    test('deve retornar array vazio de erros quando senha é válida', () => {
      const resultado = validatePassword('ValidPass1!');
      
      expect(resultado.erros).toEqual([]);
    });

    test('deve retornar array de strings quando senha é inválida', () => {
      const resultado = validatePassword('invalid');
      
      expect(Array.isArray(resultado.erros)).toBe(true);
      resultado.erros.forEach(erro => {
        expect(typeof erro).toBe('string');
      });
    });
  });

  describe('Regex patterns', () => {
    test('regex uppercase deve detectar letras maiúsculas', () => {
      expect(passwordRegex.uppercase.test('ABC')).toBe(true);
      expect(passwordRegex.uppercase.test('abc')).toBe(false);
      expect(passwordRegex.uppercase.test('aBc')).toBe(true);
    });

    test('regex number deve detectar números', () => {
      expect(passwordRegex.number.test('123')).toBe(true);
      expect(passwordRegex.number.test('abc')).toBe(false);
      expect(passwordRegex.number.test('a1b')).toBe(true);
    });

    test('regex special deve detectar apenas caracteres permitidos', () => {
      expect(passwordRegex.special.test('!')).toBe(true);
      expect(passwordRegex.special.test('@')).toBe(true);
      expect(passwordRegex.special.test('#')).toBe(true);
      expect(passwordRegex.special.test('$')).toBe(true);
      expect(passwordRegex.special.test('%')).toBe(true);
      expect(passwordRegex.special.test('^')).toBe(true);
      expect(passwordRegex.special.test('&')).toBe(true);
      expect(passwordRegex.special.test('*')).toBe(true);
      expect(passwordRegex.special.test('+')).toBe(false);
      expect(passwordRegex.special.test('=')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('deve tratar senha vazia', () => {
      const resultado = validatePassword('');
      
      expect(resultado.valida).toBe(false);
      expect(resultado.erros.length).toBe(4);
    });

    test('deve validar senha longa com todos os requisitos', () => {
      const resultado = validatePassword('ThisIsAVeryLongPassword123!@#');
      
      expect(resultado.valida).toBe(true);
      expect(resultado.erros).toEqual([]);
    });

    test('deve aceitar múltiplos caracteres especiais permitidos', () => {
      const resultado = validatePassword('Test!@#$%^&*123');
      
      expect(resultado.valida).toBe(true);
    });
  });
});
