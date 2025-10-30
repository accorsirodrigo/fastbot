# 📂 Estrutura do Projeto - Guia Visual

## 🌳 Árvore de Arquivos

```
fastbot/
│
├── 📄 index.html                    # Página inicial do site
├── 📄 README.md                     # Documentação principal
├── 📄 ARCHITECTURE.md               # Documentação de arquitetura
├── 📄 PROJECT_STRUCTURE.md          # Este arquivo
├── 📄 _config.yml                   # Configuração GitHub Pages
├── 📄 robots.txt                    # Configuração para crawlers
├── 📄 sitemap.xml                   # Mapa do site para SEO
│
├── 📁 css/                          # Estilos
│   ├── styles.css                  # ⭐ Estilos globais e variáveis
│   └── signup.css                  # Estilos da página de cadastro
│
├── 📁 js/                           # Scripts
│   ├── script.js                   # ⭐ Funcionalidades globais
│   ├── components.js               # ⭐ Componentes reutilizáveis (footer)
│   ├── config.js                   # ⭐ Configurações centralizadas
│   └── signup.js                   # Lógica da página de cadastro
│
├── 📁 pages/                        # Páginas secundárias
│   ├── pricing.html                # Página de preços
│   └── signup.html                 # Página de cadastro
│
└── 📁 includes/                     # Componentes HTML (referência)
    └── meta-common.html            # Template de meta tags comuns

⭐ = Arquivos compartilhados entre páginas
```

## 🔗 Relacionamentos entre Arquivos

### Página Index (Raiz)

```
index.html
    │
    ├──> css/styles.css          (estilos globais)
    ├──> js/script.js            (animações, scroll)
    ├──> js/components.js        (injeta footer)
    └──> pages/pricing.html      (link CTA)
```

### Página de Preços

```
pages/pricing.html
    │
    ├──> ../css/styles.css       (estilos globais)
    ├──> ../js/script.js         (animações, scroll)
    ├──> ../js/components.js     (injeta footer)
    └──> signup.html?plan=X      (links dos botões)
```

### Página de Cadastro

```
pages/signup.html
    │
    ├──> ../css/styles.css       (estilos globais)
    ├──> ../css/signup.css       (estilos específicos)
    ├──> ../js/script.js         (animações, scroll)
    ├──> ../js/components.js     (injeta footer)
    └──> ../js/signup.js         (validação, planos)
```

## 📦 Componentes Reutilizáveis

### Footer (Dinâmico)

```javascript
// Definido em: js/components.js
// Usado em: todas as páginas

HTML Placeholder:
<div id="footer-placeholder"></div>

↓ JavaScript injeta automaticamente ↓

<footer class="footer">
    <div class="container">
        <div class="footer-links">...</div>
        <p>&copy; 2024 DiscordAuth...</p>
    </div>
</footer>
```

### Meta Tags Base

```html
<!-- Referência em: includes/meta-common.html -->
<!-- Cada página define suas próprias meta tags -->
<!-- mas usa este arquivo como template -->

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="DiscordAuth">
...
```

## 🎨 Sistema de Estilos

### Hierarquia CSS

```
1. styles.css (Base)
   ├── Variáveis CSS (:root)
   ├── Reset & Global
   ├── Layout Components
   │   ├── .container
   │   ├── .hero
   │   ├── .features
   │   └── .footer
   ├── UI Components
   │   ├── .cta-button
   │   ├── .feature-card
   │   └── .pricing-card
   └── Utilities & Animations

2. signup.css (Específico)
   ├── .signup-section
   ├── .signup-container
   ├── .form-group
   └── .social-button
```

### Variáveis CSS Globais

```css
/* Definidas em: css/styles.css */

:root {
    /* Cores */
    --discord-purple: #5865F2
    --discord-dark: #2C2F33
    --discord-darker: #23272A
    --discord-light: #7289DA
    --discord-green: #57F287
    --white: #FFFFFF
    --gray-light: #B9BBBE
    --gray-dark: #4F545C
}

/* Usadas em todos os arquivos CSS e páginas */
```

## 💻 Sistema de Scripts

### Hierarquia JavaScript

```
1. script.js (Global)
   ├── Smooth Scroll
   ├── Intersection Observer
   ├── Animations
   └── Event Handlers

2. components.js (Componentes)
   ├── loadFooter()
   ├── generateMetaTags()
   └── generateFaviconLinks()

3. config.js (Configuração)
   ├── SITE_CONFIG.siteName
   ├── SITE_CONFIG.navigation
   ├── SITE_CONFIG.plans
   └── SITE_CONFIG.features

4. signup.js (Específico)
   ├── initSignupPage()
   ├── updatePlanUI()
   └── setupFormValidation()
```

## 🔄 Fluxo de Carregamento de Página

### Sequência de Carregamento (Exemplo: signup.html)

