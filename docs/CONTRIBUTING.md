# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o DiscordAuth! Este guia te ajudará a começar rapidamente.

## 🚀 Início Rápido

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Conhecimento básico de HTML, CSS e JavaScript

### Setup Local

1. Clone o repositório:
```bash
git clone https://github.com/accorsirodrigo/fastbot.git
cd fastbot
```

2. Abra o projeto no seu editor favorito:
```bash
code .  # VS Code
```

3. Inicie um servidor local:
```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js
npx serve

# Opção 3: PHP
php -S localhost:8000

# Opção 4: VS Code Live Server extension
```

4. Abra no navegador:
```
http://localhost:8000
```

## 📋 Checklist Antes de Começar

- [ ] Li o `README.md`
- [ ] Li o `ARCHITECTURE.md`
- [ ] Li o `PROJECT_STRUCTURE.md`
- [ ] Configurei o ambiente local
- [ ] Testei que o site funciona localmente

## 🎯 Como Contribuir

### 1️⃣ Reportar Bugs

Encontrou um bug? Abra uma issue com:

- **Descrição clara** do problema
- **Passos para reproduzir**
- **Comportamento esperado** vs **atual**
- **Screenshots** (se aplicável)
- **Ambiente** (navegador, OS)

### 2️⃣ Sugerir Melhorias

Tem uma ideia? Abra uma issue com:

- **Descrição** da funcionalidade
- **Caso de uso**
- **Benefícios** para os usuários
- **Mockups/wireframes** (opcional)

### 3️⃣ Contribuir com Código

#### Workflow Git

1. **Fork** o repositório

2. **Clone** seu fork:
```bash
git clone https://github.com/SEU-USUARIO/fastbot.git
```

3. **Crie uma branch** para sua feature:
```bash
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

4. **Faça suas alterações** seguindo os padrões do projeto

5. **Commit** com mensagens claras:
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

6. **Push** para seu fork:
```bash
git push origin feature/nome-da-feature
```

7. **Abra um Pull Request** no repositório original

## 📝 Padrões de Código

### HTML

```html
<!-- ✅ BOM -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Título da Página</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <section class="hero">
        <div class="container">
            <h1>Título</h1>
        </div>
    </section>
    
    <div id="footer-placeholder"></div>
    
    <script src="js/script.js"></script>
</body>
</html>

<!-- ❌ EVITAR -->
<div class="section">  <!-- Use tags semânticas -->
<DIV>                  <!-- Use lowercase -->
<div id=content>       <!-- Use aspas -->
```

### CSS

```css
/* ✅ BOM */
.component-name {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: var(--discord-purple);
    transition: all 0.3s ease;
}

.component-name:hover {
    transform: translateY(-5px);
}

@media (max-width: 768px) {
    .component-name {
        flex-direction: row;
    }
}

