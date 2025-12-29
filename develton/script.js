/* ═══════════════════════════════════════════════════════════════
   Script.js - Interações Mínimas
   ═══════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────────
// 1. Fade-in Animation on Page Load
// ───────────────────────────────────────────────────────────────

/**
 * Adiciona animação suave de entrada ao carregar a página
 */
function initFadeIn() {
    const cardContainer = document.querySelector('.card-container');

    // Pequeno delay para garantir que a página carregou
    setTimeout(() => {
        if (cardContainer) {
            cardContainer.classList.add('fade-in');
        }
    }, 100);
}

// ───────────────────────────────────────────────────────────────
// 2. Copy Phone Number to Clipboard
// ───────────────────────────────────────────────────────────────

/**
 * Copia o número de telefone para a área de transferência
 * Mostra feedback visual de sucesso
 */
function initCopyPhone() {
    const copyBtn = document.getElementById('copyPhoneBtn');

    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        // Número de telefone a ser copiado
        const phoneNumber = '+55 41 99183-0037';

        try {
            // Tenta usar a API moderna de clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(phoneNumber);
                showCopySuccess(copyBtn);
            } else {
                // Fallback para navegadores mais antigos
                copyToClipboardFallback(phoneNumber);
                showCopySuccess(copyBtn);
            }
        } catch (err) {
            console.error('Erro ao copiar número:', err);
            // Tenta o método fallback em caso de erro
            copyToClipboardFallback(phoneNumber);
            showCopySuccess(copyBtn);
        }
    });
}

/**
 * Método fallback para copiar texto em navegadores antigos
 */
function copyToClipboardFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Erro ao copiar', err);
    }

    document.body.removeChild(textArea);
}

/**
 * Mostra feedback visual de sucesso ao copiar
 */
function showCopySuccess(button) {
    const originalText = button.innerHTML;

    // Muda o texto do botão temporariamente
    button.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
        </svg>
        Copiado!
    `;
    button.classList.add('copied');

    // Volta ao estado original após 2 segundos
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('copied');
    }, 2000);
}

// ───────────────────────────────────────────────────────────────
// 3. External Links - Open in New Tab (já configurado no HTML)
// ───────────────────────────────────────────────────────────────

/**
 * Garante que links externos abram em nova aba
 * (Redundância caso links sejam adicionados dinamicamente)
 */
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');

    externalLinks.forEach(link => {
        // Garante que o link tenha target="_blank"
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// ───────────────────────────────────────────────────────────────
// 4. Keyboard Navigation Enhancement
// ───────────────────────────────────────────────────────────────

/**
 * Melhora a navegação por teclado
 * Adiciona feedback visual ao focar elementos
 */
function initKeyboardNavigation() {
    // Detecta quando o usuário está usando teclado
    let usingKeyboard = false;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            usingKeyboard = true;
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        usingKeyboard = false;
        document.body.classList.remove('keyboard-navigation');
    });
}

// ───────────────────────────────────────────────────────────────
// 5. Initialize All Functions on DOM Load
// ───────────────────────────────────────────────────────────────

/**
 * Inicializa todas as funcionalidades quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    initFadeIn();
    initCopyPhone();
    initExternalLinks();
    initKeyboardNavigation();
    initAvatarUpload();

    // Log de confirmação (opcional - remover em produção)
    console.log('✓ Site carregado com sucesso');
});


// ───────────────────────────────────────────────────────────────
// 7. Avatar Upload (click or drag & drop)
// ───────────────────────────────────────────────────────────────

/**
 * Permite ao usuário clicar no avatar para abrir um file picker
 * ou arrastar/soltar uma imagem sobre o avatar para trocar a foto.
 */
function initAvatarUpload() {
    const avatarContainer = document.querySelector('.avatar');
    if (!avatarContainer) return;

    const img = avatarContainer.querySelector('img');
    if (!img) return;

    // Cria um input file escondido
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Quando o usuário seleciona um arquivo via file picker
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) readAndSetImage(file, img);
        fileInput.value = '';
    });

    // Clique no avatar abre o file picker
    avatarContainer.addEventListener('click', () => fileInput.click());

    // Drag & drop
    ['dragenter', 'dragover'].forEach(evt => {
        avatarContainer.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
            avatarContainer.classList.add('dragover');
        });
    });

    ['dragleave', 'dragend', 'drop'].forEach(evt => {
        avatarContainer.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (evt === 'drop') {
                const dt = e.dataTransfer;
                const file = dt && dt.files && dt.files[0];
                if (file) readAndSetImage(file, img);
            }
            avatarContainer.classList.remove('dragover');
        });
    });
}

function readAndSetImage(file, imgEl) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
        imgEl.src = reader.result;
    };
    reader.readAsDataURL(file);
}

// ───────────────────────────────────────────────────────────────
// 6. Optional: Service Worker for PWA (comentado)
// ───────────────────────────────────────────────────────────────

/*
// Descomente este bloco se quiser transformar em PWA

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registrado:', registration))
            .catch(error => console.log('SW erro:', error));
    });
}
*/

/* ═══════════════════════════════════════════════════════════════
   INSTRUÇÕES FINAIS:
   ═══════════════════════════════════════════════════════════════

   1. NÚMERO DE TELEFONE (linha 38):
      Substitua "+55 11 99999-9999" pelo número real formatado
      Exemplo: "+55 21 98765-4321"

   2. Este script é minimalista e focado em:
      - Animação suave de entrada
      - Copiar número de telefone
      - Garantir links externos seguros
      - Melhorar acessibilidade de teclado

   3. Não há dependências externas (jQuery, etc.)

   4. Compatível com IE11+ e todos os navegadores modernos

   ═══════════════════════════════════════════════════════════════ */
