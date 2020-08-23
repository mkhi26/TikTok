<?php
header("Content-Type: application/json");
include_once("../class/class-usuario.php");

switch($_SERVER['REQUEST_METHOD']){

    case "PUT":
        $_PUT = json_decode(file_get_contents('php://input'),true);
        if (isset($_PUT['idUsuario']) and isset($_PUT['idSeguir'])){
            $retorno = Usuario::seguirUsuario($_PUT['idUsuario'], $_PUT['idSeguir']);
            $respuesta = array(
                "strSiguiendo"=>$retorno
            );
            echo json_encode($respuesta);
        }
    break;
    case "GET":
        if(isset($_GET['idUsuario']) and isset($_GET["idSeguir"])){
            $retorno = Usuario::siguiendo($_GET['idUsuario'], $_GET['idSeguir']);
            $respuesta = array(
                "mensaje"=> $retorno
            );
            echo json_encode($respuesta);
            
        }

    break;
}
?>