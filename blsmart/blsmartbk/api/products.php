<?php
require_once 'config.php';

// ===== CONFIGURAÇÃO CORS =====
$allowed_origins = [
    'https://www.dualcode.com.br',
    'https://dualcode.com.br',
    'http://localhost:3000' // Para desenvolvimento local
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// ===== FIM CORS =====

$method = $_SERVER['REQUEST_METHOD'];
$conn = getConnection();

// GET - Lista todos os produtos
if ($method === 'GET') {
    try {
        $stmt = $conn->query("SELECT * FROM products ORDER BY id DESC");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Normaliza tipos de dados
        foreach ($products as &$product) {
            $product['id'] = (int)$product['id'];
            $product['price'] = (float)$product['price'];
            $product['installments'] = (int)($product['installments'] ?? 1);
        }

        echo json_encode($products, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Erro ao buscar produtos',
            'details' => $e->getMessage() // Remover em produção
        ]);
    }
}

// POST - Adiciona novo produto
elseif ($method === 'POST') {
    checkAuth();

    $data = getRequestBody();

    // Validação de campos obrigatórios
    $required_fields = ['name', 'price', 'image', 'description'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            http_response_code(400);
            echo json_encode(['error' => "Campo '$field' é obrigatório"]);
            exit();
        }
    }

    $installments = max(1, (int)($data['installments'] ?? 1));

    try {
        $stmt = $conn->prepare(
            "INSERT INTO products (name, price, image, description, installments) 
             VALUES (:name, :price, :image, :description, :installments)"
        );
        
        $stmt->execute([
            ':name' => trim($data['name']),
            ':price' => (float)$data['price'],
            ':image' => trim($data['image']),
            ':description' => trim($data['description']),
            ':installments' => $installments
        ]);

        $id = (int)$conn->lastInsertId();

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'id' => $id,
            'name' => $data['name'],
            'price' => (float)$data['price'],
            'image' => $data['image'],
            'description' => $data['description'],
            'installments' => $installments
        ], JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao adicionar produto']);
    }
}

// DELETE - Remove produto
elseif ($method === 'DELETE') {
    checkAuth();

    $id = (int)($_GET['id'] ?? 0);

    if ($id === 0 && isset($_SERVER['PATH_INFO'])) {
        $path = explode('/', trim($_SERVER['PATH_INFO'], '/'));
        $id = (int)end($path);
    }

    if ($id === 0) {
        http_response_code(400);
        echo json_encode(['error' => 'ID inválido']);
        exit();
    }

    try {
        $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Produto não encontrado']);
        } else {
            echo json_encode(['success' => true, 'message' => 'Produto removido']);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao remover produto']);
    }
}

// PUT - Atualiza produto
elseif ($method === 'PUT') {
    checkAuth();

    $data = getRequestBody();
    $id = (int)($_GET['id'] ?? 0);

    if ($id === 0 && isset($_SERVER['PATH_INFO'])) {
        $path = explode('/', trim($_SERVER['PATH_INFO'], '/'));
        $id = (int)end($path);
    }

    if ($id === 0) {
        http_response_code(400);
        echo json_encode(['error' => 'ID inválido']);
        exit();
    }

    $installments = max(1, (int)($data['installments'] ?? 1));

    try {
        $stmt = $conn->prepare(
            "UPDATE products 
             SET name = :name, price = :price, image = :image, 
                 description = :description, installments = :installments 
             WHERE id = :id"
        );
        
        $stmt->execute([
            ':name' => trim($data['name']),
            ':price' => (float)$data['price'],
            ':image' => trim($data['image']),
            ':description' => trim($data['description']),
            ':installments' => $installments,
            ':id' => $id
        ]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Produto não encontrado']);
        } else {
            echo json_encode([
                'success' => true,
                'id' => $id,
                'name' => $data['name'],
                'price' => (float)$data['price'],
                'image' => $data['image'],
                'description' => $data['description'],
                'installments' => $installments
            ], JSON_UNESCAPED_UNICODE);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao atualizar produto']);
    }
}

else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}
?>