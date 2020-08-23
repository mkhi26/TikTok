<?php
header("Content-Type: application/json");
include_once("../class/class-usuario.php");

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'),true);
        $usuario = new Usuario($_POST["idUsuario"], $_POST["nombre"], $_POST["apellido"], $_POST["nombreUsuario"], $_POST["correoElectronico"], $_POST["contrasena"],$_POST["imagen"], $_POST["siguiendo"], $_POST["seguidores"], $_POST["meGustas"], $_POST["publicaciones"]);
        echo $usuario->guardarUsuario();

    break;
    case "GET":
        if(isset($_GET['getSeguidores']) and isset($_GET['idUsuario'])){
            echo json_encode(Usuario::obtenerUsuariosSeguidos($_GET['idUsuario']));

        }elseif (isset($_GET['idUsuario'])){
            echo json_encode(Usuario::obtenerUsuarioPorId($_GET['idUsuario']));
        }elseif (isset($_GET['correoElectronico'])) {
            echo json_encode(Usuario::obtenerUsuarioPorCorreo($_GET['correoElectronico']));
        }else{
            echo json_encode(Usuario::obtenerUsuarios());
        }
    break;
    case "PUT":

        $_PUT = json_decode(file_get_contents('php://input'),true);
        $usuario = new Usuario($_PUT["idUsuario"], $_PUT["nombre"], $_PUT["apellido"], $_PUT["nombreUsuario"], $_PUT["correoElectronico"], $_PUT["contrasena"],$_PUT["imagen"], $_PUT["siguiendo"], $_PUT["seguidores"], $_PUT["meGustas"], $_PUT["publicaciones"]);
        $usuario->actualizarUsuario($_GET['idUsuario']);

    break;
    case "DELETE":
        Usuario::eliminarUsuario($_GET['idUsuario']); 

    break;
}
?>