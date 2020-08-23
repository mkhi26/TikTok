

var idUsuario = readCookie("idUsuario");
var inicioSesion = false;
if(idUsuario){
    console.log(idUsuario);
    this.inicioSesion = true;
    this.cambiarUsuario(idUsuario);
}else{
    console.log("No");
    generearPublicaciones();
}
var inicio = false;




/*
    axios({
        method: 'GET',
        url: url,
        responseType: 'json' //el tipo de la respuesta
    }).then(res=>{
        console.log(res.data); //aqui solo retorna la data
        this.usuarios = res.data;
        llenarTabla();
    }).catch(error=>{ //si
        console.error(error); 
    });

*/

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

function login(){
    axios({
        method: 'post',
        url: `../../backend/api/login.php`,
        responseType: 'json',
        data:{
            correo: document.getElementById("correo-usuario").value,
            contrasena: document.getElementById("contrasena").value,
            admi:"false"
        }
    }).then(res=>{
        console.log(res.data);
        if(res.data){
            console.log("Inicio de sesión correcto");
            window.location.href = "foryou.php";
        }else{
            document.getElementById("error").style.display = 'block';
            document.getElementById("error").innerHTML = "Correo o contraseña incorrectos"; 
        }

    }).catch(error=>{
        console.error(error); 
    });

}

function loginParaRegistro(credenciales){
    axios({
        method: 'post',
        url: `../../backend/api/login.php`,
        responseType: 'json',
        data:credenciales
    }).then(res=>{
        console.log(res.data);
        if(res.data){
            console.log("Inicio de sesión correcto");
            window.location.href = "foryou.php";
        }else{
            document.getElementById("error").style.display = 'block';
            document.getElementById("error").innerHTML = "Correo o contraseña incorrectos"; 
        }

    }).catch(error=>{
        console.error(error); 
    });

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
        generearPublicacionesSeguidos(idUsuario);
    }).catch(error=>{
        console.error(error); 
    });


}


function generearPublicacionesSeguidos(idUsuario = this.idUsuario){
    document.getElementById("publicaciones").innerHTML ="";
    console.log("Se generararan las publicaciones de los usuarios a los que sigues");
    axios({
        method: 'GET',
        url: `../../backend/api/usuarios.php?getSeguidores=true&idUsuario=${idUsuario}`,
        responseType: 'json'
    }).then(res=>{
        usuariosSeguidos = res.data;

        for (let i = 0; i < usuariosSeguidos.length; i++) {
            let imgUsuario = usuariosSeguidos[i]["imagen"];
            let nombre = `${usuariosSeguidos[i].nombre} ${usuariosSeguidos[i].apellido}`;
            let nombreUsuario = "@"+usuariosSeguidos[i].nombreUsuario;
            ultimoIndice = usuariosSeguidos[i].publicaciones.length;
            if(ultimoIndice > 0){
                let descripcion = usuariosSeguidos[i].publicaciones[ultimoIndice-1].leyenda;
                let sonido = "sonido original - "+ nombre;
                let video = usuariosSeguidos[i].publicaciones[ultimoIndice-1].urlVideo;
                let idSeguir = usuariosSeguidos[i].idUsuario
                let strSeguir = "seguir";

                const comentarios = usuariosSeguidos[i].publicaciones[ultimoIndice-1].comentarios;
                const compartidos =usuariosSeguidos[i].publicaciones[ultimoIndice-1].compartidos;
                const likes = usuariosSeguidos[i].publicaciones[ultimoIndice-1].likes;
                    axios({
                        method: 'GET',
                        url: `../../backend/api/usuarios.php?idUsuario=${this.idUsuario}`,
                        responseType: 'json'
                    }).then(res=>{               
                        siguiendo = res.data.siguiendo;
                        for(let i = 0; i < siguiendo.length; i++){
                            if(siguiendo[i] == idSeguir){
                                strSeguir = "Siguiendo"   
                            }
                        }
                        
                        document.getElementById("publicaciones").innerHTML +=
                        `
                        <div class="row">
                        <div class="col-2 col-lg-1 col-xl-1 ml-2">
                            <img src="${imgUsuario}" style="width: 60px; height: 60px; border-radius: 50%;" alt="">
                        </div>
                        <div class="col-6 col-lg-8 col-xl-8">
                            <div class="row">
                                <div class="col-12"><h6 class="usuario ml-3">${nombreUsuario}</h6></div>
                                <div class="col-12"><h6 class="usuario ml-3">${nombre}</h6></div>
                                <div class="col-12"><h6 class="descripcion-video ml-3">${descripcion}</h6></div>
                                <div class="col-1 pt-2"><i class="fas fa-music ml-3"></i></div>
                                <div class="col-11 pt-2 pl-0"><a href="#"><h6 class="descripcion-sonido ml-3">${sonido}</h6></a></div>
                                <div class="col-12">
                                    <div style="margin-left: auto;">
                                        <video class="" controls style="height: 348px; height: 520px; border-radius: 15px; margin-right: auto;" >
                                            <source src="${video}"  type="video/mp4">
                                        </video>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <table>
                                        <tr>
                                            <td><i class="far fa-heart" style="font-size: 30px; cursor: pointer;"></i></td>
                                            <td class="pl-1">${likes.length}</td>
                                            <td><i onclick="$('#modal-comentario').modal('show'); generarComentarios(${usuariosSeguidos[i].idUsuario},${usuariosSeguidos[i].publicaciones[ultimoIndice-1].idPublicacion})" class="far fa-comment-dots ml-3" style="font-size: 30px; cursor: pointer;"></i></td>
                                            <td class="pl-1">${comentarios.length}</td>
                                            <td class="pl-2"><img src="../img/recursos/share.svg" style="width: 30px; cursor: pointer;" alt=""></td>
                                            <td class="pl-1">${compartidos.length}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>               
                        </div>                
                        <div id="seguir-${usuariosSeguidos[i].idUsuario}" class="col-1 col-sm-1 col-md-12 col-lg-2 col-xl-2 ">
                            <input onclick="seguir(${usuariosSeguidos[i].idUsuario});" class="btn btn-outline-danger btn-seguir-usuario" type="button" value="${strSeguir}" >     
                        </div>             
                    </div>
                    <hr>
                        `;
                    }).catch(error=>{
                        console.error(error); 
                    });                
                }
        }
    }).catch(error=>{
        console.error(error); 
    });
    
}

