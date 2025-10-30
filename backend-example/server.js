/**
 * Servidor Backend Simplificado para Discord OAuth2
 * 
 * Para usar:
 * 1. npm install express axios dotenv cors jsonwebtoken
 * 2. Criar arquivo .env com suas credenciais
 * 3. node server.js
 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração
const config = {
    discord: {
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        redirectUri: process.env.DISCORD_REDIRECT_URI,
        tokenUrl: 'https://discord.com/api/oauth2/token',
        userUrl: 'https://discord.com/api/users/@me'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'change-this-in-production',
        expiresIn: '7d'
    },
    frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:8000'
    }
};

// Middleware
app.use(cors({
    origin: config.frontend.url,
    credentials: true
}));
app.use(express.json());

// Armazenamento em memória (use banco de dados em produção!)
const users = new Map();

/**
 * Health Check
 */
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

/**
 * Discord OAuth2 Callback
 * Esta rota é chamada pelo Discord após o usuário autorizar
 */
app.get('/auth/discord/callback', async (req, res) => {
    const { code, state } = req.query;
    
    console.log('📥 Recebido callback do Discord');
    
    if (!code) {
        console.error('❌ Código não fornecido');
        return res.redirect(`${config.frontend.url}/pages/auth/error?reason=no_code`);
    }
    
    try {
        // 1. Trocar código por access token
        console.log('🔄 Trocando código por token...');
        const tokenData = await exchangeCodeForToken(code);
        
        // 2. Buscar dados do usuário
        console.log('👤 Buscando dados do usuário...');
        const discordUser = await getDiscordUser(tokenData.access_token);
        
        // 3. Criar ou atualizar usuário
        console.log('💾 Salvando usuário...');
        const user = createOrUpdateUser(discordUser);
        
        // 4. Gerar JWT
        console.log('🔐 Gerando token JWT...');
        const jwtToken = generateJWT(user);
        
        // 5. Redirecionar para frontend com token
        console.log('✅ Autenticação completa!');
        res.redirect(`${config.frontend.url}/pages/auth/success?token=${jwtToken}`);
        
    } catch (error) {
        console.error('❌ Erro no OAuth:', error.response?.data || error.message);
        res.redirect(`${config.frontend.url}/pages/auth/error?reason=oauth_failed`);
    }
});

/**
 * Troca o código de autorização por access token
 */
async function exchangeCodeForToken(code) {
    const params = new URLSearchParams({
        client_id: config.discord.clientId,
        client_secret: config.discord.clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.discord.redirectUri
    });
    
    const response = await axios.post(
        config.discord.tokenUrl,
        params.toString(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
    
    return response.data;
}

/**
 * Busca dados do usuário usando o access token
 */
async function getDiscordUser(accessToken) {
    const response = await axios.get(config.discord.userUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    
    return response.data;
}

/**
 * Cria ou atualiza usuário no armazenamento
 * ⚠️ ATENÇÃO: Em produção, use banco de dados real!
 */
function createOrUpdateUser(discordUser) {
    const userId = discordUser.id;
    
    const user = {
        id: userId,
        discordId: userId,
        username: discordUser.username,
        discriminator: discordUser.discriminator,
        email: discordUser.email,
        avatar: discordUser.avatar,
        verified: discordUser.verified,
        createdAt: users.has(userId) ? users.get(userId).createdAt : new Date(),
        updatedAt: new Date()
    };
    
    users.set(userId, user);
    
    console.log(`👤 Usuário ${user.username}#${user.discriminator} salvo`);
    
    return user;
}

/**
 * Gera token JWT
 */
function generateJWT(user) {
    const payload = {
        userId: user.id,
        username: user.username,
        email: user.email
    };
    
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    });
}

/**
 * Middleware de autenticação
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
}

/**
 * Rota para obter dados do usuário atual
 */
app.get('/auth/me', authenticateToken, (req, res) => {
    const user = users.get(req.user.userId);
    
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Não enviar dados sensíveis
    const safeUser = {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        email: user.email
    };
    
    res.json({ user: safeUser });
});

/**
 * Logout
 */
app.post('/auth/logout', authenticateToken, (req, res) => {
    console.log('👋 Usuário fez logout:', req.user.username);
    res.json({ message: 'Logout realizado com sucesso' });
});

/**
 * Listar todos os usuários (APENAS PARA DEBUG - REMOVER EM PRODUÇÃO)
 */
app.get('/debug/users', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(404).json({ error: 'Not found' });
    }
    
    const userList = Array.from(users.values()).map(u => ({
        username: u.username,
        email: u.email,
        createdAt: u.createdAt
    }));
    
    res.json({ users: userList, count: userList.length });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🚀 Servidor iniciado!');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🔗 Frontend: ${config.frontend.url}`);
    console.log(`🔐 Discord Client ID: ${config.discord.clientId || '❌ NÃO CONFIGURADO'}`);
    console.log(`📋 Redirect URI: ${config.discord.redirectUri || '❌ NÃO CONFIGURADO'}`);
    console.log('');
    console.log('✅ Rotas disponíveis:');
    console.log('   GET  /health');
    console.log('   GET  /auth/discord/callback');
    console.log('   GET  /auth/me');
    console.log('   POST /auth/logout');
    console.log('');
    
    if (!config.discord.clientId || !config.discord.clientSecret) {
        console.log('⚠️  ATENÇÃO: Configure as variáveis de ambiente no arquivo .env');
        console.log('   Veja o arquivo .env.example');
    }
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error('❌ Erro:', err);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

