<?php 
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $bd = "world";

    $con = new mysqli($servidor, $usuario, $senha, $bd);

    if($con->connect_error){
        die("Falha na conexão " . $con->connect_error);
    }

    $consulta = "select city.name as name from country join city on city.CountryCode = country.Code where country.Name = ? order by city.name;";

    $pstm = $con->prepare($consulta);
    $pstm->bind_param("s", $nome);

    $nome = $_GET["nome"];

    $pstm->execute();

    $resultado = $pstm->get_result();
    $cidades = [];

    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $cidades[] = $linha;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($cidades);
?>