<?php
include('class-usuario.php');
    class Login {
        private $correoUsuario;
        private $contrasena;
        private $admi;


        public function __construct($correoUsuario, $contrasena, $admi){

            $this->correoUsuario = $correoUsuario;
            $this->contrasena = $contrasena;
            $this->admi = $admi;


        }

        public function verificarUsuario(){

            $correoUsuario = $this->correoUsuario;
            $contrasena = $this->contrasena;
            $admi = $this->admi;
            if($admi == "true"){

            }else{
                $usuarios = Usuario::obtenerUsuarios();
                for ($i=0; $i < sizeof($usuarios) ; $i++) { 
                    if($usuarios[$i]["correoElectronico"] == $correoUsuario or $usuarios[$i]["nombreUsuario"] == $correoUsuario){
                        if($usuarios[$i]["contrasena"] == sha1($contrasena)){
                            return $usuarios[$i];
                        }
                        return null;
                    }
                }
                return null;
            }

        }
        

        /**
         * Get the value of correoUsuario
         */ 
        public function getCorreoUsuario()
        {
                return $this->correoUsuario;
        }

        /**
         * Set the value of correoUsuario
         *
         * @return  self
         */ 
        public function setCorreoUsuario($correoUsuario)
        {
                $this->correoUsuario = $correoUsuario;

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
         * Get the value of admi
         */ 
        public function getAdmi()
        {
                return $this->admi;
        }

        /**
         * Set the value of admi
         *
         * @return  self
         */ 
        public function setAdmi($admi)
        {
                $this->admi = $admi;

                return $this;
        }
    }



?>