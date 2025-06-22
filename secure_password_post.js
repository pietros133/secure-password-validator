const express = require('express');
const app = express();

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

// Rota POST para validar senha
app.post('/validate-password', (req, res) => {
  const password = req.body.password;

  if (!password) {
    return res.status(400).json({ errors: ['Password not provided'] });
  }

  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one numeric digit');
  }
  if (!/[@!#$%&*]/.test(password)) {
    errors.push('Password must contain at least one special character (@!#$%&*)');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  return res.status(200).json({ message: 'Password is valid' });
});

// Rota GET simples para testar servidor
app.get('/', (req, res) => {
  res.send('Servidor rodando! Use POST /validate-password para validar senha.');
});

// Inicia o servidor na porta 8081
app.listen(8081, () => {
  console.log('🚀 Servidor rodando em http://localhost:8081');
});
