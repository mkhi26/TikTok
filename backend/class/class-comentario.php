<?php
    class Comentario{
        private $idComentario;
        private $contenidoComentario;
        private $idUsrComentario;

        public function __construct($idComentario, $contenidoComentario, $idUsrComentario){
            $this->idComentario = $idComentario;
            $this->contenidoComentario = $contenidoComentario;
            $this->idUsrComentario = $idUsrComentario;
        }

        public static function obtenerComentario($idUsuario, $idPublicacion, $idComentario){
                include_once("../class/class-publicacion.php");
                $comentarios = Publicacion::obtenerPublicacion($idUsuario,$idPublicacion)["comentarios"];
                for ($i=0; $i < sizeof($comentarios); $i++) { 
                        if($comentarios[$i]["idComentario"] == $idComentario){
                                return $comentarios[$i];
                        }
                }
                return null;
        }

        public function hacerComentario($idUsuario, $idPublicacion){
                $usuarios = json_decode(file_get_contents("../data/usuarios.json"),true);
                for ($i=0; $i < sizeof($usuarios) ; $i++) { 
                        if($usuarios[$i]["idUsuario"] == $idUsuario){
                                $publicaciones = $usuarios[$i]["publicaciones"];
                                for ($j=0; $j < sizeof($publicaciones) ; $j++) { 
                                        if($publicaciones[$j]["idPublicacion"] == $idPublicacion){
                                                $comentario = array(
                                                        "idComentario"=> sizeof($publicaciones[$j]["comentarios"]),
                                                        "contenidoComentario"=> $this->contenidoComentario,
                                                        "idComentario"=> $this->idUsrComentario
                                                );
                                                $publicaciones[$j]["comentarios"][]=$comentario;
                                                $usuarios[$i]["publicaciones"]= $publicaciones;
                                        }
                                }
                        }
                }
                $archivo = fopen("../data/usuarios.json", "w");
                fwrite($archivo,json_encode($usuarios));
                fclose($archivo);
        }

        public static function obtenerComentarios($idUsuario, $idPublicacion){
                include_once("../class/class-publicacion.php");
                return Publicacion::obtenerPublicacion($idUsuario,$idPublicacion)["comentarios"];

        }

    

        /**
         * Get the value of idComentario
         */ 
        public function getIdComentario()
        {
                return $this->idComentario;
        }

        /**
         * Set the value of idComentario
         *
         * @return  self
         */ 
        public function setIdComentario($idComentario)
        {
                $this->idComentario = $idComentario;

                return $this;
        }

        /**
         * Get the value of contenidoComentario
         */ 
        public function getContenidoComentario()
        {
                return $this->contenidoComentario;
        }

        /**
         * Set the value of contenidoComentario
         *
         * @return  self
         */ 
        public function setContenidoComentario($contenidoComentario)
        {
                $this->contenidoComentario = $contenidoComentario;

                return $this;
        }

        /**
         * Get the value of idUsrComentario
         */ 
        public function getIdUsrComentario()
        {
                return $this->idUsrComentario;
        }

        /**
         * Set the value of idUsrComentario
         *
         * @return  self
         */ 
        public function setIdUsrComentario($idUsrComentario)
        {
                $this->idUsrComentario = $idUsrComentario;

                return $this;
        }
    }

?>