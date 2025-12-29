<?php
// Configuração do banco de dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'blsmart');
define('DB_USER', 'blsmart');
define('DB_PASS', 'blsmart123');

// Configuração de CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Responde OPTIONS para CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Conexão com o banco de dados
function getConnection() {
    try {
        $conn = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $conn;
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro de conexão com o banco de dados']);
        exit();
    }
}

// Função para verificar autenticação
function checkAuth() {
    $headers = getallheaders();
    $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';

    if ($token !== 'blsmart-admin-token') {
        http_response_code(401);
        echo json_encode(['error' => 'Não autorizado']);
        exit();
    }
}

// Função para obter o corpo da requisição
function getRequestBody() {
    return json_decode(file_get_contents('php://input'), true);
}
?>
