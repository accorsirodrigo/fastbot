/**
 * Cookie Consent Manager
 * Gerencia o consentimento de cookies e preferências do usuário
 */

(function() {
    'use strict';
    
    // Chave para armazenar preferências no localStorage
    const STORAGE_KEY = 'cookie_consent_preferences';
    const CONSENT_VERSION = '1.0'; // Incrementar quando a política mudar
    
    // Estado padrão das preferências
    const defaultPreferences = {
        version: CONSENT_VERSION,
        necessary: true, // Sempre true, não pode ser desabilitado
        analytics: false,
        marketing: false,
        timestamp: null,
        hasResponded: false
    };
    
    /**
     * Obtém as preferências salvas ou retorna as padrão
     */
    function getPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return { ...defaultPreferences };
            
            const preferences = JSON.parse(stored);
            
            // Verificar se a versão mudou
            if (preferences.version !== CONSENT_VERSION) {
                console.log('🍪 Versão de consentimento atualizada, solicitando novo consentimento');
                return { ...defaultPreferences };
            }
            
            return preferences;
        } catch (error) {
            console.error('Erro ao ler preferências de cookies:', error);
            return { ...defaultPreferences };
        }
    }
    
    /**
     * Salva as preferências no localStorage
     */
    function savePreferences(preferences) {
        try {
            preferences.timestamp = new Date().toISOString();
            preferences.version = CONSENT_VERSION;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
            console.log('🍪 Preferências de cookies salvas:', preferences);
            return true;
        } catch (error) {
            console.error('Erro ao salvar preferências de cookies:', error);
            return false;
        }
    }
    
    /**
     * Cria o HTML do banner de consentimento
     */
    function createConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.id = 'cookieConsentBanner';
        
        banner.innerHTML = `
            <div class="cookie-icon">🍪</div>
            <div class="cookie-content">
                <h3>Nós valorizamos sua privacidade</h3>
                <p>
                    Usamos cookies para melhorar sua experiência, analisar o tráfego do site e 
                    personalizar conteúdo. Você pode escolher quais cookies aceitar.
                    <a href="#" id="cookieLearnMore">Saiba mais</a>
                </p>
                
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-btn-accept" id="cookieAcceptAll">
                        Aceitar Todos
                    </button>
                    <button class="cookie-btn cookie-btn-decline" id="cookieDeclineAll">
                        Recusar Todos
                    </button>
                </div>
                
                <a href="#" class="cookie-preferences-link" id="cookieCustomize">
                    ⚙️ Personalizar Preferências
                </a>
                
                <div class="cookie-preferences" id="cookiePreferences">
                    <div class="cookie-preference-item">
                        <div class="cookie-preference-info">
                            <h4>🔒 Cookies Necessários</h4>
                            <p>Essenciais para o funcionamento básico do site. Sempre ativos.</p>
                        </div>
                        <div class="cookie-toggle active disabled" data-type="necessary">
                            <div class="cookie-toggle-slider"></div>
                        </div>
                    </div>
                    
                    <div class="cookie-preference-item">
                        <div class="cookie-preference-info">
                            <h4>📊 Cookies Analíticos</h4>
                            <p>Nos ajudam a entender como você usa nosso site para melhorá-lo.</p>
                        </div>
                        <div class="cookie-toggle" data-type="analytics">
                            <div class="cookie-toggle-slider"></div>
                        </div>
                    </div>
                    
                    <div class="cookie-preference-item">
                        <div class="cookie-preference-info">
                            <h4>🎯 Cookies de Marketing</h4>
                            <p>Usados para rastrear visitantes e exibir anúncios relevantes.</p>
                        </div>
                        <div class="cookie-toggle" data-type="marketing">
                            <div class="cookie-toggle-slider"></div>
                        </div>
                    </div>
                    
                    <div class="cookie-buttons">
                        <button class="cookie-btn cookie-btn-accept" id="cookieSavePreferences">
                            Salvar Preferências
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return banner;
    }
    
    /**
     * Cria o overlay de fundo
     */
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'cookie-consent-overlay';
        overlay.id = 'cookieConsentOverlay';
        return overlay;
    }
    
    /**
     * Cria o botão de configurações
     */
    function createSettingsButton() {
        const button = document.createElement('button');
        button.className = 'cookie-settings-button';
        button.id = 'cookieSettingsButton';
        button.innerHTML = '⚙️';
        button.title = 'Configurações de Cookies';
        return button;
    }
    
    /**
     * Mostra o banner de consentimento
     */
    function showBanner() {
        const overlay = document.getElementById('cookieConsentOverlay');
        const banner = document.getElementById('cookieConsentBanner');
        
        if (overlay && banner) {
            setTimeout(() => {
                overlay.classList.add('show');
                banner.classList.add('show');
            }, 500); // Pequeno delay para melhor UX
        }
    }
    
    /**
     * Esconde o banner de consentimento
     */
    function hideBanner() {
        const overlay = document.getElementById('cookieConsentOverlay');
        const banner = document.getElementById('cookieConsentBanner');
        
        if (overlay && banner) {
            overlay.classList.remove('show');
            banner.classList.remove('show');
            
            // Remover do DOM após a animação
            setTimeout(() => {
                overlay.style.display = 'none';
                banner.style.display = 'none';
            }, 500);
        }
    }
    
    /**
     * Mostra o botão de configurações
     */
    function showSettingsButton() {
        const button = document.getElementById('cookieSettingsButton');
        if (button) {
            setTimeout(() => {
                button.classList.add('show');
            }, 800);
        }
    }
    
    /**
     * Aplica as preferências de cookies
     */
    function applyPreferences(preferences) {
        console.log('🍪 Aplicando preferências de cookies:', preferences);
        
        // Emitir evento customizado para outros scripts
        const event = new CustomEvent('cookieConsentChanged', {
            detail: preferences
        });
        window.dispatchEvent(event);
        
        // Expor preferências globalmente
        window.cookieConsent = preferences;
        
        // Recarregar analytics se necessário
        if (preferences.analytics && typeof window.Analytics !== 'undefined') {
            console.log('🍪 Analytics autorizado pelo usuário');
        }
    }
    
    /**
     * Aceita todos os cookies
     */
    function acceptAll() {
        const preferences = {
            ...defaultPreferences,
            analytics: true,
            marketing: true,
            hasResponded: true
        };
        
        savePreferences(preferences);
        applyPreferences(preferences);
        hideBanner();
        showSettingsButton();
        
        // Rastrear consentimento
        if (typeof window.Analytics !== 'undefined') {
            window.Analytics.trackEvent('cookie_consent', {
                action: 'accept_all'
            });
        }
    }
    
    /**
     * Recusa todos os cookies opcionais
     */
    function declineAll() {
        const preferences = {
            ...defaultPreferences,
            analytics: false,
            marketing: false,
            hasResponded: true
        };
        
        savePreferences(preferences);
        applyPreferences(preferences);
        hideBanner();
        showSettingsButton();
        
        console.log('🍪 Cookies opcionais recusados');
    }
    
    /**
     * Salva preferências personalizadas
     */
    function saveCustomPreferences() {
        const analyticsToggle = document.querySelector('.cookie-toggle[data-type="analytics"]');
        const marketingToggle = document.querySelector('.cookie-toggle[data-type="marketing"]');
        
        const preferences = {
            ...defaultPreferences,
            analytics: analyticsToggle?.classList.contains('active') || false,
            marketing: marketingToggle?.classList.contains('active') || false,
            hasResponded: true
        };
        
        savePreferences(preferences);
        applyPreferences(preferences);
        hideBanner();
        showSettingsButton();
        
        // Rastrear consentimento
        if (typeof window.Analytics !== 'undefined' && preferences.analytics) {
            window.Analytics.trackEvent('cookie_consent', {
                action: 'custom',
                analytics: preferences.analytics,
                marketing: preferences.marketing
            });
        }
    }
    
    /**
     * Alterna o estado de um toggle
     */
    function toggleCookieType(toggle) {
        if (toggle.classList.contains('disabled')) return;
        toggle.classList.toggle('active');
    }
    
    /**
     * Mostra/esconde as preferências detalhadas
     */
    function togglePreferences() {
        const preferences = document.getElementById('cookiePreferences');
        if (preferences) {
            preferences.classList.toggle('show');
        }
    }
    
    /**
     * Configura os event listeners
     */
    function setupEventListeners() {
        // Botão aceitar todos
        const acceptAllBtn = document.getElementById('cookieAcceptAll');
        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', acceptAll);
        }
        
        // Botão recusar todos
        const declineAllBtn = document.getElementById('cookieDeclineAll');
        if (declineAllBtn) {
            declineAllBtn.addEventListener('click', declineAll);
        }
        
        // Botão salvar preferências
        const savePrefsBtn = document.getElementById('cookieSavePreferences');
        if (savePrefsBtn) {
            savePrefsBtn.addEventListener('click', saveCustomPreferences);
        }
        
        // Link personalizar
        const customizeLink = document.getElementById('cookieCustomize');
        if (customizeLink) {
            customizeLink.addEventListener('click', (e) => {
                e.preventDefault();
                togglePreferences();
            });
        }
        
        // Link saiba mais
        const learnMoreLink = document.getElementById('cookieLearnMore');
        if (learnMoreLink) {
            learnMoreLink.addEventListener('click', (e) => {
                e.preventDefault();
                togglePreferences();
            });
        }
        
        // Toggles de cookies
        document.querySelectorAll('.cookie-toggle:not(.disabled)').forEach(toggle => {
            toggle.addEventListener('click', () => toggleCookieType(toggle));
        });
        
        // Botão de configurações
        const settingsBtn = document.getElementById('cookieSettingsButton');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                const banner = document.getElementById('cookieConsentBanner');
                const overlay = document.getElementById('cookieConsentOverlay');
                if (banner && overlay) {
                    banner.style.display = 'block';
                    overlay.style.display = 'block';
                    showBanner();
                }
            });
        }
        
        // Fechar ao clicar no overlay
        const overlay = document.getElementById('cookieConsentOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                const preferences = getPreferences();
                if (preferences.hasResponded) {
                    hideBanner();
                }
            });
        }
    }
    
    /**
     * Inicializa o gerenciador de consentimento
     */
    function init() {
        // Verificar se já existe consentimento
        const preferences = getPreferences();
        
        // Aplicar preferências existentes
        applyPreferences(preferences);
        
        // Criar elementos
        const overlay = createOverlay();
        const banner = createConsentBanner();
        const settingsButton = createSettingsButton();
        
        document.body.appendChild(overlay);
        document.body.appendChild(banner);
        document.body.appendChild(settingsButton);
        
        // Configurar event listeners
        setupEventListeners();
        
        // Mostrar banner se necessário
        if (!preferences.hasResponded) {
            showBanner();
            console.log('🍪 Solicitando consentimento de cookies...');
        } else {
            showSettingsButton();
            console.log('🍪 Consentimento de cookies já registrado');
        }
    }
    
    // API Pública
    window.CookieConsent = {
        // Obter preferências atuais
        getPreferences: getPreferences,
        
        // Verificar se um tipo específico está habilitado
        isEnabled: function(type) {
            const prefs = getPreferences();
            return prefs[type] === true;
        },
        
        // Resetar consentimento (para testes)
        reset: function() {
            localStorage.removeItem(STORAGE_KEY);
            console.log('🍪 Consentimento resetado');
            location.reload();
        },
        
        // Abrir configurações
        openSettings: function() {
            const banner = document.getElementById('cookieConsentBanner');
            const overlay = document.getElementById('cookieConsentOverlay');
            if (banner && overlay) {
                banner.style.display = 'block';
                overlay.style.display = 'block';
                showBanner();
            }
        }
    };
    
    // Auto-inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

