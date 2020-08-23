<?php
header("Content-Type: application/json");
include_once("../class/class-publicacion.php");

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'),true);
        $publicacion = new Publicacion($_POST["idPublicacion"], $_POST["leyenda"], $_POST["urlVideo"], $_POST["privacidad"], $_POST["likes"], $_POST["comentarios"], $_POST["compartidos"]);
        
        $publicacion->guardarPublicacion($_GET['idUsuario']);

    break;
    case "GET":  
        if (isset($_GET['idUsuario']) and isset($_GET['idPublicacion'])){
            echo json_encode(Publicacion::obtenerPublicacion($_GET['idUsuario'], $_GET['idPublicacion']));
        }else{
            if (isset($_GET['idUsuario'])){
                echo json_encode(Publicacion::obtenerPublicaciones($_GET['idUsuario']));
            }
            
        }
    break;
    case "PUT":
        $_PUT = json_decode(file_get_contents('php://input'),true);
        //No lo necesitamos.
    break;
    case "DELETE":
        
        echo Publicacion::eliminarPublicacion($_GET['idUsuario'], $_GET['idPublicacion']); 
    break;
}
?>