function seguir(idSeguido){
    parametros = {
        "idUsuario": this.idUsuario,
        "idSeguir": idSeguido
    }
    axios({
        method: 'PUT',
        url: `../../backend/api/seguir.php`,
        responseType: 'json', //el tipo de la respuesta
        data:parametros 
    }).then(res=>{
        console.log(idSeguido);
        document.getElementById(`seguir-${idSeguido}`).innerHTML = 

        `
        <input onclick="seguir(${idSeguido})" class="btn btn-outline-danger btn-seguir-usuario" type="button" value="${res.data.strSiguiendo}" >

        `;

        
    }).catch(error=>{ //si
        console.error(error); 
    });

}
function generearPublicaciones(){
    console.log("Se generararan las publicaciones de los usuarios a los que no sigues");
    axios({
        method: 'GET',
        url: `../../backend/api/usuarios.php`,
        responseType: 'json'
    }).then(res=>{
        usuarios = res.data;

        for (let i = 0; i < usuarios.length; i++) {
            let imgUsuario = usuarios[i]["imagen"];
            let nombre = `${usuarios[i].nombre} ${usuarios[i].apellido}`;
            let nombreUsuario = "@"+usuarios[i].nombreUsuario;
            let idActual = usuarios[i].idUsuario;
            ultimoIndice = usuarios[i].publicaciones.length;
            if(idActual != this.idUsuario){

                if(ultimoIndice > 0){
    
                    let descripcion = usuarios[i].publicaciones[ultimoIndice-1].leyenda;
                    let sonido = "sonido original - "+ nombre;
                    let video = usuarios[i].publicaciones[ultimoIndice-1].urlVideo;
    
                    let idSeguir = usuarios[i].idUsuario
    
                    let strSeguir = "seguir";
    
                        axios({
                            method: 'GET',
                            url: `../../backend/api/usuarios.php?idUsuario=${this.idUsuario}`,
                            responseType: 'json'
                        }).then(res=>{
                    
                            siguiendo = res.data.siguiendo;
                            for(let i = 0; i < siguiendo.length; i++){
                                if(siguiendo[i] == idSeguir){
                                    strSeguir = "Siguiendo"   
                                }
                            }
                            document.getElementById("publicaciones").innerHTML += "";
                            document.getElementById("publicaciones").innerHTML +=
                            `
                            <div class="row">
                            <div class="col-2 col-lg-1 col-xl-1 ml-2">
                                <img src="${imgUsuario}" style="width: 60px; height: 60px; border-radius: 50%;" alt="">
                            </div>
                            <div class="col-6 col-lg-8 col-xl-8">
                                <div class="row">
                                    <div class="col-12"><h6 class="usuario ml-3">${nombreUsuario}</h6></div>
                                    <div class="col-12"><h6 class="usuario ml-3">${nombre}</h6></div>
                                    <div class="col-12"><h6 class="descripcion-video ml-3">${descripcion}</h6></div>
                                    <div class="col-1 pt-2"><i class="fas fa-music ml-3"></i></div>
                                    <div class="col-11 pt-2 pl-0"><a href="#"><h6 class="descripcion-sonido ml-3">${sonido}</h6></a></div>
                                    <div class="col-12">
                                        <div style="margin-left: auto;">
                                            <video class="" controls style="height: 348px; height: 520px; border-radius: 15px; margin-right: auto;" >
                                                <source src="${video}"  type="video/mp4">
                                            </video>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <table>
                                            <tr>
                                                <td><i class="far fa-heart" style="font-size: 30px; cursor: pointer;"></i></td>
                                                <td class="pl-1">1234</td>
                                                <td><i onclick="$('#modal-comentario').modal('show'); " class="far fa-comment-dots ml-3" style="font-size: 30px; cursor: pointer;"></i></td>
                                                <td class="pl-1">1234</td>
                                                <td class="pl-2"><img src="../img/recursos/share.svg" style="width: 30px; cursor: pointer;" alt=""></td>
                                                <td class="pl-1">1234</td>
                                            </tr>
                                        </table>
                                    </div>
                                
                                </div>
                    
                            </div>
                    
                            <div id="seguir-${usuarios[i].idUsuario}" class="col-1 col-sm-1 col-md-12 col-lg-2 col-xl-2 ">
                    
                                <input onclick="seguir(${usuarios[i].idUsuario});" class="btn btn-outline-danger btn-seguir-usuario" type="button" value="${strSeguir}" >
                                
                            </div>             
                        </div>
                        <hr>
                            `;
    
    
                        }).catch(error=>{
                            console.error(error); 
                        });                
                    }
            }
            }

    }).catch(error=>{
        console.error(error); 
    });
    
}

