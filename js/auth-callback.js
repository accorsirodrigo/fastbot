/**
 * Auth Callback Handler
 * Processa o retorno da autenticação Discord
 */

document.addEventListener('DOMContentLoaded', function() {
    processAuthCallback();
});

/**
 * Processa o callback de autenticação
 */
async function processAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const userInfo = document.getElementById('userInfo');
    
    console.log('🔐 Processando callback de autenticação...');
    
    if (!token) {
        showError('Token não encontrado na URL');
        return;
    }
    
    try {
        // 1. Salvar token
        localStorage.setItem('auth_token', token);
        console.log('✅ Token salvo');
        
        // 2. Buscar dados do usuário
        statusMessage.textContent = 'Carregando seus dados...';
        
        const userData = await fetchUserData(token);
        console.log('✅ Dados do usuário obtidos:', userData.user.username);
        
        // 3. Salvar dados do usuário
        localStorage.setItem('user', JSON.stringify(userData.user));
        
        // Track successful login
        if (window.Analytics) {
            window.Analytics.trackLogin('discord');
        }
        
        // 4. Mostrar informações do usuário
        displayUserInfo(userData.user);
        
        // 5. Aguardar um momento para o usuário ver as informações
        await sleep(1500);
        
        // 6. Redirecionar para a página inicial
        console.log('🚀 Redirecionando...');
        statusMessage.textContent = 'Redirecionando...';
        
        await sleep(500);
        window.location.href = '../../index.html';
        
    } catch (error) {
        console.error('❌ Erro ao processar autenticação:', error);
        
        // Track error
        if (window.Analytics) {
            window.Analytics.trackError('auth_callback', error.message || 'Unknown error');
        }
        
        showError(error.message || 'Erro ao processar autenticação');
    }
}

/**
 * Busca dados do usuário no backend
 */
async function fetchUserData(token) {
    const backendUrl = 'http://localhost:3001'; // Deve corresponder ao backend
    
    const response = await fetch(`${backendUrl}/auth/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Falha ao obter dados do usuário');
    }
    
    return await response.json();
}

/**
 * Mostra informações do usuário
 */
function displayUserInfo(user) {
    const userInfo = document.getElementById('userInfo');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const statusMessage = document.getElementById('statusMessage');
    
    // Construir URL do avatar
    const avatarUrl = user.avatar 
        ? `https://cdn.discordapp.com/avatars/${user.discordId || user.id}/${user.avatar}.png?size=128`
        : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 5)}.png`;
    
    userAvatar.src = avatarUrl;
    userName.textContent = user.username + (user.discriminator ? `#${user.discriminator}` : '');
    userEmail.textContent = user.email || 'Email não disponível';
    
    // Esconder spinner e mostrar dados
    loadingSpinner.style.display = 'none';
    statusMessage.textContent = 'Bem-vindo!';
    userInfo.style.display = 'block';
}

/**
 * Mostra mensagem de erro
 */
function showError(message) {
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const successIcon = document.getElementById('successIcon');
    
    console.error('❌', message);
    
    statusTitle.textContent = 'Erro na Autenticação';
    statusMessage.textContent = 'Algo deu errado...';
    loadingSpinner.style.display = 'none';
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Mudar ícone para erro
    successIcon.style.background = 'rgba(255, 87, 87, 0.2)';
    successIcon.style.border = '3px solid #ff5757';
    successIcon.innerHTML = `
        <svg viewBox="0 0 24 24" style="stroke: #ff5757;">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
    `;
    
    // Redirecionar para página de erro após 3 segundos
    setTimeout(() => {
        window.location.href = './error.html?reason=processing_failed';
    }, 3000);
}

/**
 * Função auxiliar para aguardar
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

