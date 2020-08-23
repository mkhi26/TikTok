<?php
session_start();
header("Content-Type: application/json");
include_once("../class/class-login.php");

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'),true);
        
        $login= new Login($_POST["correo"], $_POST["contrasena"], $_POST["admi"]);
        $usuario = $login->verificarUsuario();
        if($usuario){
            
            $token = sha1(uniqid(rand(),true));
            $_SESSION["token"] = $token;
            $usuario["token"]= $token;
            setcookie("token",$token, time()+(60*60*24*31),"/");
            setcookie("idUsuario",$usuario["idUsuario"], time()+(60*60*24*31),"/");
            echo json_encode($usuario);
        }else{
            setcookie("token","",time()-1,"/");
            setcookie("idUsuario","",time()-1,"/");
            echo json_encode(null);
        }

    break;

}
?>