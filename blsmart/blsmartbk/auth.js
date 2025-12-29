
// Gerenciamento de autenticação
class AuthManager {
    static login(username, password) {
        return fetch(`${API_URL}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('username', data.username);
                return true;
            }
            return false;
        })
        .catch(err => {
            console.error('Erro no login:', err);
            return false;
        });
    }

    static logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    }

    static isAuthenticated() {
        return localStorage.getItem('auth_token') !== null;
    }

    static getToken() {
        return localStorage.getItem('auth_token');
    }

    static getUsername() {
        return localStorage.getItem('username');
    }

    static requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    }
}

// Formulário de login
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        const success = await AuthManager.login(username, password);

        if (success) {
            window.location.href = 'admin.html';
        } else {
            errorMessage.classList.remove('hidden');
            setTimeout(() => {
                errorMessage.classList.add('hidden');
            }, 3000);
        }
    });
}

// Redireciona se já estiver autenticado (na página de login)
if (window.location.pathname.includes('login.html') && AuthManager.isAuthenticated()) {
    window.location.href = 'admin.html';
}
