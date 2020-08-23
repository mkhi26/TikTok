$('#customFileLang').on('change',function(){
    //get the file name
    var fileName = $(this).val();
    //replace the "Choose a file" label
    tamaño =  fileName.split("\\").length;
    fileName = "../img/recursos/"+ fileName.split("\\")[tamaño-1]
    fileName = `<h6 id="url-video">${fileName}</h6>`
    console.log(fileName);

    $(this).next('.custom-file-label').html(fileName);
})
var privacidad = "";
var comentario = false;
var duo = false;

var idUsuario = readCookie("idUsuario");
var inicioSesion = false;
if(idUsuario){
    this.inicioSesion = true;
    cambiarUsuario(idUsuario);
}else{
    generearPublicaciones();
}
console.log(idUsuario);

function setPrivacidad(privacidad){
    this.privacidad = privacidad;
}

function setComentario(boleano){
    if(this.comentario){
        this.comentario = false;
    }else{
        this.comentario = true;
    }

}

function setDuos(boleano){
    if(this.duo){
        this.duo = false;
    }else{
        this.duo = true;
    }
}

function cambiarUsuario(idUsuario){

    axios({
        method: 'GET',
        url: `../../backend/api/usuarios.php?idUsuario=${idUsuario}`,
        responseType: 'json'
    }).then(res=>{
        usuario = res.data;
        document.getElementById("contenedor-usuario").innerHTML =
        `
        <a href="../html/upload.html"><i class="fas fa-cloud-upload-alt subir-video mr-5"></i></a>
        <div style="cursor: pointer;" class="btn-group dropleft">
        <img  class="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src="${usuario.imagen}" style="width: 40px; border-radius:50%" alt="">
        <div class="dropdown-menu">
            <a class="dropdown-item" href="usuario.php">Ver perfil</a>
            <a class="dropdown-item" href="logout.php">cerrar sesión</a>
        </div>
      </div>
        `
        document.getElementById("mensaje-cargar").innerHTML = `<h5 class="subtitulo">Este video se publicara en @${usuario.nombreUsuario} </h5>`
    }).catch(error=>{
        console.error(error); 
    });
}

function publicar(){
    let idPublicacion = -1;
    let leyenda = document.getElementById("txt-leyenda").value;
    let urlVideo = document.getElementById("url-video").innerHTML;
    let privacidad = [this.privacidad, this.comentario, this.duo];
    let likes = [];
    let comentarios = [];
    let compartidos = [];

    publicacion = {
        "idPublicacion":idPublicacion,
        "leyenda": leyenda,
        "urlVideo":urlVideo,
        "privacidad":privacidad,
        "likes":likes,
        "comentarios":comentarios,
        "compartidos":compartidos
    };

    axios({
        method: 'post',
        url: `../../backend/api/publicaciones.php`,
        responseType: 'json',
        data:publicacion
    }).then(res=>{
        window.location
    }).catch(error=>{ //si
        console.error(error); 
    });
    window.location="usuario.php";
    
}
function readCookie(nombre) {

    var nombreEQ = nombre + "="; 
    var ca = document.cookie.split(';');
  
    for(var i=0;i < ca.length;i++) {
  
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nombreEQ) == 0) {
        return decodeURIComponent( c.substring(nombreEQ.length,c.length) );
      }
  
    }
  
    return null;
  
  }