```
1. Browser carrega HTML
   └── Parseia estrutura DOM

2. Carrega CSS (em paralelo)
   ├── styles.css     ⏱️ ~50ms
   └── signup.css     ⏱️ ~20ms

3. Renderiza conteúdo inicial
   └── First Paint

4. Executa Scripts (em sequência)
   ├── script.js          ⏱️ ~100ms
   │   └── Configura animations
   │
   ├── components.js      ⏱️ ~50ms
   │   └── Injeta footer
   │
   └── signup.js          ⏱️ ~30ms
       └── Configura formulário

5. Page Interactive
   └── Pronto para uso
```

## 📱 Adaptação de Caminhos

### Detecção Automática de Diretório

```javascript
// Em: js/components.js

const isInPages = window.location.pathname.includes('/pages/');
const rootPath = isInPages ? '../' : '';

// Resultado:
// index.html       → rootPath = ''
// pages/signup.html → rootPath = '../'
```

### Uso nos Templates

```javascript
// Template de Footer
const footerTemplate = `
<footer>
    <a href="{{rootPath}}index.html">Início</a>
    <a href="{{rootPath}}pages/pricing.html">Preços</a>
</footer>
`;

// Substituição dinâmica
html = footerTemplate.replace(/{{rootPath}}/g, rootPath);

// Resultado para pages/signup.html:
<a href="../index.html">Início</a>
<a href="../pages/pricing.html">Preços</a>
```

## 🎯 Padrões de URL

### Convenções

```
Páginas:
├── /                                # Home
├── /pages/pricing.html              # Preços
├── /pages/signup.html               # Cadastro (plano padrão)
├── /pages/signup.html?plan=free     # Cadastro plano grátis
└── /pages/signup.html?plan=pro      # Cadastro plano pro

Assets:
├── /css/styles.css                  # Da raiz
├── /js/script.js                    # Da raiz
└── /images/logo.png                 # Da raiz

De subdiretórios:
├── ../css/styles.css                # De pages/
├── ../js/script.js                  # De pages/
└── ../images/logo.png               # De pages/
```

## 🧩 Dependências entre Arquivos

### Mapa de Dependências

```
index.html
    ⬇️
    styles.css (required)
    ⬇️
    script.js (required)
    ⬇️
    components.js (required for footer)

pricing.html
    ⬇️
    styles.css (required)
    ⬇️
    script.js (required)
    ⬇️
    components.js (required for footer)

signup.html
    ⬇️
    styles.css (required)
    signup.css (required)
    ⬇️
    script.js (required)
    ⬇️
    components.js (required for footer)
    signup.js (required for validation)
```

## 📝 Convenções de Nomenclatura

### Arquivos

```
HTML:  kebab-case.html         (signup.html)
CSS:   kebab-case.css          (signup.css)
JS:    camelCase.js            (components.js)
MD:    UPPERCASE.md            (README.md)
```

### CSS Classes

```
BEM-like:
.component-name                (block)
.component-name__element       (element)
.component-name--modifier      (modifier)

Exemplos:
.signup-section
.signup-section__header
.signup-form
.form-group
.cta-button
.cta-button--primary
```

### JavaScript

```
Funções:   camelCase()         (loadFooter)
Constantes: UPPER_SNAKE_CASE   (SITE_CONFIG)
Classes:   PascalCase          (SignupManager)
```

## 🔍 Como Encontrar o que Você Precisa

### Quero adicionar/editar...

| O que?                    | Arquivo                  |
|--------------------------|--------------------------|
| Cores do site            | `css/styles.css` (:root) |
| Novo estilo global       | `css/styles.css`         |
| Estilo de uma página     | `css/nome-pagina.css`    |
| Links do footer          | `js/components.js`       |
| Animações globais        | `js/script.js`           |
| Nova funcionalidade      | `js/nova-feature.js`     |
| Configuração de planos   | `js/config.js`           |
| Nova página              | `pages/nova-pagina.html` |
| SEO de uma página        | `<meta>` tags no `<head>` |

### Problemas Comuns

| Problema                     | Solução                              |
|------------------------------|--------------------------------------|
| Footer não aparece           | Verificar `#footer-placeholder`      |
| CSS não carrega              | Verificar caminhos relativos         |
| Animações não funcionam      | Verificar ordem dos scripts          |
| Formulário não valida        | Verificar signup.js está carregado   |
| Links quebrados              | Verificar rootPath em components.js  |

## 🚀 Próximos Passos Recomendados

1. **Adicionar Header Component**
   - Criar template em `components.js`
   - Adicionar navegação global

2. **Sistema de Temas**
   - Dark/Light mode
   - Persistência com localStorage

3. **Internacionalização**
   - Adicionar `js/i18n.js`
   - Suporte para múltiplos idiomas

4. **Build System**
   - Webpack/Vite
   - Minificação automática

5. **Testing**
   - Jest para JS
   - Cypress para E2E

---

**💡 Dica**: Sempre que adicionar um novo arquivo, atualize este documento!

