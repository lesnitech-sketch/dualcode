<?php
// Configuração de CORS (antes de qualquer output)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Responde OPTIONS para CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Só carrega o config depois do CORS, mas não usamos as funções que setam headers
require_once 'config.php';

// Sobrescreve o Content-Type para JSON (para a resposta)
header('Content-Type: application/json; charset=utf-8');

// Verifica autenticação
checkAuth();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Debug: log dos arquivos recebidos
    error_log('FILES recebido: ' . print_r($_FILES, true));

    // Verifica se o arquivo foi enviado
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Nenhuma imagem foi enviada. FILES: ' . json_encode($_FILES)]);
        exit();
    }

    if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        $errorMsg = '';
        switch ($_FILES['image']['error']) {
            case UPLOAD_ERR_INI_SIZE:
                $errorMsg = 'Arquivo excede upload_max_filesize do php.ini';
                break;
            case UPLOAD_ERR_FORM_SIZE:
                $errorMsg = 'Arquivo excede MAX_FILE_SIZE do formulário';
                break;
            case UPLOAD_ERR_PARTIAL:
                $errorMsg = 'Upload parcial';
                break;
            case UPLOAD_ERR_NO_FILE:
                $errorMsg = 'Nenhum arquivo foi enviado';
                break;
            default:
                $errorMsg = 'Erro desconhecido: ' . $_FILES['image']['error'];
        }
        echo json_encode(['error' => $errorMsg]);
        exit();
    }

    $file = $_FILES['image'];

    // Validações
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    $maxSize = 5 * 1024 * 1024; // 5MB

    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Tipo de arquivo não permitido. Use: JPG, PNG, GIF ou WEBP']);
        exit();
    }

    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(['error' => 'Arquivo muito grande. Máximo: 5MB']);
        exit();
    }

    // Cria a pasta uploads se não existir
    $uploadDir = __DIR__ . '/../uploads/';

    error_log('Diretório de upload: ' . $uploadDir);
    error_log('Diretório existe: ' . (file_exists($uploadDir) ? 'sim' : 'não'));

    if (!file_exists($uploadDir)) {
        $created = mkdir($uploadDir, 0777, true);
        error_log('Tentou criar diretório: ' . ($created ? 'sucesso' : 'falhou'));
        if (!$created) {
            http_response_code(500);
            echo json_encode(['error' => 'Não foi possível criar a pasta uploads']);
            exit();
        }
    }

    // Verifica se o diretório é gravável
    if (!is_writable($uploadDir)) {
        error_log('Diretório não é gravável');
        http_response_code(500);
        echo json_encode(['error' => 'Pasta uploads não tem permissão de escrita']);
        exit();
    }

    // Gera nome único para o arquivo
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('product_', true) . '.' . $extension;
    $filepath = $uploadDir . $filename;

    error_log('Caminho completo do arquivo: ' . $filepath);
    error_log('Arquivo temporário: ' . $file['tmp_name']);

    // Move o arquivo para a pasta uploads
    if (move_uploaded_file($file['tmp_name'], $filepath)) {
        error_log('Upload bem-sucedido!');

        // Retorna a URL relativa da imagem
        // Como a página já está em /blsmart/, usamos apenas uploads/
        $imageUrl = 'uploads/' . $filename;

        echo json_encode([
            'success' => true,
            'url' => $imageUrl,
            'filename' => $filename
        ]);
    } else {
        error_log('Falha ao mover arquivo');
        error_log('Erro move_uploaded_file: ' . error_get_last()['message']);
        http_response_code(500);
        echo json_encode([
            'error' => 'Erro ao salvar o arquivo',
            'details' => 'Não foi possível mover o arquivo temporário',
            'tmp_name' => $file['tmp_name'],
            'target' => $filepath
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}
?>
