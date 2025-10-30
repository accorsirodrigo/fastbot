# DiscordAuth - Website

Website institucional para o DiscordAuth, uma plataforma de autenticação Discord simplificada.

## 📁 Estrutura do Projeto

```
fastbot/
├── css/
│   ├── styles.css          # Estilos globais do site
│   └── signup.css          # Estilos específicos da página de cadastro
├── js/
│   ├── script.js           # Scripts globais (animações, scroll)
│   ├── components.js       # Componentes reutilizáveis (footer, meta tags)
│   └── signup.js           # Lógica da página de cadastro
├── pages/
│   ├── pricing.html        # Página de preços
│   └── signup.html         # Página de cadastro
├── includes/
│   └── meta-common.html    # Meta tags comuns (referência)
├── index.html              # Página inicial
├── robots.txt              # Configuração para crawlers
├── sitemap.xml             # Mapa do site para SEO
└── _config.yml             # Configuração Jekyll (GitHub Pages)
```

## 🎨 Arquitetura

### Separação de Responsabilidades

O projeto segue uma arquitetura modular com clara separação entre:

- **HTML**: Estrutura e conteúdo
- **CSS**: Apresentação e estilos
- **JavaScript**: Comportamento e lógica

### Componentes Reutilizáveis

#### Footer (`components.js`)
O footer é carregado dinamicamente em todas as páginas através do arquivo `components.js`:

```javascript
// Carrega automaticamente o footer
<div id="footer-placeholder"></div>
```

O sistema detecta automaticamente se está em um subdiretório e ajusta os caminhos relativos.

#### Meta Tags
Meta tags comuns estão documentadas em `includes/meta-common.html` como referência, mas cada página define suas próprias meta tags específicas para melhor SEO.

### CSS Modular

- **styles.css**: Estilos globais, variáveis CSS, componentes compartilhados
- **signup.css**: Estilos específicos da página de cadastro

### JavaScript Modular

- **script.js**: Funcionalidades globais (smooth scroll, animações, observers)
- **components.js**: Gerenciamento de componentes reutilizáveis
- **signup.js**: Lógica específica da página de cadastro (validação de formulário, planos)

## 🚀 Páginas

### Página Inicial (`index.html`)
- Hero section com animação
- Recursos principais
- Como funciona
- Benefícios
- Call-to-action

### Página de Preços (`pages/pricing.html`)
- Comparação de planos (Gratuito vs Pro)
- Tabela de recursos
- FAQ
- Botões de CTA linkados para signup

### Página de Cadastro (`pages/signup.html`)
- Formulário de registro
- Login social (Discord)
- Seleção dinâmica de plano via URL parameter
- Validação de formulário
- URLs suportadas:
  - `signup.html?plan=free` - Plano gratuito
  - `signup.html?plan=pro` - Plano Pro com teste de 14 dias

## 🎯 Funcionalidades

### Sistema de Planos
A página de cadastro detecta automaticamente o plano selecionado através de parâmetros URL:

```javascript
// Exemplo de uso
window.location.href = 'signup.html?plan=pro';
```

### Validação de Formulário
- Verificação de senhas correspondentes
- Validação de termos aceitos
- Campos obrigatórios
- Feedback visual e mensagens de erro

### Animações e UX
- Smooth scroll entre seções
- Intersection Observer para animações ao scroll
- Efeitos hover em elementos interativos
- Background animado com gradientes

## 🎨 Design System

### Variáveis CSS
```css
--discord-purple: #5865F2
--discord-dark: #2C2F33
--discord-darker: #23272A
--discord-light: #7289DA
--discord-green: #57F287
```

### Tipografia
- Font: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- Tamanhos responsivos usando clamp()

### Responsividade
- Mobile-first approach
- Breakpoint principal: 768px
- Grid layouts flexíveis

## 🔧 Como Usar

### Desenvolvimento Local
Simplesmente abra os arquivos HTML em um navegador ou use um servidor local:

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx serve

# Usando PHP
php -S localhost:8000
```

### Adicionar Nova Página

1. Crie o arquivo HTML na pasta apropriada
2. Inclua os estilos necessários:
```html
<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/sua-pagina.css">
```

3. Adicione o placeholder do footer:
```html
<div id="footer-placeholder"></div>
```

4. Inclua os scripts:
```html
<script src="../js/script.js"></script>
<script src="../js/components.js"></script>
<script src="../js/sua-pagina.js"></script>
```

### Criar Novo Componente CSS

1. Crie um arquivo CSS específico em `/css/`
2. Referencie no HTML:
```html
<link rel="stylesheet" href="../css/novo-componente.css">
```

### Criar Novo Script

1. Crie um arquivo JS específico em `/js/`
2. Referencie no HTML após os scripts comuns:
```html
<script src="../js/novo-script.js"></script>
```

## 📱 SEO e Meta Tags

Cada página possui:
- Meta tags específicas (title, description, keywords)
- Open Graph tags para redes sociais
- Twitter Card tags
- Canonical URLs
- Structured Data (JSON-LD)

## 🌐 Deployment

O site está configurado para GitHub Pages:
- Branch: master
- URL: https://accorsirodrigo.github.io/fastbot/

## 📄 Licença

© 2024 DiscordAuth. Todos os direitos reservados.

