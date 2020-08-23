<?php
header("Content-Type: application/json");
include_once("../class/class-comentario.php");

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'),true);
        $comentario = new Comentario($_POST["idComentario"], $_POST["contenidoComentario"], $_POST["idUsrComentario"]);
        $comentario->hacerComentario($_GET["idUsuario"], $_GET["idPublicacion"]);
    break;
    case "GET":  
        
        if (isset($_GET['idUsuario']) and isset($_GET['idPublicacion']) and isset($_GET['idComentario']) ){
            echo json_encode(Comentario::obtenerComentario($_GET['idUsuario'], $_GET['idPublicacion'], $_GET['idComentario']));
        }else{
            if (isset($_GET['idUsuario']) and isset($_GET['idPublicacion'])){
                echo json_encode(Comentario::obtenerComentarios($_GET['idUsuario'], $_GET['idPublicacion']) );
            }
            
        }
    break;
    case "PUT":
        $_PUT = json_decode(file_get_contents('php://input'),true);
    break;
    case "DELETE":
    break;
}
?>