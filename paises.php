<?php 
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $bd = "world";
    $con = new mysqli($servidor, $usuario, $senha, $bd);

    if($con->connect_error){
        die("Falha na conexão " . $con->connect_error);
    }
    
    $consulta = "select name from country where name like ? order by name";

    $pstm = $con->prepare($consulta);
    $pstm->bind_param("s", $paramentro);

    $paramentro = $_GET['nome'] . '%';
    $pstm->execute();

    $resultado = $pstm->get_result();
    $dados = [];

    //var_dump(json_encode($dados));

    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc())
            $dados[] = $linha;
    }
    
    $pstm->close();
    $con->close();

    header('Content-Type: application/json');
    echo json_encode($dados);
?>