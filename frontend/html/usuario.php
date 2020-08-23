<?php
  
    session_start();
    if(!isset($_SESSION["token"])){
        header("Location: foryou.html");
    }
    if(!isset($_COOKIE["token"])){
        header("Location: foryou.html");
    }
    if($_SESSION["token"] != $_COOKIE["token"]){
        header("Location: foryou.html");
    } 
?>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/all.css">
    <script src="../js/all.js"></script>
    <link rel="stylesheet" href="../css/estilos.css">

    <title>TikTok</title>
  </head>
  <body>


  <nav class="navbar navbar-expand-lg navbar-light bg-light pl-4 fixed-nav">
        <a class="navbar-brand pl-1" style="margin-right: auto!important;" href="#">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <img src="../img/logo-dark.svg" alt="">
            <img src="../img/txt-dark-tiktok.svg" alt="">
        </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div id= "contenedor-usuario" style="margin-left: auto;">
            <a href="../html/upload.html"><i class="fas fa-cloud-upload-alt subir-video mr-5"></i></a>
              <img src="../img/recursos/usuario-0.png" style="width: 40px;" alt="">
          </div>
        </div>  
    </nav>
    <hr>
    <main id="inicio" >
        <div class="row ">
            <div id="" class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2  ">
                <div class="row menu-panel-izquierdo pl-4 d-none d-lg-block d-xl-block fixed ">
                    <div class="col-12 ml-2 pb-4">
                        
                        <samp class="pl-3">
                            <i class="fas fa-home" style="color: #000000; font-size: 25px;"></i>
                            <a id="txt-para-ti" style="color:black;" href="foryou.php">Para ti</a>
                            
                        </samp>

                    </div>

                    <div class="col-12 ml-2">
                        <samp class="pl-3">
                            <i class="fas fa-user-friends" style="font-size: 30px;"></i>
                            <a  id="txt-tendencias" href="">Siguiendo</a>
                        </samp>
                    </div>
                    <hr>
                    <div class="col-12">
                        <samp class="pl-3">

                            <p class="parrafo-panel-izquierdo ml-4 ">Las cuentas que mas sigues</p>
                        </samp>
                    </div>
                    <div class="col-12" id="cuentas-seguidas">

                        <table class=" mb-0" id="cuentas-seguidas">
                            <!--Aqui inician las cuentas Que sigues-->
                        </table>           
                    </div>
                    <div class="col-12 ml-2 ">
                        <samp class="">
                           <a class="otras-referencias" href="#">Inicio</a>
                           <a class="otras-referencias" href="#">Acerca de</a>
                           <a class="otras-referencias" href="#">Sala de prensa</a>
                           <a class="otras-referencias" href="#">Vacantes</a>
                           <a class="otras-referencias" href="#">ByteDance</a>
                        </samp>
                    </div>
                    <div class="col-12 ml-2 pt-4">
                        <samp class="">
                           <a class="otras-referencias" href="#">Ayuda</a>
                           <a class="otras-referencias" href="#">Seguridad</a>
                        </samp>
                    </div>
                    <div class="col-12 ml-1">
                        <samp class="">
                           <a class="otras-referencias" href="#">Normas de la comunidad</a>
                           <a class="otras-referencias" href="#">Términos</a>
                        </samp>
                    </div>
                    <div class="col-12 ml-1">
                        <samp class="">
                           <a class="otras-referencias" href="#">Privacidad</a>
                        </samp>
                    </div>
                    <div class="col-12 ml-1 pb-4">
                        <samp class="otras-referencias">© 2020 TikTok</samp>
                    </div>
                    <div class="col-12 ml-2 ml-1">
                        <div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle drp-idioma otras-referencias" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width: 70%;">Español</a>
                          
                            <div class="dropdown-menu " aria-labelledby="dropdownMenuLink">
                              <a class="dropdown-item otras-referencias" href="#">Ingles</a>
                              <a class="dropdown-item otras-referencias" href="#">Ruso</a>
                              <a class="dropdown-item otras-referencias" href="#">Chino</a>
                            </div>
                          </div>
                    </div>

                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-3 " id="usuario">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 ml-4" id="imagen-usuario">
                       
                    </div>
                    <div class="col-6" id="datos-usuario">

                    </div>

                </div>
                <div class="row ml-4 mt-5">
                    <div class="col-12 ml-2" id="publicaciones">
                       
                    </div>
                </div>
                
            </div>

            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div class="row">
                    <div class="col-1 ml-2">
                        <i class="fab fa-facebook" style="color: #1777f2; font-size: 30px; cursor: pointer;"></i>
                    </div>
                    <div class="col-1 ml-2">
                        <i class="fab fa-pinterest"style="color: #e73d3a; font-size: 30px; cursor: pointer;" ></i>
                    </div>
                    <div class="col-1 ml-2">
                        <img src="../img/recursos/twitter.svg" alt="" style="cursor: pointer;">
                    </div>
                </div>

                <div class="row pt-4 mb-5">
                    <div class="col-12">
                        <div class="card  " style="width: 95%; height: 380px;">
                            
                            <h5 class="card-title titulo-tendencias">Cuentas recomendadas</h5>
                            <div class="card-body table-wrapper-scroll-y my-custom-scrollbar">
                                <table class=" mb-0" id="cuentas-recomendadas">
                                    <!--Aqui inician las cuentas recomendadas-->
                              </table>           
                            </div>
                          </div>
                    </div>
                    <!--Tendencias-->
                    <div class="col-12 pt-5">
                        <div class="card  " style="width: 95%; height: 380px;">                       
                            <h5 class="card-title titulo-tendencias">Tendencias</h5>
                            <div class="card-body table-wrapper-scroll-y my-custom-scrollbar">
                                <table class=" mb-0" id="tendencias">
                                    <!--Aqui inician las cuentas tendencias-->
                                </table>
                            </div>
                            
                        </div>
                    </div>

                    <div class="col-12">

      
                        <div class="row tienda-apps">
                            <div class="col-6 pt-3 pl-5">
                                <a href="#"><img class="" id="img-app-store" src="../img/app-store-1.png" alt=""></a>
                            </div>
                
                            <div class="col-6 pt-3">
                                <a href="#"><img id="img-play-store" class="" src="../img/play-store-1.png" alt=""></a>
                            </div>
                            <div class="col-6 pt-3 pl-5">
                                <a href="#"><img id="img-amazon-app-store" class="pb-5" src="../img/amazon-app-store-1.png" alt=""></a>
                            </div>
                        </div>    
                    </div>

                    <div class="col-12">
                        <div class="img-upload"><a href="#"><img src="../img/recursos/upload.svg" alt=""></a></div>
                    </div>

                </div>
            </div>
        </div>

    </main>







<!-- Optional JavaScript -->



    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/axios.min.js"></script>
    <script src="../js/controlador_usuario.js"></script>

  </body>
</html>