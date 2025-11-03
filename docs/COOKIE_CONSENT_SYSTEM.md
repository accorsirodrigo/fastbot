# Sistema de Consentimento de Cookies

## 📋 Visão Geral

Este documento descreve o sistema completo de consentimento de cookies implementado no projeto DiscordAuth. O sistema é totalmente compatível com a LGPD e oferece uma experiência moderna e elegante para os usuários.

## 🎯 Características

### Design e UX
- **Toast moderno e elegante** com animações suaves
- **Design responsivo** que funciona perfeitamente em mobile e desktop
- **Overlay com blur** para destacar o banner de cookies
- **Ícone animado** de cookie com efeito bounce
- **Botão de configurações flutuante** para gerenciar preferências a qualquer momento

### Funcionalidades

#### 1. Categorias de Cookies
- **Necessários** (sempre ativos): Essenciais para o funcionamento do site
- **Analíticos**: Google Analytics e tracking de eventos
- **Marketing**: Cookies para campanhas e remarketing

#### 2. Opções de Consentimento
- **Aceitar Todos**: Habilita todas as categorias de cookies
- **Recusar Todos**: Desabilita todos os cookies opcionais (mantém apenas necessários)
- **Personalizar**: Permite escolher individualmente quais categorias aceitar

#### 3. Controles Avançados
- Toggle switches intuitivos para cada categoria
- Descrições claras de cada tipo de cookie
- Links para política de privacidade
- Configurações podem ser alteradas a qualquer momento

## 📁 Arquivos do Sistema

### CSS
```
/css/cookie-consent.css
```
Contém todos os estilos do sistema de cookies:
- Banner principal
- Overlay de fundo
- Toggles de preferências
- Botão de configurações flutuante
- Animações e transições
- Responsividade mobile

### JavaScript
```
/js/cookie-consent.js
```
Gerencia toda a lógica do sistema:
- Armazenamento de preferências no localStorage
- Controle de versão do consentimento
- API pública para interagir com as preferências
- Eventos customizados para notificar mudanças
- Interface de gerenciamento de preferências

### Integração com Analytics
```
/js/analytics.js (modificado)
```
O Google Analytics foi modificado para:
- Só inicializar após consentimento do usuário
- Respeitar a escolha de cookies analíticos
- Aguardar eventos de mudança de consentimento

## 🚀 Como Usar

### Instalação

Todas as páginas HTML já incluem os arquivos necessários:

```html
<!-- CSS -->
<link rel="stylesheet" href="css/cookie-consent.css">

<!-- JavaScript (antes do analytics.js) -->
<script src="js/cookie-consent.js"></script>
<script src="js/analytics.js"></script>
```

### API JavaScript

#### Verificar se um tipo de cookie está habilitado
```javascript
if (window.CookieConsent.isEnabled('analytics')) {
    console.log('Analytics está habilitado');
}
```

#### Obter todas as preferências
```javascript
const preferences = window.CookieConsent.getPreferences();
console.log(preferences);
// {
//   version: "1.0",
//   necessary: true,
//   analytics: true,
//   marketing: false,
//   timestamp: "2025-11-03T...",
//   hasResponded: true
// }
```

#### Abrir configurações programaticamente
```javascript
window.CookieConsent.openSettings();
```

#### Resetar consentimento (útil para testes)
```javascript
window.CookieConsent.reset();
```

### Eventos Customizados

O sistema emite um evento quando as preferências mudam:

```javascript
window.addEventListener('cookieConsentChanged', function(e) {
    const preferences = e.detail;
    console.log('Preferências atualizadas:', preferences);
    
    // Executar ações baseadas nas preferências
    if (preferences.analytics) {
        // Inicializar analytics
    }
    
    if (preferences.marketing) {
        // Carregar scripts de marketing
    }
});
```

## 🎨 Personalização

### Cores e Tema

O sistema usa as variáveis CSS do projeto:

```css
:root {
    --discord-purple: #5865F2;
    --discord-dark: #2C2F33;
    --discord-darker: #23272A;
    --discord-light: #7289DA;
    --discord-green: #57F287;
}
```

Para personalizar, modifique estas variáveis em `/css/styles.css`.

### Textos e Mensagens

Edite o arquivo `/js/cookie-consent.js` na função `createConsentBanner()`:

```javascript
banner.innerHTML = `
    <div class="cookie-icon">🍪</div>
    <div class="cookie-content">
        <h3>Seu título aqui</h3>
        <p>Sua mensagem aqui</p>
        ...
    </div>
`;
```

### Adicionar Nova Categoria de Cookie

1. Adicione ao `defaultPreferences` em `cookie-consent.js`:
```javascript
const defaultPreferences = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    personalização: false, // Nova categoria
    timestamp: null,
    hasResponded: false
};
```