function seguir(idSeguido){
    parametros = {
        "idUsuario": this.idUsuario,
        "idSeguir": idSeguido
    }
    axios({
        method: 'PUT',
        url: `../../backend/api/seguir.php`,
        responseType: 'json', //el tipo de la respuesta
        data:parametros 
    }).then(res=>{
        document.getElementById(`seguir-${idSeguido}`).innerHTML = 

        `
        <input onclick="seguir(${idSeguido})" class="btn btn-outline-danger btn-seguir-usuario" type="button" value="${res.data.strSiguiendo}" >

        `;

        
    }).catch(error=>{ //si
        console.error(error); 
    });
    
}

function seguirRecomendacion(idSeguido){
    parametros = {
        "idUsuario": this.idUsuario,
        "idSeguir": idSeguido
    }
    axios({
        method: 'PUT',
        url: `../../backend/api/seguir.php`,
        responseType: 'json', //el tipo de la respuesta
        data:parametros 
    }).then(res=>{

        
    }).catch(error=>{ //si
        console.error(error); 
    });
    
}


function generarCuentasRecomendadas(){

    axios({
        method: 'GET',
        url: `../../backend/api/usuarios.php`,
        responseType: 'json'
    }).then(res=>{
        if(this.idUsuario){
            document.getElementById("cuentas-recomendadas").innerHTML = "";
            for(let i = 0; i < res.data.length; i++){

                axios({
                    method: 'GET',
                    url: `../../backend/api/seguir.php?idUsuario=${this.id}&idSeguir=${res.data[i].idUsuario}`,
                    responseType: 'json'
                }).then(resSeguido=>{
                    
                    strSiguiendo = "Seguir";
 
                    if(resSeguido.data.mensaje){
                        strSiguiendo = "Siguiendo";
                    }

                    if(res.data[i].idUsuario != this.idUsuario){
                        
                        imgPerfil = res.data[i].imagen;
                        nombre = res.data[i].nombre + " " + res.data[i].apellido;
                        usuario = res.data[i].nombreUsuario;
                        document.getElementById("cuentas-recomendadas").innerHTML += `
                        <tr>
                            <td><img src="${imgPerfil}" style="width: 50px; height: 50px; border-radius: 50%;" alt=""></td>
                            <td>
                                <h6 class="usuario pl-2" style="font-size: 17px; font-weight: 600;">${nombre}</h6>
                                <h6 class="pl-2" style="font-size: 10px;" >@${usuario}</h6>
                            </td>
                            <td class=""><input onclick="seguirRecomendacion(${res.data[i].idUsuario}); generarCuentasRecomendadas();" class="btn btn-outline-danger btn-seguir-usuario" type="button" value="${strSiguiendo}" style="margin-left: 95%;"></td>
                        </tr>        
                        
                        `;
                    }
                }).catch(error=>{ 
                    console.error(error); 
                });
    
            }

        }else{
            document.getElementById("cuentas-recomendadas").innerHTML += "";
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].idUsuario != this.idUsuario){
                    imgPerfil = res.data[i].imagen;
                    nombre = res.data[i].nombre + " " + res.data[i].apellido;
                    usuario = res.data[i].nombreUsuario;
                    document.getElementById("cuentas-recomendadas").innerHTML += `
                    <tr>
                        <td><img src="${imgPerfil}" style="width: 50px; height: 50px; border-radius: 50%;" alt=""></td>
                        <td>
                            <h6 class="usuario pl-2" style="font-size: 17px; font-weight: 600;">${nombre}</h6>
                            <h6 class="pl-2" style="font-size: 10px;" >@${usuario}</h6>
                        </td>
                        <td class=""><input class="btn btn-outline-danger btn-seguir-usuario" type="button" value="Seguir" style="margin-left: 95%;"></td>
                    </tr>        
                    
                    `;
                }
    
            }

        }
    }).catch(error=>{ //si
        console.error(error); 
    });
    

}

