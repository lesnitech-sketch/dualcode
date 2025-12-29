# BLsmartwatch - Catálogo de Relógios

Sistema de catálogo de relógios com painel administrativo e autenticação para **aaPanel** (PHP + MySQL).

## 🚀 Deploy no aaPanel

### Guia Rápido (5 minutos)
Leia: [DEPLOY_AAPANEL_RAPIDO.md](DEPLOY_AAPANEL_RAPIDO.md)

### Guia Completo
Leia: [INSTALL_AAPANEL.md](INSTALL_AAPANEL.md)

## 📁 Estrutura de Arquivos

```
blsmart/
├── index.html          # Página principal da loja
├── login.html          # Página de login
├── admin.html          # Painel administrativo
├── products.js         # Gerenciamento de produtos (API)
├── admin.js            # Lógica do painel admin
├── auth.js             # Sistema de autenticação
├── style.css           # Estilos CSS
├── .htaccess           # URLs amigáveis (Apache)
├── database.sql        # Banco de dados MySQL
├── api/
│   ├── config.php      # Configuração do banco ⚠️ EDITAR!
│   ├── products.php    # API de produtos
│   └── login.php       # API de login
└── assets/             # Imagens dos produtos
    ├── t800.png
    └── ws79.png
```

## ⚡ Instalação Rápida

### 1. No aaPanel
- Crie um site novo
- Crie um banco de dados MySQL
- Anote: nome do banco, usuário e senha

### 2. Upload dos Arquivos
Envie todos os arquivos para: `/www/wwwroot/seusite.com`

### 3. Configurar Banco
Edite `api/config.php` com suas credenciais:
```php
define('DB_NAME', 'seu_banco');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
```

### 4. Importar Database
- phpMyAdmin → Import → `database.sql`

### 5. Testar
- API: `https://seusite.com/api/products.php`
- Loja: `https://seusite.com/index.html`
- Admin: `https://seusite.com/login.html`
  - Usuário: `admin`
  - Senha: `admin123`

## 🔐 Credenciais Padrão

- **Usuário**: `admin`
- **Senha**: `admin123`

**⚠️ IMPORTANTE**: Altere a senha após a instalação!

## 📱 Configurar WhatsApp

Edite `products.js` e substitua `seu_numero_aqui` por:
```
5511999999999  (55 = Brasil, 11 = DDD, número)
```

## 🛠️ Tecnologias

- HTML5 + CSS3
- JavaScript (ES6+)
- Tailwind CSS
- PHP 7.4+
- MySQL 5.7+

## 🎨 Funcionalidades

- ✅ Catálogo de produtos dinâmico
- ✅ Busca em tempo real
- ✅ Painel administrativo
- ✅ Adicionar/remover produtos
- ✅ Autenticação segura
- ✅ API RESTful em PHP
- ✅ Sincronização em tempo real
- ✅ Responsivo (mobile-first)

## 📝 API Endpoints

- `GET /api/products.php` - Lista todos os produtos
- `POST /api/products.php` - Adiciona produto (requer auth)
- `DELETE /api/products.php?id=1` - Remove produto (requer auth)
- `PUT /api/products.php?id=1` - Atualiza produto (requer auth)
- `POST /api/login.php` - Autenticação

## 🔒 Segurança

### Alterar Senha do Admin

No phpMyAdmin:
```sql
UPDATE users SET password = 'sua_senha_forte' WHERE username = 'admin';
```

Ou adicionar mais administradores:
```sql
INSERT INTO users (username, password) VALUES ('novo_admin', 'senha_forte');
```

## 🐛 Problemas Comuns

**Produtos não aparecem?**
- Verifique se `api/config.php` está com as credenciais corretas
- Teste a API: `seusite.com/api/products.php`
- Veja o Console do navegador (F12)

**Erro 404 na API?**
- Verifique se o arquivo `.htaccess` foi enviado
- Ative mod_rewrite no Apache (aaPanel → Apache → Modules)

**Erro de conexão com banco?**
- Confirme as credenciais em `api/config.php`
- Verifique se o banco foi criado no aaPanel

## 📦 Backup

### Banco de Dados
aaPanel → Database → Seu banco → Export

### Arquivos
aaPanel → Files → Selecione a pasta → Compress → Download

## 💡 Dicas

1. **Imagens**: Coloque as imagens na pasta `assets/`
2. **SSL**: Ative HTTPS grátis com Let's Encrypt no aaPanel
3. **Múltiplos admins**: Adicione no banco via phpMyAdmin
4. **Personalização**: Edite `style.css` para mudar cores

## 📞 Suporte

Problemas? Veja os guias:
- [INSTALL_AAPANEL.md](INSTALL_AAPANEL.md) - Guia completo
- [DEPLOY_AAPANEL_RAPIDO.md](DEPLOY_AAPANEL_RAPIDO.md) - Deploy rápido
- [ESTRUTURA_ARQUIVOS.txt](ESTRUTURA_ARQUIVOS.txt) - Checklist

---

Desenvolvido com ❤️ para BLsmartwatch
