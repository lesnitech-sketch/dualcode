// Gerenciamento da página de post individual
class PostViewer {
    constructor() {
        this.postId = this.getPostIdFromUrl();
        this.post = null;
        this.init();
    }

    getPostIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    init() {
        if (!this.postId) {
            this.showError('Post não encontrado. Redirecionando...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            return;
        }

        this.post = BLOG_CONFIG.posts.find(p => p.id === this.postId);

        if (!this.post) {
            this.showError('Post não encontrado. Redirecionando...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            return;
        }

        this.loadPost();
    }

    async loadPost() {
        try {
            const response = await fetch(this.post.file);

            if (!response.ok) {
                throw new Error('Erro ao carregar o post');
            }

            const markdown = await response.text();
            this.renderPost(markdown);
        } catch (error) {
            console.error('Erro ao carregar post:', error);
            this.showError('Erro ao carregar o post. Por favor, tente novamente.');
        }
    }

    renderPost(markdown) {
        const contentContainer = document.getElementById('postContent');

        // Configurar marked para syntax highlighting
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (err) {
                        console.error('Erro no highlight:', err);
                    }
                }
                return hljs.highlightAuto(code).value;
            },
            breaks: true,
            gfm: true
        });

        // Converter markdown para HTML
        const htmlContent = marked.parse(markdown);

        // Criar estrutura do post
        const postHeader = document.createElement('div');
        postHeader.innerHTML = `
            <h1>${this.post.title}</h1>
            <div class="post-meta">
                ${this.formatDate(this.post.date)} • Por ${this.post.author}
                <div class="post-tags" style="margin-top: 0.5rem;">
                    ${this.post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        const postBody = document.createElement('div');
        postBody.innerHTML = htmlContent;

        contentContainer.innerHTML = '';
        contentContainer.appendChild(postHeader);
        contentContainer.appendChild(postBody);

        // Atualizar título da página
        document.getElementById('pageTitle').textContent = `${this.post.title} - Meu Blog`;

        // Aplicar syntax highlighting em blocos de código
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    showError(message) {
        const contentContainer = document.getElementById('postContent');
        contentContainer.innerHTML = `
            <div class="no-results">
                <p>${message}</p>
            </div>
        `;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new PostViewer();
});
