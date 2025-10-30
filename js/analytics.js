/**
 * Google Analytics Integration
 * Gerencia tracking e eventos do GA4
 */

(function() {
    'use strict';
    
    // Configuração do Google Analytics
    const GA_CONFIG = {
        // Substitua pelo seu ID do Google Analytics
        measurementId: 'G-XXXXXXXXXX', // Formato: G-XXXXXXXXXX
        enabled: true, // Set false para desabilitar em desenvolvimento
        
        // Configurações adicionais
        config: {
            send_page_view: true,
            anonymize_ip: true, // LGPD compliance
            cookie_flags: 'SameSite=None;Secure'
        }
    };
    
    /**
     * Verifica se o GA está habilitado
     */
    function isEnabled() {
        // Desabilitar em localhost se configurado
        const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
        
        // Verificar se o usuário optou por não rastrear (Do Not Track)
        const doNotTrack = navigator.doNotTrack === '1' || 
                          window.doNotTrack === '1';
        
        return GA_CONFIG.enabled && 
               GA_CONFIG.measurementId !== 'G-XXXXXXXXXX' && 
               !doNotTrack;
    }
    
    /**
     * Inicializa o Google Analytics
     */
    function initializeAnalytics() {
        if (!isEnabled()) {
            console.log('📊 Google Analytics desabilitado');
            return;
        }
        
        console.log('📊 Inicializando Google Analytics...');
        
        // Carregar script do Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_CONFIG.measurementId}`;
        document.head.appendChild(script);
        
        // Inicializar gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', GA_CONFIG.measurementId, GA_CONFIG.config);
        
        console.log('✅ Google Analytics inicializado');
    }
    
    /**
     * Rastreia um evento personalizado
     * @param {string} eventName - Nome do evento
     * @param {Object} params - Parâmetros do evento
     */
    function trackEvent(eventName, params = {}) {
        if (!isEnabled() || typeof gtag === 'undefined') {
            console.log('📊 Evento não rastreado (GA desabilitado):', eventName, params);
            return;
        }
        
        gtag('event', eventName, params);
        console.log('📊 Evento rastreado:', eventName, params);
    }
    
    /**
     * Rastreia visualização de página
     * @param {string} pagePath - Caminho da página
     * @param {string} pageTitle - Título da página
     */
    function trackPageView(pagePath, pageTitle) {
        if (!isEnabled() || typeof gtag === 'undefined') {
            return;
        }
        
        gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: pageTitle
        });
        
        console.log('📊 Página rastreada:', pagePath);
    }
    
    /**
     * Rastreia cliques em botões CTA
     */
    function setupCTATracking() {
        // Rastrear botões CTA
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonText = this.textContent.trim();
                const buttonHref = this.getAttribute('href');
                
                trackEvent('cta_click', {
                    button_text: buttonText,
                    button_url: buttonHref,
                    page_location: window.location.pathname
                });
            });
        });
        
        // Rastrear botões de pricing
        document.querySelectorAll('.pricing-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const planName = this.closest('.pricing-card')?.querySelector('h3')?.textContent || 'Unknown';
                
                trackEvent('pricing_click', {
                    plan_name: planName,
                    button_text: this.textContent.trim()
                });
            });
        });
    }
    
    /**
     * Rastreia formulários
     */
    function setupFormTracking() {
        // Rastrear submissão de formulários
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const formId = this.id || 'unknown_form';
                
                trackEvent('form_submit', {
                    form_id: formId,
                    page_location: window.location.pathname
                });
            });
        });
    }
    
    /**
     * Rastreia autenticação social
     */
    function setupSocialAuthTracking() {
        document.querySelectorAll('.social-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const provider = this.classList.contains('discord') ? 'discord' : 'unknown';
                
                trackEvent('social_auth_click', {
                    provider: provider,
                    page_location: window.location.pathname
                });
            });
        });
    }
    
    /**
     * Rastreia scroll depth
     */
    function setupScrollTracking() {
        const scrollThresholds = [25, 50, 75, 90];
        const scrolled = new Set();
        
        function checkScrollDepth() {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !scrolled.has(threshold)) {
                    scrolled.add(threshold);
                    trackEvent('scroll_depth', {
                        percent: threshold,
                        page_location: window.location.pathname
                    });
                }
            });
        }
        
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkScrollDepth, 100);
        });
    }
    
    /**
     * Rastreia tempo na página
     */
    function setupTimeTracking() {
        const startTime = Date.now();
        
        // Rastrear quando o usuário sai
        window.addEventListener('beforeunload', function() {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            
            trackEvent('time_on_page', {
                seconds: timeSpent,
                page_location: window.location.pathname
            });
        });
        
        // Rastrear milestones de tempo
        const timeThresholds = [30, 60, 120, 300]; // segundos
        timeThresholds.forEach(threshold => {
            setTimeout(() => {
                trackEvent('engagement_milestone', {
                    seconds: threshold,
                    page_location: window.location.pathname
                });
            }, threshold * 1000);
        });
    }
    
    /**
     * Rastreia cliques externos
     */
    function setupExternalLinkTracking() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Verificar se é link externo
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                trackEvent('external_link_click', {
                    link_url: href,
                    link_text: link.textContent.trim(),
                    page_location: window.location.pathname
                });
            }
        });
    }
    
    /**
     * Inicializa todos os trackings
     */
    function initializeTracking() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupAllTracking);
        } else {
            setupAllTracking();
        }
    }
    
    function setupAllTracking() {
        setupCTATracking();
        setupFormTracking();
        setupSocialAuthTracking();
        setupScrollTracking();
        setupTimeTracking();
        setupExternalLinkTracking();
        
        console.log('✅ Tracking de eventos configurado');
    }
    
    // API Pública
    window.Analytics = {
        // Rastrear evento customizado
        trackEvent: trackEvent,
        
        // Rastrear página
        trackPageView: trackPageView,
        
        // Rastrear conversão de signup
        trackSignup: function(planType) {
            trackEvent('signup_complete', {
                plan: planType,
                method: 'form'
            });
        },
        
        // Rastrear login
        trackLogin: function(method) {
            trackEvent('login', {
                method: method || 'unknown'
            });
        },
        
        // Rastrear erro
        trackError: function(errorType, errorMessage) {
            trackEvent('error', {
                error_type: errorType,
                error_message: errorMessage,
                page_location: window.location.pathname
            });
        },
        
        // Verificar se está habilitado
        isEnabled: isEnabled
    };
    
    // Auto-inicializar
    initializeAnalytics();
    initializeTracking();
    
})();

