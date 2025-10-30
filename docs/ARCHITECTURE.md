# Arquitetura do Projeto DiscordAuth

## 📐 Visão Geral

Este documento descreve a arquitetura modular e escalável do website DiscordAuth, implementada para facilitar manutenção, reutilização de código e colaboração.

## 🏗️ Princípios Arquiteturais

### 1. Separação de Responsabilidades
Cada tipo de código tem seu lugar específico:
- **HTML**: Estrutura e conteúdo semântico
- **CSS**: Apresentação visual e estilos
- **JavaScript**: Lógica de negócio e interatividade

### 2. Modularização
Código dividido em módulos pequenos e focados:
- Um arquivo = uma responsabilidade
- Componentes reutilizáveis
- Baixo acoplamento, alta coesão

### 3. DRY (Don't Repeat Yourself)
Elementos comuns extraídos para componentes reutilizáveis:
- Footer compartilhado
- Scripts comuns
- Configurações centralizadas

### 4. Escalabilidade
Estrutura preparada para crescimento:
- Fácil adicionar novas páginas
- Fácil adicionar novos componentes
- Configuração centralizada

## 📦 Estrutura de Diretórios

```
fastbot/
│
├── 📁 css/                    # Estilos
│   ├── styles.css            # Estilos globais e variáveis CSS
│   └── signup.css            # Estilos da página de cadastro
│
├── 📁 js/                     # Scripts
│   ├── script.js             # Funcionalidades globais
│   ├── components.js         # Componentes reutilizáveis
│   ├── signup.js             # Lógica da página de cadastro
│   └── config.js             # Configurações centralizadas
│
├── 📁 pages/                  # Páginas secundárias
│   ├── pricing.html          # Página de preços
│   └── signup.html           # Página de cadastro
│
├── 📁 includes/               # Componentes HTML (referência)
│   └── meta-common.html      # Meta tags comuns
│
├── 📄 index.html              # Página inicial
├── 📄 README.md               # Documentação do projeto
├── 📄 ARCHITECTURE.md         # Este arquivo
└── 📄 _config.yml             # Configuração GitHub Pages
```

## 🔄 Fluxo de Dados

### Página de Cadastro

```
User Action (URL com parâmetro plan)
    ↓
signup.html carrega
    ↓
signup.js lê parâmetro URL
    ↓
Atualiza UI com dados do plano
    ↓
User preenche formulário
    ↓
Validação no cliente
    ↓
Submit (preparado para backend)
```

### Carregamento de Componentes

```
Página HTML carrega
    ↓
components.js executa
    ↓
Detecta localização (root ou pages/)
    ↓
Ajusta caminhos relativos
    ↓
Injeta HTML do footer
```

## 🎨 Sistema de Design

### Variáveis CSS (Design Tokens)

Definidas em `styles.css`:

```css
:root {
    /* Cores principais */
    --discord-purple: #5865F2
    --discord-dark: #2C2F33
    --discord-darker: #23272A
    --discord-light: #7289DA
    --discord-green: #57F287
    
    /* Cores auxiliares */
    --white: #FFFFFF
    --gray-light: #B9BBBE
    --gray-dark: #4F545C
}
```

### Componentes CSS

#### Layout
- `.container`: Container principal (max-width: 1200px)
- `.section`: Seções da página

#### Navegação
- `.footer`: Rodapé padrão
- `.footer-links`: Links do rodapé

#### Botões
- `.cta-button`: Call-to-action principal
- `.pricing-btn`: Botão de preço
- `.submit-button`: Botão de submit

#### Cards
- `.feature-card`: Card de recurso
- `.pricing-card`: Card de preço
- `.benefit`: Card de benefício

## 🔌 Sistema de Componentes

### Footer Component

**Arquivo**: `js/components.js`

**Como funciona**:
1. Define template HTML do footer
2. Detecta localização atual (root ou subdiretório)
3. Ajusta URLs no template
4. Injeta no placeholder

**Uso**:
```html
<!-- No HTML -->
<div id="footer-placeholder"></div>

<!-- No final do body -->
<script src="js/components.js"></script>
```

### Configuração Centralizada

**Arquivo**: `js/config.js`

Centraliza todas as configurações do site:
- Informações do site
- Meta tags padrão
- Links de navegação
- Configuração de planos
- Feature flags

**Uso**:
```javascript
// Acessar configuração
const siteName = SITE_CONFIG.siteName;
const freePlan = SITE_CONFIG.plans.free;
```

## 📱 Páginas

