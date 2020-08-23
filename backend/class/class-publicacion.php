<?php
    class Publicacion{
        private $idPublicacion;
        private $leyenda;
        private $urlVideo;
        private $privacidad;
        private $likes;
        private $comentarios;
        private $compartidos;

        public function __construct($idPublicacion, $leyenda, $urlVideo, $privacidad, $likes, $comentarios, $compartidos){
            $this->idPublicacion = $idPublicacion;
            $this->leyenda = $leyenda;
            $this->urlVideo = $urlVideo;
            $this->privacidad = $privacidad;
            $this->likes = $likes;
            $this->comentarios = $comentarios;
            $this->compartidos = $compartidos;    

        }

        public static function obtenerPublicacion($idUsuario, $idPublicacion){
                include_once('../class/class-usuario.php');
                $publicaciones = Usuario::obtenerUsuarioPorId($idUsuario)["publicaciones"];
        
                for ($i=0; $i < sizeof($publicaciones); $i++) { 
                        if($publicaciones[$i]["idPublicacion"]==$idPublicacion){
                                return $publicaciones[$i];
                        }
                }
                return null;
                
        }
        public static function obtenerPublicaciones($idUsuario){
                include_once('../class/class-usuario.php');
                return Usuario::obtenerUsuarioPorId($idUsuario)["publicaciones"];
        }
        public function guardarPublicacion($idUsuario){
                $publicacion = array(
                        "idPublicacion" => sizeof(self::obtenerPublicaciones($idUsuario)),
                        "leyenda" => $this->leyenda,
                        "urlVideo" => $this->urlVideo,
                        "privacidad" => $this->privacidad,
                        "likes" => $this->likes,
                        "comentarios" => $this->comentarios,
                        "compartidos" => $this->compartidos

                );
                include_once('../class/class-usuario.php');
                $usuario = Usuario::obtenerUsuarioPorId($idUsuario);
                $usuario["publicaciones"][]= $publicacion;

                $idUsuario = $usuario["idUsuario"];
                $nombre = $usuario["nombre"];
                $apellido = $usuario["apellido"];
                $nombreUsuario = $usuario["nombreUsuario"];
                $correoElectronico = $usuario["correoElectronico"];
                $contrasena  = $usuario["contrasena"];
                $imagen = $usuario["imagen"];
                $siguiendo = $usuario["siguiendo"];
                $seguidores = $usuario["seguidores"];
                $meGustas  = $usuario["meGustas"];
                $publicaciones = $usuario["publicaciones"];

                $usuarioActualizado = new Usuario($idUsuario, $nombre, $apellido, $nombreUsuario, $correoElectronico, $contrasena, $imagen, $siguiendo, $seguidores, $meGustas, $publicaciones);
                
                $usuarioActualizado->actualizarUsuario($idUsuario);
                
                return true;
        }

        public static function obtenerIndice($idUsuario, $idPublicacion){
                include_once('../class/class-usuario.php');
                $publicaciones = Usuario::obtenerUsuarioPorId($idUsuario)["publicaciones"];
                for ($i=0; $i < sizeof($publicaciones); $i++) { 
                        if($publicaciones[$i]["idPublicacion"] == $idPublicacion){
                                return $i;
                        }
                }
                return null;

        
        }

        public static function eliminarPublicacion($idUsuario, $idPublicacion){
                include_once('../class/class-usuario.php');
                $indice = self::obtenerIndice($idUsuario, $idPublicacion);

                
                $usuarios = Usuario::obtenerUsuarios();
                for ($i=0; $i < sizeof($usuarios); $i++) { 
                        if($usuarios[$i]["idUsuario"]== $idUsuario){
                                
                                for ($j=0; $j < sizeof($usuarios[$i]["publicaciones"]); $j++) {
                                        
                                        if($usuarios[$i]["publicaciones"][$j]["idPublicacion"] == $idPublicacion){
                                                $comentarioEliminado  = $usuarios[$i]["publicaciones"][$indice];
                                                array_splice($usuarios[$i]["publicaciones"],$indice,1);/*tercer parametro es la cantidad de elementos que va a borrar del indice en adelante*/
                                                $archivo = fopen('../data/usuarios.json', 'w');
                                                fwrite($archivo, json_encode($usuarios));
                                                fclose($archivo);
                                                return json_encode($comentarioEliminado);
                                        }
                                }

                        }
                }
                return null;
        }

        /**
         * Get the value of leyenda
         */ 
        public function getLeyenda()
        {
                return $this->leyenda;
        }

        /**
         * Set the value of leyenda
         *
         * @return  self
         */ 
        public function setLeyenda($leyenda)
        {
                $this->leyenda = $leyenda;

                return $this;
        }

        /**
         * Get the value of urlVideo
         */ 
        public function getUrlVideo()
        {
                return $this->urlVideo;
        }

        /**
         * Set the value of urlVideo
         *
         * @return  self
         */ 
        public function setUrlVideo($urlVideo)
        {
                $this->urlVideo = $urlVideo;

                return $this;
        }

        /**
         * Get the value of privacidad
         */ 
        public function getPrivacidad()
        {
                return $this->privacidad;
        }

        /**
         * Set the value of privacidad
         *
         * @return  self
         */ 
        public function setPrivacidad($privacidad)
        {
                $this->privacidad = $privacidad;

                return $this;
        }

        /**
         * Get the value of likes
         */ 
        public function getLikes()
        {
                return $this->likes;
        }

        /**
         * Set the value of likes
         *
         * @return  self
         */ 
        public function setLikes($likes)
        {
                $this->likes = $likes;

                return $this;
        }

        /**
         * Get the value of comentarios
         */ 
        public function getComentarios()
        {
                return $this->comentarios;
        }

        /**
         * Set the value of comentarios
         *
         * @return  self
         */ 
        public function setComentarios($comentarios)
        {
                $this->comentarios = $comentarios;

                return $this;
        }

        /**
         * Get the value of compartidos
         */ 
        public function getCompartidos()
        {
                return $this->compartidos;
        }

        /**
         * Set the value of compartidos
         *
         * @return  self
         */ 
        public function setCompartidos($compartidos)
        {
                $this->compartidos = $compartidos;

                return $this;
        }

        /**
         * Get the value of idPublicacion
         */ 
        public function getIdPublicacion()
        {
                return $this->idPublicacion;
        }

        /**
         * Set the value of idPublicacion
         *
         * @return  self
         */ 
        public function setIdPublicacion($idPublicacion)
        {
                $this->idPublicacion = $idPublicacion;

                return $this;
        }
    }

?>