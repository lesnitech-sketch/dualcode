// Verifica autenticação
if (typeof AuthManager !== 'undefined') {
    AuthManager.requireAuth();
}

// Gerenciamento do painel admin
const manager = new ProductManager();

// Mostra informações do usuário
function showUserInfo() {
    const username = localStorage.getItem('username');
    if (username) {
        const header = document.querySelector('.bg-white.rounded-lg.shadow-md.p-6.mb-6');
        const userInfo = document.createElement('div');
        userInfo.className = 'text-sm text-gray-600 mt-2';
        userInfo.innerHTML = `
            Logado como: <strong>${username}</strong> |
            <button onclick="logout()" class="text-red-600 hover:underline">Sair</button>
        `;
        header.appendChild(userInfo);
    }
}

// Logout
function logout() {
    if (typeof AuthManager !== 'undefined') {
        AuthManager.logout();
    }
}

// Renderiza lista de produtos no admin
async function renderAdminProducts() {
    const list = document.getElementById('admin-products-list');

    try {
        await manager.loadProducts();
        const products = manager.getAllProducts();

        if (products.length === 0) {
            list.innerHTML = '<p class="text-gray-500 text-center py-4">Nenhum produto cadastrado</p>';
            return;
        }

        list.innerHTML = products.map(product => {
            const installments = product.installments || 1;
            const installmentInfo = installments > 1
                ? `<p class="text-green-600 text-sm font-semibold">até ${installments}x de R$ ${(product.price / installments).toFixed(2).replace('.', ',')}</p>`
                : '<p class="text-gray-500 text-sm">Pagamento à vista</p>';

            return `
                <div class="border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition">
                    <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded">

                    <div class="flex-1">
                        <h3 class="font-bold text-lg text-gray-800">${product.name}</h3>
                        <p class="text-gray-600 text-sm">${product.description}</p>
                        ${installmentInfo}
                        <p class="text-blue-900 font-bold mt-1">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                    </div>

                    <button onclick="deleteProduct(${product.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-bold">
                        Remover
                    </button>
                </div>
            `;
        }).join('');
    } catch (error) {
        list.innerHTML = '<p class="text-red-500 text-center py-4">Erro ao carregar produtos</p>';
    }
}

// Preview da imagem
const imageFileInput = document.getElementById('product-image-file');
const imageUrlInput = document.getElementById('product-image');
const imagePreview = document.getElementById('image-preview');
const previewImg = document.getElementById('preview-img');

// Preview quando seleciona arquivo
imageFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
        // Limpa o campo de URL
        imageUrlInput.value = '';
    }
});

// Preview quando digita URL
imageUrlInput.addEventListener('input', (e) => {
    const url = e.target.value.trim();
    if (url) {
        previewImg.src = url;
        imagePreview.classList.remove('hidden');
        // Limpa o campo de arquivo
        imageFileInput.value = '';
    } else {
        imagePreview.classList.add('hidden');
    }
});

// Faz upload da imagem
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${API_URL}/upload.php`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) throw new Error('Erro ao fazer upload');

        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        throw error;
    }
}

// Adiciona novo produto
document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    let image = document.getElementById('product-image').value;
    const imageFile = document.getElementById('product-image-file').files[0];
    const description = document.getElementById('product-description').value;
    const installments = parseInt(document.getElementById('product-installments').value) || 1;

    try {
        // Se tem arquivo, faz upload primeiro
        if (imageFile) {
            image = await uploadImage(imageFile);
        }

        // Valida se tem uma imagem (URL ou upload)
        if (!image) {
            alert('Por favor, selecione uma imagem ou insira uma URL');
            return;
        }

        await manager.addProduct({
            name,
            price,
            image,
            description,
            installments
        });

        // Limpa o formulário
        e.target.reset();
        // Reseta o valor de parcelas para 1
        document.getElementById('product-installments').value = 1;
        // Esconde o preview
        imagePreview.classList.add('hidden');

        // Atualiza a lista
        await renderAdminProducts();

        // Mostra mensagem de sucesso
        alert('Produto adicionado com sucesso!');
    } catch (error) {
        alert('Erro ao adicionar produto. Verifique se está autenticado.');
    }
});

// Remove produto
async function deleteProduct(id) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
        try {
            await manager.removeProduct(id);
            await renderAdminProducts();
        } catch (error) {
            alert('Erro ao remover produto. Verifique se está autenticado.');
        }
    }
}

// Inicializa a página
showUserInfo();
renderAdminProducts();