function generarTendencias(){

    axios({
        method: 'GET',
        url: `../../backend/api/usuarios.php`,
        responseType: 'json'
    }).then(res=>{
        if(this.idUsuario){
            document.getElementById("tendencias").innerHTML += "";
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].idUsuario != this.idUsuario){

                    imgPerfil = res.data[i].imagen;
                    nombre = res.data[i].nombre + " " + res.data[i].apellido;
                    usuario = res.data[i].nombreUsuario;
                    
                    if(res.data[i].seguidores.length>4){
        
                        document.getElementById("tendencias").innerHTML+=`
                    
                        <tr>
                            <td><img src="${imgPerfil}" style="width: 50px; height: 50px; border-radius:15px;" alt=""></td>
                            <td>
                                <h6 class="usuario pl-2" style="font-size: 17px; font-weight: 600;">${nombre}</h6>
                                <h6 class="pl-2" style="font-size: 10px;" >k visualizaciones</h6>
                            </td>
                
                            <td class="flecha-tendencias"><i class="fas fa-chevron-right"></i></td>
                        </tr>        
                        
                        `;
                    }
                }


            }

        }else{
            document.getElementById("tendencias").innerHTML += "";
            for(let i = 0; i < res.data.length; i++){


                    imgPerfil = res.data[i].imagen;
                    nombre = res.data[i].nombre + " " + res.data[i].apellido;
                    usuario = res.data[i].nombreUsuario;
                    
                    if(res.data[i].seguidores.length>4){
        
                        document.getElementById("tendencias").innerHTML+=`
                    
                        <tr>
                            <td><img src="${imgPerfil}" style="width: 50px; height: 50px; border-radius:15px;" alt=""></td>
                            <td>
                                <h6 class="usuario pl-2" style="font-size: 17px; font-weight: 600;">${nombre}</h6>
                                <h6 class="pl-2" style="font-size: 10px;" >k visualizaciones</h6>
                            </td>
                
                            <td class="flecha-tendencias"><i class="fas fa-chevron-right"></i></td>
                        </tr>        
                        
                        `;
                    }
            }


        }
        
    }).catch(error=>{ //si
        console.error(error); 
    });
    

}

function validarInput(val,btx){
    if (val==null || val=="") {
        document.form(btx).disabled=true;

    }else{
        if (val!=null || val!="") {
            document.form(btx).disabled=false;
        }

    }


}

function fmAsignarDias(){
    document.getElementById("select-dias").innerHTML = "";
    document.getElementById("select-dias").innerHTML = "<option selected>Dia</option>";
    for(var i = 1; i <=31; i++){
        document.getElementById("select-dias").innerHTML += `
        <option value="${i}">${i}</option>
        
        `;

    }
}
function fmAsignarAños(){
    document.getElementById("select-años").innerHTML = "";
    document.getElementById("select-años").innerHTML = "<option selected>Año</option>";
    for(var i = 2020; i >=1900; i--){
        document.getElementById("select-años").innerHTML += `
        <option value="${2020}">${i}</option>
        
        `;
    }
}