/* ❌ EVITAR */
.component-name{display:flex;gap:20px;background:#5865F2}  /* Sem formatação */
.ComponentName { }                                          /* Use kebab-case */
```

### JavaScript

```javascript
// ✅ BOM
/**
 * Description of function
 * @param {string} param - Parameter description
 * @returns {boolean} Return value description
 */
function myFunction(param) {
    if (param) {
        return true;
    }
    return false;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ❌ EVITAR
function myFunction(param){if(param){return true}return false}  // Sem formatação
var x = 'value';                                                // Use const/let
eval('some code');                                              // Nunca use eval
```

### Nomenclatura

| Tipo              | Convenção      | Exemplo                |
|-------------------|----------------|------------------------|
| Arquivos HTML     | kebab-case     | `signup-form.html`     |
| Arquivos CSS      | kebab-case     | `signup-form.css`      |
| Arquivos JS       | camelCase      | `signupForm.js`        |
| Classes CSS       | kebab-case     | `.signup-form`         |
| IDs HTML          | camelCase      | `#signupForm`          |
| Funções JS        | camelCase      | `validateForm()`       |
| Constantes JS     | UPPER_SNAKE    | `MAX_ATTEMPTS`         |
| Variáveis CSS     | kebab-case     | `--primary-color`      |

## 🎨 Guia de Estilo

### Cores

Use sempre as variáveis CSS definidas:

```css
/* ✅ BOM */
background-color: var(--discord-purple);
color: var(--white);

/* ❌ EVITAR */
background-color: #5865F2;
color: white;
```

### Espaçamento

Use múltiplos de 4px ou 5px:

```css
/* ✅ BOM */
padding: 20px;
margin: 40px;
gap: 16px;

/* ❌ EVITAR */
padding: 17px;
margin: 33px;
```

### Animações

Use `transform` e `opacity` para performance:

```css
/* ✅ BOM */
.element {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.element:hover {
    transform: translateY(-5px);
}

/* ❌ EVITAR */
.element {
    transition: top 0.3s ease;  /* Causa reflow */
}

.element:hover {
    top: -5px;
}
```

## 📦 Adicionando Novas Funcionalidades

### Nova Página

1. **Crie o arquivo HTML** em `pages/`:
```bash
touch pages/nova-pagina.html
```

2. **Use o template padrão**:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Meta tags -->
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/nova-pagina.css">
</head>
<body>
    <!-- Conteúdo -->
    
    <div id="footer-placeholder"></div>
    
    <script src="../js/script.js"></script>
    <script src="../js/components.js"></script>
    <script src="../js/nova-pagina.js"></script>
</body>
</html>
```

3. **Crie os arquivos de suporte**:
```bash
touch css/nova-pagina.css
touch js/nova-pagina.js
```

4. **Atualize a navegação** em `js/components.js`

### Novo Componente

1. **Adicione ao** `js/components.js`:
```javascript
const novoComponenteTemplate = `
    <div class="novo-componente">
        <!-- HTML do componente -->
    </div>
`;

function loadNovoComponente(rootPath = '') {
    const placeholder = document.getElementById('novo-componente-placeholder');
    if (placeholder) {
        const html = novoComponenteTemplate.replace(/{{rootPath}}/g, rootPath);
        placeholder.outerHTML = html;
    }
}
```

2. **Adicione estilos** em `css/styles.css`:
```css
.novo-componente {
    /* Estilos do componente */
}
```

3. **Use nas páginas**:
```html
<div id="novo-componente-placeholder"></div>
```

### Nova Configuração

Adicione ao `js/config.js`:

```javascript
const SITE_CONFIG = {
    // Configurações existentes...
    
    novaConfig: {
        opcao1: 'valor1',
        opcao2: 'valor2'
    }
};
```

## 🧪 Testes

### Checklist de Testes Manuais

Antes de submeter um PR, teste:

- [ ] ✅ Página carrega sem erros no console
- [ ] ✅ Funciona no Chrome
- [ ] ✅ Funciona no Firefox
- [ ] ✅ Funciona no Safari
- [ ] ✅ Funciona no mobile (responsivo)
- [ ] ✅ Footer aparece corretamente
- [ ] ✅ Todos os links funcionam
- [ ] ✅ Formulários validam corretamente
- [ ] ✅ Animações são suaves
- [ ] ✅ Sem warnings no console
- [ ] ✅ Performance aceitável (Lighthouse > 80)

### Ferramentas de Teste

1. **Console do Navegador** (F12)
   - Verificar erros JavaScript
   - Verificar warnings

2. **Lighthouse** (Chrome DevTools)
   - Performance
   - Acessibilidade
   - Best Practices
   - SEO

3. **Responsive Mode** (DevTools)
   - Testar em diferentes resoluções
   - Mobile, Tablet, Desktop

4. **W3C Validator**
   - https://validator.w3.org/
   - Validar HTML

## 📄 Mensagens de Commit

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Tipos
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
style:    Formatação, CSS
refactor: Refatoração de código
test:     Testes
chore:    Manutenção

# Exemplos
git commit -m "feat: adiciona página de contato"
git commit -m "fix: corrige validação do formulário de signup"
git commit -m "docs: atualiza README com instruções de instalação"
git commit -m "style: melhora responsividade do header"
git commit -m "refactor: extrai lógica de validação para função separada"
```

## 🔍 Code Review

Ao revisar um PR, verifique:

### Código
- [ ] Segue os padrões do projeto
- [ ] Está bem documentado
- [ ] Não tem código duplicado
- [ ] Não tem console.log() esquecidos

### Funcionalidade
- [ ] Funciona conforme esperado
- [ ] Não quebra funcionalidades existentes
- [ ] É responsivo
- [ ] Performance aceitável

### Qualidade
- [ ] Código limpo e legível
- [ ] Nomes descritivos
- [ ] Comentários quando necessário
- [ ] Sem complexidade desnecessária

## 🐛 Debugging

### Problemas Comuns

#### Footer não aparece
```javascript
// Verifique se o placeholder existe
console.log(document.getElementById('footer-placeholder'));

// Verifique se components.js está carregado
console.log(typeof loadFooter);
```

#### CSS não aplica
```javascript
// Verifique o caminho do CSS
// Em pages/, use: ../css/styles.css
// Na raiz, use: css/styles.css
```

#### JavaScript não executa
```javascript
// Verifique a ordem dos scripts
// 1. script.js (sempre primeiro)
// 2. components.js
// 3. scripts específicos
```

### Ferramentas Úteis

- **Chrome DevTools**: F12
- **VS Code Extensions**:
  - Live Server
  - Prettier
  - ESLint
  - HTML CSS Support

## 📚 Recursos Úteis

### Documentação
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### Ferramentas
- [Can I Use](https://caniuse.com/) - Compatibilidade de browsers
- [ColorSpace](https://mycolor.space/) - Paletas de cores
- [Font Awesome](https://fontawesome.com/) - Ícones
- [Coolors](https://coolors.co/) - Gerador de paletas

### Inspiração
- [Dribbble](https://dribbble.com/)
- [Behance](https://www.behance.net/)
- [Awwwards](https://www.awwwards.com/)

## 💬 Precisa de Ajuda?

- 📧 **Email**: [seu-email@example.com]
- 💬 **Discord**: [Link do servidor]
- 🐛 **Issues**: [GitHub Issues](https://github.com/accorsirodrigo/fastbot/issues)

## 🙏 Reconhecimentos

Obrigado a todos os contribuidores que ajudam a tornar este projeto melhor!

---

**Happy Coding! 🚀**

