/**
 * Site Configuration
 * Centralized configuration for the entire site
 */

const SITE_CONFIG = {
    // Site Information
    siteName: 'DiscordAuth',
    siteUrl: 'https://accorsirodrigo.github.io/fastbot/',
    author: 'DiscordAuth',
    language: 'pt-BR',
    
    // SEO Defaults
    defaultTitle: 'DiscordAuth - Autenticação Discord Simplificada',
    defaultDescription: 'Autenticação Discord simplificada para sua aplicação. Integração segura com OAuth2, gerenciamento de cargos e analytics em tempo real.',
    defaultKeywords: 'autenticação discord, login discord, oauth2 discord, integração discord, api discord',
    defaultImage: 'https://accorsirodrigo.github.io/fastbot/images/og-image.jpg',
    
    // Theme Colors
    themeColor: '#5865F2',
    
    // Navigation Links
    navigation: {
        main: [
            { text: 'Início', url: 'index.html' },
            { text: 'Sobre', url: '#' },
            { text: 'Documentação', url: '#' },
            { text: 'Preços', url: 'pages/pricing.html' },
            { text: 'Blog', url: '#' }
        ],
        footer: [
            { text: 'Início', url: 'index.html' },
            { text: 'Sobre', url: '#' },
            { text: 'Documentação', url: '#' },
            { text: 'Preços', url: 'pages/pricing.html' },
            { text: 'Blog', url: '#' },
            { text: 'Política de Privacidade', url: '#' },
            { text: 'Termos de Serviço', url: '#' },
            { text: 'Contato', url: '#' }
        ]
    },
    
    // Plans Configuration
    plans: {
        free: {
            name: 'Plano Grátis',
            price: 0,
            period: 'mês',
            description: 'Perfeito para pequenos projetos e testes',
            badge: 'Plano Grátis',
            badgeClass: '',
            features: [
                'Até 100 usuários',
                'Integração básica do Discord',
                'Suporte padrão',
                'Analytics básico',
                'Documentação da comunidade'
            ],
            cta: 'Começar Grátis',
            ctaUrl: 'pages/signup.html?plan=free'
        },
        pro: {
            name: 'Plano Pro',
            price: 29,
            period: 'mês',
            description: 'Para aplicações em crescimento e equipes',
            badge: 'Plano Pro - 14 Dias Grátis',
            badgeClass: 'pro',
            features: [
                'Usuários ilimitados',
                'Integração avançada do Discord',
                'Suporte prioritário',
                'Analytics avançado',
                'Gerenciamento personalizado de cargos',
                'Marca personalizada',
                '14 dias grátis, depois R$ 29/mês'
            ],
            cta: 'Iniciar Teste Pro',
            ctaUrl: 'pages/signup.html?plan=pro'
        }
    },
    
    // Discord OAuth Configuration
    discord: {
        clientId: '1433258581180026924', // Client ID é público, pode estar no código
        redirectUri: 'http://localhost:3001/auth/discord/callback'
    },
    
    // Social Media
    social: {
        discord: '#',
        twitter: '#',
        github: '#',
        linkedin: '#'
    },
    
    // API Endpoints (quando implementado)
    api: {
        baseUrl: '/api',
        endpoints: {
            signup: '/signup',
            login: '/login',
            resetPassword: '/reset-password'
        }
    },
    
    // Google Analytics
    analytics: {
        measurementId: 'G-JNGCCDF9NP', // Substitua pelo seu GA4 Measurement ID
        enabled: true,
        trackPageViews: true,
        trackEvents: true,
        anonymizeIp: true // LGPD compliance
    },
    
    // Feature Flags
    features: {
        enableDiscordLogin: true,
        enableNewsletter: true,
        enableAnalytics: true,
        maintenanceMode: false
    }
};

// Make config globally available
window.SITE_CONFIG = SITE_CONFIG;

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}