2. Adicione o toggle no HTML do banner:
```javascript
<div class="cookie-preference-item">
    <div class="cookie-preference-info">
        <h4>🎨 Cookies de Personalização</h4>
        <p>Salvam suas preferências de interface.</p>
    </div>
    <div class="cookie-toggle" data-type="personalização">
        <div class="cookie-toggle-slider"></div>
    </div>
</div>
```

## 🔄 Versionamento

O sistema inclui controle de versão do consentimento. Quando a política de cookies muda:

1. Incremente a constante `CONSENT_VERSION` em `cookie-consent.js`:
```javascript
const CONSENT_VERSION = '2.0'; // Era '1.0'
```

2. O sistema automaticamente solicitará novo consentimento aos usuários

## 💾 Armazenamento

As preferências são salvas em `localStorage` com a chave:
```
cookie_consent_preferences
```

Formato dos dados:
```json
{
  "version": "1.0",
  "necessary": true,
  "analytics": true,
  "marketing": false,
  "timestamp": "2025-11-03T10:30:00.000Z",
  "hasResponded": true
}
```

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Desktop**: Banner centralizado com largura máxima de 600px
- **Tablet** (≤768px): Banner ocupa largura total menos margens
- **Mobile** (≤480px): 
  - Layout vertical
  - Botões empilhados
  - Fonte e espaçamentos reduzidos
  - Botão de configurações menor

## ✅ Conformidade LGPD

O sistema está em conformidade com a LGPD:

- ✅ Consentimento explícito antes de cookies opcionais
- ✅ Categorização clara dos tipos de cookies
- ✅ Opção de recusar todos os cookies opcionais
- ✅ Controle granular por categoria
- ✅ Fácil acesso para alterar preferências
- ✅ Registro de timestamp do consentimento
- ✅ Versionamento da política

## 🧪 Testes

### Testar Fluxo Completo

1. Limpe o localStorage:
```javascript
localStorage.clear();
```

2. Recarregue a página

3. O banner deve aparecer automaticamente

4. Teste cada opção:
   - Aceitar todos
   - Recusar todos
   - Personalizar preferências

### Verificar Integração com Analytics

1. Abra o DevTools Console

2. Recuse cookies:
```
📊 Analytics desabilitado por falta de consentimento
```

3. Aceite cookies analíticos:
```
🍪 Consentimento de cookies alterado
📊 Inicializando Analytics após consentimento
✅ Google Analytics inicializado
```

## 🎯 Boas Práticas

### Quando Solicitar Consentimento

- ✅ Na primeira visita do usuário
- ✅ Quando a versão da política muda
- ✅ Se preferências forem resetadas

### Quando NÃO Solicitar

- ❌ A cada pageview
- ❌ Se usuário já respondeu na versão atual
- ❌ Em páginas de erro críticas

### Respeitar Preferências

```javascript
// ✅ Correto - verificar antes de carregar
if (window.CookieConsent.isEnabled('analytics')) {
    loadAnalytics();
}

// ❌ Errado - carregar sem verificar
loadAnalytics();
```

## 🔧 Troubleshooting

### Banner não aparece

**Possíveis causas:**
1. Arquivo CSS não carregado
2. Arquivo JS não carregado
3. Usuário já respondeu anteriormente

**Solução:**
```javascript
// Verificar no console
console.log(window.CookieConsent);
console.log(localStorage.getItem('cookie_consent_preferences'));

// Resetar para testar
window.CookieConsent.reset();
```

### Analytics não inicializa

**Possíveis causas:**
1. cookie-consent.js carregado após analytics.js
2. Usuário recusou cookies analíticos

**Solução:**
1. Verifique ordem dos scripts no HTML
2. Verifique preferências:
```javascript
console.log(window.CookieConsent.getPreferences());
```

### Preferências não salvam

**Possíveis causas:**
1. localStorage desabilitado no navegador
2. Modo privado/anônimo

**Solução:**
```javascript
// Testar localStorage
try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    console.log('localStorage disponível');
} catch(e) {
    console.error('localStorage não disponível');
}
```

## 📚 Recursos Adicionais

- [LGPD - Lei Geral de Proteção de Dados](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [MDN - Web Storage API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API)
- [Google Analytics GDPR/LGPD Compliance](https://support.google.com/analytics/answer/9019185)

## 🤝 Contribuindo

Para melhorias no sistema de cookies:

1. Teste localmente com `window.CookieConsent.reset()`
2. Verifique responsividade em diferentes dispositivos
3. Garanta compatibilidade com navegadores principais
4. Atualize esta documentação com suas mudanças

## 📝 Changelog

### Versão 1.0 (2025-11-03)
- ✨ Implementação inicial do sistema
- 🎨 Design moderno com animações
- 📱 Suporte completo mobile
- 🔧 API pública para desenvolvedores
- 📊 Integração com Google Analytics
- ✅ Conformidade LGPD

