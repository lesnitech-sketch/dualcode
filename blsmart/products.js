// Configuração da API
// Para desenvolvimento local com aaPanel, use: 'http://localhost/blsmart/api'


// Gerenciamento de produtos com API
class ProductManager {
    constructor() {
        this.products = [];
    }

    // Carrega produtos da API
    async loadProducts() {
        try {
            const response = await fetch(`${API_URL}/products.php`);
            if (!response.ok) throw new Error('Erro ao carregar produtos');
            this.products = await response.json();
            return this.products;
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            return [];
        }
    }

    // Adiciona novo produto
    async addProduct(product) {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`${API_URL}/products.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) throw new Error('Erro ao adicionar produto');

            const newProduct = await response.json();
            this.products.push(newProduct);
            return newProduct;
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            throw error;
        }
    }

    // Remove produto
    async removeProduct(id) {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`${API_URL}/products.php?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Erro ao remover produto');

            this.products = this.products.filter(p => p.id !== id);
        } catch (error) {
            console.error('Erro ao remover produto:', error);
            throw error;
        }
    }

    // Atualiza produto
    async updateProduct(id, updates) {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`${API_URL}/products.php?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) throw new Error('Erro ao atualizar produto');

            const updatedProduct = await response.json();
            const index = this.products.findIndex(p => p.id === id);
            if (index !== -1) {
                this.products[index] = updatedProduct;
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    // Retorna todos os produtos
    getAllProducts() {
        return this.products;
    }

    // Busca produtos
    searchProducts(query) {
        const lowerQuery = query.toLowerCase();
        return this.products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
    }
}

// Renderiza os produtos na página
async function renderProducts(products = null) {
    const manager = new ProductManager();

    if (!products) {
        await manager.loadProducts();
        products = manager.getAllProducts();
    }

    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-white text-lg py-8">Nenhum produto disponível</p>';
        return;
    }

    grid.innerHTML = products.map(product => {
        const installments = product.installments || 1;
        const installmentText = installments > 1
            ? `<p class="text-sm text-green-600 font-semibold text-center mb-1">Parcelamento em até ${installments} vezes</p>`
            : '';

        return `
            <div class="product-card bg-white rounded-3xl p-5 shadow-lg">
                <div class="product-info mb-4">
                    <h3 class="product-title text-lg font-bold text-gray-900 mb-4 text-center">${product.name}</h3>

                    <div class="product-image-container bg-white rounded-xl flex items-center justify-center overflow-hidden mb-4">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <p class="product-description text-sm text-gray-600 mb-3">${product.description}</p>
                    ${installmentText}
                    <p class="product-price text-3xl text-center font-black text-blue-900 mt-1">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <a href="https://wa.me/558596945408?text=Olá!%20Gostaria%20de%20comprar%20o%20${encodeURIComponent(product.name)}" target="_blank" class="buy-button block text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-5 rounded-xl font-bold text-base hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">
                    Comprar agora
                </a>
            </div>
        `;
    }).join('');
}

// Inicializa a busca
async function initSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    if (!searchInput) return;

    const manager = new ProductManager();
    await manager.loadProducts();

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query) {
            const results = manager.searchProducts(query);
            renderProducts(results);
        } else {
            renderProducts(manager.getAllProducts());
        }
    });
}

// Inicializa quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts();
        initSearch();
    });
} else {
    renderProducts();
    initSearch();
}
