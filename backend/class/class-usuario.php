<?php

    class Usuario{
        private $idUsuario;
        private $nombre;
        private $apellido;
        private $nombreUsuario;
        private $correoElectronico;
        private $contrasena;
        private $imagen;
        private $siguiendo;
        private $seguidores;
        private $meGustas;
        private $publicaciones;

        public function __construct($idUsuario, $nombre, $apellido, $nombreUsuario, $correoElectronico, $contrasena, $imagen, $siguiendo, $seguidores, $meGustas, $publicaciones){
            $this->idUsuario = $idUsuario;
            $this->nombre = $nombre;
            $this->apellido = $apellido;
            $this->nombreUsuario = $nombreUsuario;
            $this->correoElectronico = $correoElectronico;
            $this->contrasena = sha1($contrasena);
            $this->imagen = $imagen;
            $this->siguiendo = $siguiendo;
            $this->seguidores = $seguidores;
            $this->meGustas = $meGustas;
            $this->publicaciones = $publicaciones; 
            

        }

        public static function siguiendo($idUsuario, $idSeguido){
                $usuariosSeguidos = self::obtenerUsuarioPorId($idUsuario)["siguiendo"];
                for ($i=0; $i < sizeof($usuariosSeguidos) ; $i++) { 
                        if($usuariosSeguidos[$i] == $idSeguido){
                                return true;
                        }
                }
                return false;

        }


        public function guardarUsuario(){

                $usuario = array(
                        "idUsuario"=> sizeof(self::obtenerUsuarios()),
                        "nombre"=> $this->nombre,
                        "apellido"=> $this->apellido,
                        "nombreUsuario"=> $this->nombreUsuario,
                        "correoElectronico"=> $this->correoElectronico,
                        "contrasena"=> $this->contrasena,
                        "imagen"=> $this->imagen,
                        "siguiendo"=> $this->siguiendo,
                        "seguidores"=> $this->seguidores,
                        "meGustas"=> $this->meGustas,
                        "publicaciones"=> $this->publicaciones,
                );
                $usuarios = json_decode(file_get_contents("../data/usuarios.json"), true);
                $usuarios[]=$usuario;
                $archivo = fopen("../data/usuarios.json","w");
                fwrite($archivo, json_encode($usuarios));
                fclose($archivo);
                return true;

        }

        public static function seguirUsuario($idUsuario, $idUsuarioSeguir){
                $usuarios = self::obtenerUsuarios();
                $seguido = $usuarios[self::obtenerIndice($idUsuarioSeguir)];
                $seguidor = $usuarios[self::obtenerIndice($idUsuario)];
                
                $strSiguiendo = "";

                if(in_array($idUsuario,$seguido["seguidores"])){

                        for ($i=0; $i < sizeof($seguido["seguidores"]); $i++) { 
                                if($seguido["seguidores"][$i] == $idUsuario){
                                        array_splice($seguido["seguidores"],$i,1);

                                }
                        }
                        for ($i=0; $i < sizeof($seguidor["siguiendo"]); $i++) { 
                                if($seguidor["siguiendo"][$i] == $idUsuarioSeguir){
                                        array_splice($seguidor["siguiendo"],$i,1);

                                }
                        }
                        $strSiguiendo = "Seguir";
                }else{
                        array_push($seguido["seguidores"],$idUsuario);
                        array_push($seguidor["siguiendo"],$idUsuarioSeguir);
                        $strSiguiendo = "Siguiendo";
                        
                }
                $usuarios[self::obtenerIndice($idUsuarioSeguir)] = $seguido;
                $usuarios[self::obtenerIndice($idUsuario)] = $seguidor;

                $archivo = fopen("../data/usuarios.json","w");
                fwrite($archivo,json_encode($usuarios));
                fclose($archivo);

                return $strSiguiendo;
        }
        public function actualizarUsuario($idUsuario){
                $usuario = array(
                        "idUsuario"=> $this->idUsuario,
                        "nombre"=> $this->nombre,
                        "apellido"=> $this->apellido,
                        "nombreUsuario"=> $this->nombreUsuario,
                        "correoElectronico"=> $this->correoElectronico,
                        "contrasena"=> $this->contrasena,
                        "imagen"=> $this->imagen,
                        "siguiendo"=> $this->siguiendo,
                        "seguidores"=> $this->seguidores,
                        "meGustas"=> $this->meGustas,
                        "publicaciones"=> $this->publicaciones,
                );
                $usuarios = json_decode(file_get_contents("../data/usuarios.json"), true);
                for ($i=0; $i < sizeof($usuarios); $i++) { 
                        if($usuarios[$i]["idUsuario"]== $idUsuario){
                                $usuarios[$i]= $usuario;
                        }
                }
                $archivo = fopen("../data/usuarios.json","w");
                fwrite($archivo, json_encode($usuarios));
                fclose($archivo);
                return true;

        }

        public static function obtenerUsuarioPorCorreo($correoElectronico){
                $usuarios = json_decode(file_get_contents('../data/usuarios.json'),true);
                for ($i=0; $i < sizeof($usuarios); $i++) { 
                        if($usuarios[$i]["correoElectronico"]== $correoElectronico){
                                return $usuarios[$i];
                        }
                }
                return null;
        }
        public static function obtenerUsuarioPorId($idUsuario){
                $usuarios = json_decode(file_get_contents('../data/usuarios.json'),true);
                for ($i=0; $i < sizeof($usuarios); $i++) { 
                        if($usuarios[$i]["idUsuario"]== $idUsuario){
                                return $usuarios[$i];
                        }
                }
                return null;
        }

        public static function obtenerIndice($idUsuario){
                $contenidoArchivo = file_get_contents("../data/usuarios.json");
                $usuarios = json_decode($contenidoArchivo, true);
                for ($i=0; $i < sizeof($usuarios); $i++) { 
                        if($usuarios[$i]["idUsuario"] == $idUsuario){
                                return $i;
                        }
                }
                return null;
        }

        public static function eliminarUsuario($idUsuario) {
                $indice = self::obtenerIndice($idUsuario);
                if($indice){
                        $contenidoArchivo = file_get_contents("../data/usuarios.json");
                        $usuarios = json_decode($contenidoArchivo, true);
                        array_splice($usuarios,$indice,1);/*tercer parametro es la cantidad de elementos que va a borrar del indice en adelante*/
                        $archivo = fopen('../data/usuarios.json', 'w');
                        fwrite($archivo, json_encode($usuarios));
                        fclose($archivo);
                        return true;

                }
                return false;
            }

        public static function obtenerUsuarios(){
                $usuarios = json_decode(file_get_contents("../data/usuarios.json"), true);
                return $usuarios;
        }

        public static function obtenerUsuariosSeguidos($idUsuario){
                $idsUsuariosSeguidos =  self::obtenerUsuarioPorId($idUsuario)["siguiendo"];
                
                $usuariosSeguidos = [];
                for ($i=0; $i < sizeof($idsUsuariosSeguidos) ; $i++) { 
                        $usuariosSeguidos[]= self::obtenerUsuarioPorId($idsUsuariosSeguidos[$i]);
                }
                return $usuariosSeguidos;

        }
        

        /**
         * Get the value of idUsuario
         */ 
        public function getIdUsuario()
        {
                return $this->idUsuario;
        }

        /**
         * Set the value of idUsuario
         *
         * @return  self
         */ 
        public function setIdUsuario($idUsuario)
        {
                $this->idUsuario = $idUsuario;

                return $this;
        }

        /**
         * Get the value of nombre
         */ 
        public function getNombre()
        {
                return $this->nombre;
        }

        /**
         * Set the value of nombre
         *
         * @return  self
         */ 
        public function setNombre($nombre)
        {
                $this->nombre = $nombre;

                return $this;
        }

        /**
         * Get the value of apellido
         */ 
        public function getApellido()
        {
                return $this->apellido;
        }

        /**
         * Set the value of apellido
         *
         * @return  self
         */ 
        public function setApellido($apellido)
        {
                $this->apellido = $apellido;

                return $this;
        }

        /**
         * Get the value of nombreUsuario
         */ 
        public function getNombreUsuario()
        {
                return $this->nombreUsuario;
        }

        /**
         * Set the value of nombreUsuario
         *
         * @return  self
         */ 
        public function setNombreUsuario($nombreUsuario)
        {
                $this->nombreUsuario = $nombreUsuario;

                return $this;
        }

        /**
         * Get the value of imagen
         */ 
        public function getImagen()
        {
                return $this->imagen;
        }

        /**
         * Set the value of imagen
         *
         * @return  self
         */ 
        public function setImagen($imagen)
        {
                $this->imagen = $imagen;

                return $this;
        }

        /**
         * Get the value of siguiendo
         */ 
        public function getSiguiendo()
        {
                return $this->siguiendo;
        }

        /**
         * Set the value of siguiendo
         *
         * @return  self
         */ 
        public function setSiguiendo($siguiendo)
        {
                $this->siguiendo = $siguiendo;

                return $this;
        }

        /**
         * Get the value of seguidores
         */ 
        public function getSeguidores()
        {
                return $this->seguidores;
        }

        /**
         * Set the value of seguidores
         *
         * @return  self
         */ 
        public function setSeguidores($seguidores)
        {
                $this->seguidores = $seguidores;

                return $this;
        }

        /**
         * Get the value of meGustas
         */ 
        public function getMeGustas()
        {
                return $this->meGustas;
        }

        /**
         * Set the value of meGustas
         *
         * @return  self
         */ 
        public function setMeGustas($meGustas)
        {
                $this->meGustas = $meGustas;

                return $this;
        }

        /**
         * Get the value of publicaciones
         */ 
        public function getPublicaciones()
        {
                return $this->publicaciones;
        }

        /**
         * Set the value of publicaciones
         *
         * @return  self
         */ 
        public function setPublicaciones($publicaciones)
        {
                $this->publicaciones = $publicaciones;

                return $this;
        }

        /**
         * Get the value of contrasena
         */ 
        public function getContrasena()
        {
                return $this->contrasena;
        }

        /**
         * Set the value of contrasena
         *
         * @return  self
         */ 
        public function setContrasena($contrasena)
        {
                $this->contrasena = $contrasena;

                return $this;
        }

        /**
         * Get the value of correoElectronico
         */ 
        public function getCorreoElectronico()
        {
                return $this->correoElectronico;
        }

        /**
         * Set the value of correoElectronico
         *
         * @return  self
         */ 
        public function setCorreoElectronico($correoElectronico)
        {
                $this->correoElectronico = $correoElectronico;

                return $this;
        }
    }

?>