# Blog com Markdown

Um blog simples e elegante que permite criar postagens usando arquivos Markdown (.md).

## Recursos

- ✅ **Posts em Markdown**: Escreva posts usando sintaxe Markdown
- ✅ **Busca**: Sistema de busca em tempo real
- ✅ **Filtros por Tags**: Organize e filtre posts por categorias
- ✅ **Syntax Highlighting**: Destaque de código automático
- ✅ **Design Responsivo**: Funciona perfeitamente em qualquer dispositivo
- ✅ **Sem build**: Funciona direto no navegador sem necessidade de compilação

## Estrutura do Projeto

\`\`\`
blog/
├── index.html          # Página principal com listagem de posts
├── post.html           # Página de exibição de post individual
├── css/
│   └── style.css       # Estilos do blog
├── js/
│   ├── config.js       # Configuração e metadados dos posts
│   ├── blog.js         # Lógica da página principal
│   └── post.js         # Lógica da página de post
├── posts/              # Diretório com os arquivos .md dos posts
│   ├── primeiro-post.md
│   ├── introducao-javascript.md
│   └── markdown-guia.md
└── README.md
\`\`\`

## Como Usar

### 1. Visualizar o blog

Abra o arquivo \`index.html\` em um navegador web. Para melhor experiência, use um servidor local:

**Opção 1: Python**
\`\`\`bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
\`\`\`

**Opção 2: Node.js (npx)**
\`\`\`bash
npx http-server
\`\`\`

**Opção 3: VS Code**
- Instale a extensão "Live Server"
- Clique com botão direito no \`index.html\` → "Open with Live Server"

Acesse: \`http://localhost:8000\`

### 2. Adicionar um novo post

**Passo 1**: Crie um arquivo .md na pasta \`posts/\`

\`\`\`markdown
# Título do Meu Post

Conteúdo do post em **Markdown**.

## Seção

Mais conteúdo...
\`\`\`

**Passo 2**: Adicione os metadados em \`js/config.js\`

\`\`\`javascript
const BLOG_CONFIG = {
    posts: [
        {
            id: 'meu-novo-post',              // ID único (usado na URL)
            title: 'Título do Meu Post',      // Título exibido
            date: '2025-01-26',               // Data no formato YYYY-MM-DD
            author: 'Seu Nome',               // Nome do autor
            tags: ['tag1', 'tag2'],           // Tags para filtros
            excerpt: 'Resumo do post...',     // Texto de preview
            file: 'posts/meu-novo-post.md'    // Caminho do arquivo
        },
        // ... outros posts
    ]
};
\`\`\`

**Passo 3**: Atualize a página - o novo post aparecerá automaticamente!

### 3. Personalizar o blog

**Cores e estilos**: Edite \`css/style.css\`
\`\`\`css
:root {
    --primary-color: #3b82f6;      /* Cor principal */
    --secondary-color: #1e40af;    /* Cor secundária */
    /* ... outras variáveis */
}
\`\`\`

**Informações do header**: Edite \`index.html\` e \`post.html\`
\`\`\`html
<h1>Meu Blog</h1>
<p class="subtitle">Seu subtítulo aqui</p>
\`\`\`

**Tema do syntax highlighting**: Troque o tema em \`index.html\` e \`post.html\`
\`\`\`html
<!-- Temas disponíveis: github-dark, monokai, atom-one-dark, etc. -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/TEMA-AQUI.min.css">
\`\`\`

## Sintaxe Markdown Suportada

- Cabeçalhos (\`#\`, \`##\`, etc.)
- **Negrito** e *itálico*
- Listas ordenadas e não ordenadas
- Links e imagens
- Blocos de código com syntax highlighting
- Citações (\`>\`)
- Tabelas
- E muito mais!

Veja o post "Guia Completo de Markdown" no blog para exemplos.

## Tecnologias Utilizadas

- **HTML5**: Estrutura
- **CSS3**: Estilização com variáveis CSS
- **JavaScript (Vanilla)**: Lógica sem frameworks
- **Marked.js**: Conversão de Markdown para HTML
- **Highlight.js**: Syntax highlighting de código

## Funcionalidades

### Busca
Digite no campo de busca para filtrar posts por:
- Título
- Resumo (excerpt)
- Tags

### Filtros por Tag
Clique em uma tag para ver apenas posts daquela categoria. Clique em "Todos" para remover o filtro.

### URLs Amigáveis
Cada post tem uma URL única: \`post.html?id=nome-do-post\`

## Deploy

Para colocar o blog online, você pode usar:

- **GitHub Pages**: Faça upload dos arquivos e ative o GitHub Pages
- **Netlify**: Arraste e solte a pasta no Netlify
- **Vercel**: Deploy direto do repositório Git
- **Surge**: \`surge .\` na pasta do projeto

## Limitações e Considerações

- Requer servidor local para desenvolvimento (devido a CORS com \`fetch()\`)
- Os posts são carregados dinamicamente - SEO pode ser limitado
- Para melhor SEO, considere gerar HTML estático ou usar SSR

## Próximos Passos

Ideias para expandir o blog:

- [ ] Paginação de posts
- [ ] Comentários (usando serviços como Disqus)
- [ ] RSS feed
- [ ] Dark mode
- [ ] Compartilhamento em redes sociais
- [ ] Analytics
- [ ] Sistema de draft/rascunhos

## Licença

Livre para uso pessoal e comercial.

---

Feito com ❤️ e Markdown