### Estrutura Padrão de uma Página

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Meta tags específicas da página -->
    <title>Título da Página</title>
    <!-- ... outras meta tags ... -->
    
    <!-- Estilos -->
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/pagina-especifica.css">
</head>
<body>
    <!-- Conteúdo da página -->
    
    <!-- Footer -->
    <div id="footer-placeholder"></div>
    
    <!-- Scripts -->
    <script src="../js/script.js"></script>
    <script src="../js/components.js"></script>
    <script src="../js/pagina-especifica.js"></script>
</body>
</html>
```

### Ordem de Carregamento de Scripts

1. **script.js**: Funcionalidades globais (sempre primeiro)
2. **components.js**: Componentes reutilizáveis
3. **pagina-especifica.js**: Lógica específica da página

## 🔒 Validação e Segurança

### Validação de Formulários

**Camadas de validação**:
1. HTML5 (required, minlength, type="email")
2. JavaScript (validação customizada)
3. Backend (quando implementado)

**Exemplo** (`signup.js`):
```javascript
function setupFormValidation(plan) {
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validações
        if (password !== confirmPassword) {
            alert('Senhas não coincidem');
            return;
        }
        
        // Submeter para backend
    });
}
```

## 🚀 Adicionar Novas Funcionalidades

### Nova Página

1. **Criar HTML**:
```bash
touch pages/nova-pagina.html
```

2. **Criar CSS** (se necessário):
```bash
touch css/nova-pagina.css
```

3. **Criar JS** (se necessário):
```bash
touch js/nova-pagina.js
```

4. **Seguir estrutura padrão**:
- Incluir meta tags
- Linkar estilos
- Adicionar placeholder do footer
- Incluir scripts

### Novo Componente

1. **Adicionar ao components.js**:
```javascript
const novoComponenteTemplate = `...`;

function loadNovoComponente(rootPath = '') {
    const placeholder = document.getElementById('novo-componente-placeholder');
    if (placeholder) {
        placeholder.outerHTML = novoComponenteTemplate.replace(/{{rootPath}}/g, rootPath);
    }
}
```

2. **Usar nas páginas**:
```html
<div id="novo-componente-placeholder"></div>
```

### Nova Funcionalidade Global

1. **Adicionar ao script.js** para funcionalidades que devem estar em todas as páginas
2. **Ou criar novo arquivo JS** para funcionalidades específicas

## 📊 Performance

### Otimizações Implementadas

1. **CSS**:
   - Uso de variáveis CSS (design tokens)
   - Animações com GPU (transform, opacity)
   - Media queries mobile-first

2. **JavaScript**:
   - Event delegation onde possível
   - Intersection Observer para animações
   - Scripts no final do body

3. **HTML**:
   - Semântica correta
   - Meta tags para SEO
   - Structured Data (JSON-LD)

### Métricas Alvo

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Lighthouse Score: > 90

## 🔄 Manutenção

### Atualizar Links Globais

Editar `js/config.js`:
```javascript
navigation: {
    footer: [
        { text: 'Novo Link', url: 'pages/novo.html' }
    ]
}
```

### Atualizar Estilos Globais

Editar `css/styles.css`:
```css
:root {
    --nova-cor: #000000;
}
```

### Atualizar Planos

Editar `js/config.js`:
```javascript
plans: {
    enterprise: {
        name: 'Enterprise',
        price: 99,
        // ...
    }
}
```

## 🧪 Testes

### Checklist de Testes

- [ ] Todas as páginas carregam corretamente
- [ ] Footer aparece em todas as páginas
- [ ] Links funcionam (relativos e absolutos)
- [ ] Formulários validam corretamente
- [ ] Design responsivo (mobile, tablet, desktop)
- [ ] Sem erros no console
- [ ] Meta tags presentes
- [ ] Performance aceitável

### Ferramentas Recomendadas

- Lighthouse (Chrome DevTools)
- Wave (Acessibilidade)
- W3C Validator (HTML/CSS)
- PageSpeed Insights

## 🔮 Próximos Passos

### Melhorias Futuras

1. **Sistema de Rotas**:
   - Implementar routing client-side
   - SPA com framework (React, Vue)

2. **Build System**:
   - Webpack/Vite para bundling
   - Minificação automática
   - Otimização de imagens

3. **Backend Integration**:
   - API endpoints reais
   - Autenticação
   - Database

4. **CMS**:
   - Admin panel
   - Gerenciamento de conteúdo

5. **Analytics**:
   - Google Analytics
   - Tracking de conversão

## 📚 Referências

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)
- [Discord Brand Guidelines](https://discord.com/branding)

---

**Última atualização**: Outubro 2024
**Versão**: 1.0.0

