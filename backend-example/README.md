# Backend Simples - Discord OAuth2

Backend simplificado para autenticação Discord usando OAuth2.

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas credenciais
nano .env
```

### 3. Obter Credenciais Discord

1. Acesse: https://discord.com/developers/applications
2. Clique em "New Application"
3. Vá em OAuth2 → General
4. Copie:
   - Client ID
   - Client Secret (clique em Reset Secret se necessário)
5. Em "Redirects", adicione:
   - `http://localhost:3001/auth/discord/callback`

### 4. Configurar .env

```env
DISCORD_CLIENT_ID=seu_client_id_aqui
DISCORD_CLIENT_SECRET=seu_secret_aqui
DISCORD_REDIRECT_URI=http://localhost:3001/auth/discord/callback
FRONTEND_URL=http://localhost:8000
JWT_SECRET=gere-um-secret-aleatorio-seguro
```

### 5. Iniciar Servidor

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

## 📡 Endpoints Disponíveis

### GET /health
Health check do servidor

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2024-10-29T12:00:00.000Z"
}
```

### GET /auth/discord/callback
Callback do Discord OAuth2 (não chamar diretamente)

**Parâmetros:**
- `code`: Código de autorização do Discord
- `state`: State para validação CSRF

**Fluxo:**
1. Recebe código do Discord
2. Troca código por access token
3. Busca dados do usuário
4. Cria/atualiza usuário
5. Gera JWT
6. Redireciona para frontend com token

### GET /auth/me
Obtém dados do usuário autenticado

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Resposta:**
```json
{
  "user": {
    "id": "123456789",
    "username": "usuario",
    "discriminator": "1234",
    "avatar": "avatar_hash",
    "email": "email@example.com"
  }
}
```

### POST /auth/logout
Faz logout do usuário

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Resposta:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

## 🔒 Segurança

### ⚠️ IMPORTANTE - Antes de Deploy em Produção

Este é um exemplo SIMPLIFICADO. Para produção, você DEVE:

1. **Usar Banco de Dados Real**
   - Atualmente usa Map em memória
   - Implemente PostgreSQL, MongoDB, etc.

2. **Adicionar Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

3. **Adicionar Helmet para Segurança**
   ```bash
   npm install helmet
   ```

4. **Usar HTTPS**
   - Obrigatório em produção
   - Configure SSL/TLS

5. **Validar State (CSRF Protection)**
   - Implementar validação de state

6. **Logs Seguros**
   - Não logar tokens ou secrets
   - Use winston ou similar

7. **Variáveis de Ambiente Seguras**
   - Use serviço de secrets (AWS Secrets Manager, etc)
   - Nunca commite .env

## 🧪 Testando

### 1. Iniciar Frontend
```bash
# Na pasta raiz do projeto
python -m http.server 8000
```

### 2. Iniciar Backend
```bash
# Na pasta backend-example
npm run dev
```

### 3. Testar Fluxo
1. Abra: http://localhost:8000/pages/signup.html
2. Clique em "Continuar com Discord"
3. Autorize no Discord
4. Deve redirecionar de volta com token

## 📝 Estrutura de Dados

### Usuário
```javascript
{
  id: "discord_user_id",
  discordId: "discord_user_id",
  username: "nome_usuario",
  discriminator: "1234",
  email: "email@example.com",
  avatar: "avatar_hash",
  verified: true,
  createdAt: Date,
  updatedAt: Date
}
```

### JWT Payload
```javascript
{
  userId: "discord_user_id",
  username: "nome_usuario",
  email: "email@example.com",
  iat: timestamp,
  exp: timestamp
}
```

## 🐛 Debug

### Ver usuários cadastrados
```bash
# Apenas em desenvolvimento
curl http://localhost:3001/debug/users
```

### Logs
O servidor exibe logs coloridos:
- 📥 Entrada
- 🔄 Processamento
- ✅ Sucesso
- ❌ Erro

## 📚 Próximos Passos

1. Implementar banco de dados
2. Adicionar refresh tokens
3. Implementar rate limiting
4. Adicionar testes
5. Configurar CI/CD
6. Deploy em produção

## 🤝 Suporte

Consulte o arquivo principal: `DISCORD_OAUTH_GUIDE.md`