function generarComentarios(idUsuarioPublicacion, idPublicacion){
    

    axios({
        method: 'GET',
        url: `../../backend/api/publicaciones.php?idUsuario=${idUsuarioPublicacion}&idPublicacion=${idPublicacion}`,
        responseType: 'json'
    }).then(res=>{

        
        comentarios = res.data.comentarios;
        document.getElementById("contenedor-comentarios").innerHTML=
        `
        <div class="row">
            <div class="col-12">
                <img onclick="$('#modal-comentario').modal('hide'); " style="cursor: pointer; margin-left: auto;" src="../img/recursos/close.svg" alt="">
            </div>
            <div class="row-12" style="margin-left: auto; margin-right: auto;"><h6 style="text-align: center; font-family: 'Sofia Pro Bold'; font-weight: bold;">${comentarios.length} comentarios</h6></div>
        </div>`
        for (let i = 0; i < comentarios.length; i++) {
            const idComentario = comentarios[i].idComentario;
            const contenidoComentario = comentarios[i].contenidoComentario;
            const idUsrComentario = comentarios[i].idUsrComentario;




            axios({
                method: 'GET',
                url: `../../backend/api/usuarios.php?idUsuario=${idUsrComentario}`,
                responseType: 'json'
            }).then(resUsuario=>{
            
                let imagen = resUsuario.data.imagen;
                let nombre = resUsuario.data.nombre + " "+ resUsuario.data.apellido;
                let usuario = resUsuario.data.nombreUsuario;
            


                document.getElementById("contenedor-comentarios").innerHTML+=
                `
              <div class="row mb-4">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12">
                      <div class="row">
                        <div class="col-1">
                          <img src="${imagen}" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                        </div>
                        <div class="col-11"><h6 class="nombre-comentario">${nombre}</h6></div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div class="col-10">
                          <div class="container ml-4 contenido-comentario">
                            <div class="card">
                              <div class="body">
                                <p class="card-text">${contenidoComentario}</p>
                              </div>
                            </div>                     
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="row">
                            <div class="col-12">
                              <i class="far fa-heart" style="font-size: 14px; cursor: pointer;"></i>
                            </div>
                            <div class="col-12"><span><h6 style="font-family: 'Sofia Pro'; font-size: 14px;"></h6></span></div>
                          </div>
                        </div>
                      </div>
                      <hr>
                    </div>
                  </div>
                </div>
              </div>             
    
                
                `
             

            }).catch(error=>{
                console.error(error); 
            });
               
        }
        document.getElementById("contenedor-comentarios").innerHTML += `
        <div class="row mb-5">
            <div class="col-12">
                <textarea  class="form-control" name="txt-input-comentario" id="input-comentario" cols="30" rows="3" placeholder="Ingrese comentario"></textarea>
                <input onclick="hacerComentario(${idUsuarioPublicacion}, ${idPublicacion});" type="button" class="btn btn-primary mt-2" value="Enviar">   
            </div>
        </div>
        `

    }).catch(error=>{ //si
        console.error(error); 
    });

}

function hacerComentario(idUsrPublicacion, idPublicacion){
    let comentario = {
        "idComentario": 0,
        "contenidoComentario": document.getElementById("input-comentario").value,
        "idUsrComentario": this.idUsuario
    }
    console.log("this: " + this.idUsuario);
    console.log("var: " + idUsrPublicacion);
    axios({
        method: 'post',
        url: `../../backend/api/comentarios.php?idUsuario=${idUsrPublicacion}&idPublicacion=${idPublicacion}`,
        responseType: 'json',
        data:comentario
    }).then(res=>{
        generarComentarios(idUsrPublicacion,idPublicacion);
    }).catch(error=>{ 
        console.error(error); 
    });

}

function registrarUsuario(){
    mes = document.getElementById("select-mes").value;
    dia = document.getElementById("select-dias").value;
    año = document.getElementById("select-años").value;

    let fechaNacimiento = dia + "/"+mes+"/"+año;
    let correoElectronico = document.getElementById("correo-electronico").value;
    let contrasena = document.getElementById("contrasena").value;
    let nombre = document.getElementById("input-nombre").value;
    let apellido = document.getElementById("input-apellido").value;
    let usuario = {
        "idUsuario":-1,
        "nombre":nombre,
        "apellido":apellido,
        "nombreUsuario":nombre+"_"+dia,
        "correoElectronico":correoElectronico,
        "contrasena":contrasena,
        "imagen":"../img/recursos/usuario-0.png",
        "siguiendo":[],
        "seguidores":[],
        "meGustas":[],
        "publicaciones":[],
        "compartidos":[]
    };


    axios({
        method: 'post',
        url: `../../backend/api/usuarios.php`,
        responseType: 'json',
        data:usuario
    }).then(res=>{
        credenciales = {
            correo: correoElectronico,
            contrasena: contrasena,
            admi:"false"
        }
        loginParaRegistro(credenciales);
    }).catch(error=>{ 
        console.error(error); 
    });

}


fmAsignarDias();
fmAsignarAños();
generarTendencias();

generarCuentasRecomendadas();

