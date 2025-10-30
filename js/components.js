/**
 * Reusable Components
 * Loads common HTML components like footer, header, etc.
 */

// Footer HTML template
const footerTemplate = `
<footer class="footer">
    <div class="container">
        <div class="footer-links">
            <a href="{{rootPath}}index.html">Início</a>
            <a href="#">Sobre</a>
            <a href="#">Documentação</a>
            <a href="{{rootPath}}pages/pricing.html">Preços</a>
            <a href="#">Blog</a>
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Serviço</a>
            <a href="#">Contato</a>
        </div>
        <p>&copy; 2024 DiscordAuth. Todos os direitos reservados.</p>
    </div>
</footer>
`;

/**
 * Load footer component
 * @param {string} rootPath - Path to root directory (e.g., '../' for pages folder, '' for root)
 */
function loadFooter(rootPath = '') {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        const html = footerTemplate.replace(/{{rootPath}}/g, rootPath);
        footerPlaceholder.outerHTML = html;
    }
}

/**
 * Generate common meta tags
 * @param {Object} options - Meta tag options
 * @returns {string} HTML meta tags
 */
function generateMetaTags(options = {}) {
    const {
        title = 'DiscordAuth - Autenticação Discord Simplificada',
        description = 'Autenticação Discord simplificada para sua aplicação',
        url = 'https://accorsirodrigo.github.io/fastbot/',
        image = 'https://accorsirodrigo.github.io/fastbot/images/og-image.jpg',
        keywords = 'autenticação discord, login discord, oauth2 discord'
    } = options;

    return `
    <!-- Primary Meta Tags -->
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="DiscordAuth">
    <meta name="robots" content="index, follow">
    <meta name="language" content="Portuguese">
    <meta name="revisit-after" content="7 days">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:site_name" content="DiscordAuth">
    <meta property="og:locale" content="pt_BR">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${url}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${image}">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="theme-color" content="#5865F2">
    <meta name="msapplication-TileColor" content="#5865F2">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${url}">
    `;
}

/**
 * Generate favicon links
 * @param {string} rootPath - Path to root directory
 * @returns {string} HTML favicon links
 */
function generateFaviconLinks(rootPath = '') {
    return `
    <link rel="icon" type="image/x-icon" href="${rootPath}favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="${rootPath}apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${rootPath}favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="${rootPath}favicon-16x16.png">
    `;
}

// Auto-initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Detect if we're in a subdirectory
    const isInPages = window.location.pathname.includes('/pages/');
    const rootPath = isInPages ? '../' : '';
    
    // Load footer
    loadFooter(rootPath);
});

