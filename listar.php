<?php

$arquivo = 'dados.json';

$dados = json_decode(file_get_contents($arquivo), true);

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Clientes cadastrados</title>

    <style>

        body{
            font-family: Arial;
            background: #f4f4f4;
            padding: 30px;
        }

        h1{
            text-align: center;
        }

        .card{
            background: white;
            padding: 20px;
            margin: 20px auto;
            border-radius: 10px;
            max-width: 500px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

    </style>

</head>
<body>

<h1>Clientes cadastrados</h1>

<?php

if(empty($dados)){
    echo "<p>Nenhum cliente cadastrado.</p>";
}

foreach($dados as $cliente){

    echo "
    <div class='card'>

        <h2>{$cliente['nome']}</h2>

        <p><strong>Serviço:</strong> {$cliente['servico']}</p>

        <p><strong>Data:</strong> {$cliente['data']}</p>

    </div>
    ";
}

?>

</body>
</html>