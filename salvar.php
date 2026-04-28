<?php

// Pega os dados enviados pelo formulário
$nome = $_POST['nome'];
$servico = $_POST['servico'];
$data = $_POST['data'];

// Cria um novo cliente
$novoCliente = [
    "nome" => $nome,
    "servico" => $servico,
    "data" => $data
];

// Nome do arquivo JSON
$arquivo = 'dados.json';

// Se o arquivo estiver vazio
if (filesize($arquivo) == 0) {
    $dados = [];
} else {
    // Lê os dados existentes
    $dados = json_decode(file_get_contents($arquivo), true);
}

// Adiciona novo cliente
$dados[] = $novoCliente;

// Salva no JSON formatado
file_put_contents(
    $arquivo,
    json_encode($dados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

// Redireciona de volta
header("Location: contato.html");

exit;

?>