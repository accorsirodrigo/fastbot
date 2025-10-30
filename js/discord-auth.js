/**
 * Discord OAuth2 Integration
 * Handles Discord authentication flow on the frontend
 */

// Usar configuração centralizada ou fallback
const DISCORD_CONFIG = {
    // Client ID vem de config.js (ou fallback)
    clientId: window.SITE_CONFIG?.discord?.clientId || 'SEU_DISCORD_CLIENT_ID_AQUI',
    // URL de redirect (deve estar configurada no Discord Developer Portal)
    redirectUri: window.SITE_CONFIG?.discord?.redirectUri || 'http://localhost:3001/auth/discord/callback',
    // Permissões solicitadas
    scopes: ['identify', 'email'],
    // Tipo de resposta OAuth2
    responseType: 'code'
};

/**
 * Gera um state aleatório para proteção CSRF
 * @returns {string} State aleatório em base64
 */
function generateRandomState() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

/**
 * Inicia o fluxo de autenticação OAuth2 do Discord
 */
function initiateDiscordLogin() {
    try {
        // Verificar se o Client ID foi configurado
        if (DISCORD_CONFIG.clientId === 'SEU_DISCORD_CLIENT_ID_AQUI') {
            alert('⚠️ Discord OAuth não configurado!\n\nPara usar esta funcionalidade:\n\n1. Crie uma aplicação em https://discord.com/developers/applications\n2. Configure o Client ID em js/discord-auth.js\n3. Configure o redirect URI no Discord Portal\n4. Implemente o backend (veja DISCORD_OAUTH_GUIDE.md)');
            return;
        }
        
        // Gerar e salvar state para validação CSRF
        const state = generateRandomState();
        sessionStorage.setItem('discord_oauth_state', state);
        
        // Salvar URL de origem para redirect após login
        const returnUrl = sessionStorage.getItem('discord_return_url') || '/';
        sessionStorage.setItem('discord_return_url', returnUrl);
        
        // Construir URL de autorização OAuth2
        const params = new URLSearchParams({
            client_id: DISCORD_CONFIG.clientId,
            redirect_uri: DISCORD_CONFIG.redirectUri,
            response_type: DISCORD_CONFIG.responseType,
            scope: DISCORD_CONFIG.scopes.join(' '),
            state: state
        });
        
        const authUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
        
        console.log('🔐 Iniciando autenticação Discord...');
        console.log('Redirect URI:', DISCORD_CONFIG.redirectUri);
        
        // Redirecionar para Discord
        window.location.href = authUrl;
        
    } catch (error) {
        console.error('Erro ao iniciar autenticação Discord:', error);
        alert('Erro ao conectar com Discord. Tente novamente.');
    }
}

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} True se autenticado
 */
function isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    
    try {
        // Decodificar JWT para verificar expiração
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiration = payload.exp * 1000;
        return Date.now() < expiration;
    } catch (error) {
        return false;
    }
}

/**
 * Faz logout do usuário
 */
function logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    window.location.href = '/';
}

/**
 * Obtém os dados do usuário atual
 * @returns {Object|null} Dados do usuário ou null
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
        return JSON.parse(userStr);
    } catch (error) {
        console.error('Erro ao parsear dados do usuário:', error);
        return null;
    }
}

/**
 * Faz uma requisição autenticada para a API
 * @param {string} url - URL da API
 * @param {Object} options - Opções do fetch
 * @returns {Promise} Resposta da API
 */
async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
        throw new Error('Usuário não autenticado');
    }
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };
    
    const response = await fetch(url, {
        ...options,
        headers
    });
    
    if (response.status === 401) {
        // Token expirado ou inválido
        logout();
        throw new Error('Sessão expirada. Faça login novamente.');
    }
    
    return response;
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    
    // Adicionar event listener ao botão Discord
    const discordButton = document.querySelector('.social-button.discord');
    if (discordButton) {
        discordButton.addEventListener('click', function(e) {
            e.preventDefault();
            initiateDiscordLogin();
        });
    }
    
    // Verificar se o usuário já está autenticado
    if (isAuthenticated()) {
        const user = getCurrentUser();
        console.log('✅ Usuário autenticado:', user?.username);
        
        // Você pode atualizar a UI aqui
        // Exemplo: mostrar nome do usuário, esconder botões de login, etc.
    }
});

// Exportar funções para uso global
window.DiscordAuth = {
    login: initiateDiscordLogin,
    logout: logout,
    isAuthenticated: isAuthenticated,
    getCurrentUser: getCurrentUser,
    authenticatedFetch: authenticatedFetch
};

