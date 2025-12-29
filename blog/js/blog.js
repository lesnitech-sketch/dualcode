// Gerenciamento da página principal do blog
class BlogManager {
    constructor() {
        this.posts = BLOG_CONFIG.posts;
        this.filteredPosts = [...this.posts];
        this.selectedTag = null;
        this.searchTerm = '';

        this.init();
    }

    init() {
        this.sortPostsByDate();
        this.renderTags();
        this.renderPosts();
        this.setupEventListeners();
    }

    sortPostsByDate() {
        this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.filteredPosts = [...this.posts];
    }

    getAllTags() {
        const tagsSet = new Set();
        this.posts.forEach(post => {
            post.tags.forEach(tag => tagsSet.add(tag));
        });
        return Array.from(tagsSet).sort();
    }

    renderTags() {
        const tagsContainer = document.getElementById('tagsFilter');
        const allTags = this.getAllTags();

        tagsContainer.innerHTML = '';

        // Tag "Todos"
        const allTag = document.createElement('span');
        allTag.className = 'tag active';
        allTag.textContent = 'Todos';
        allTag.addEventListener('click', () => this.filterByTag(null));
        tagsContainer.appendChild(allTag);

        // Tags individuais
        allTags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => this.filterByTag(tag));
            tagsContainer.appendChild(tagElement);
        });
    }

    filterByTag(tag) {
        this.selectedTag = tag;
        this.applyFilters();
        this.updateActiveTag();
    }

    updateActiveTag() {
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => tag.classList.remove('active'));

        if (this.selectedTag === null) {
            tags[0].classList.add('active');
        } else {
            tags.forEach(tag => {
                if (tag.textContent === this.selectedTag) {
                    tag.classList.add('active');
                }
            });
        }
    }

    search(term) {
        this.searchTerm = term.toLowerCase();
        this.applyFilters();
    }

    applyFilters() {
        this.filteredPosts = this.posts.filter(post => {
            const matchesTag = this.selectedTag === null || post.tags.includes(this.selectedTag);
            const matchesSearch = this.searchTerm === '' ||
                post.title.toLowerCase().includes(this.searchTerm) ||
                post.excerpt.toLowerCase().includes(this.searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));

            return matchesTag && matchesSearch;
        });

        this.renderPosts();
    }

    renderPosts() {
        const postsContainer = document.getElementById('postsContainer');
        const noResults = document.getElementById('noResults');

        postsContainer.innerHTML = '';

        if (this.filteredPosts.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        this.filteredPosts.forEach(post => {
            const postCard = this.createPostCard(post);
            postsContainer.appendChild(postCard);
        });
    }

    createPostCard(post) {
        const card = document.createElement('div');
        card.className = 'post-card';

        const title = document.createElement('h2');
        const titleLink = document.createElement('a');
        titleLink.href = `post.html?id=${post.id}`;
        titleLink.textContent = post.title;
        title.appendChild(titleLink);

        const meta = document.createElement('div');
        meta.className = 'post-meta';
        meta.textContent = `${this.formatDate(post.date)} • Por ${post.author}`;

        const excerpt = document.createElement('p');
        excerpt.className = 'post-excerpt';
        excerpt.textContent = post.excerpt;

        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'post-tags';
        post.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'post-tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });

        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(excerpt);
        card.appendChild(tagsContainer);

        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                window.location.href = `post.html?id=${post.id}`;
            }
        });

        return card;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.search(e.target.value);
        });
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});
