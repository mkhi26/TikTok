

var idUsuario = readCookie("idUsuario");
var inicioSesion = false;
var idUsuarioVisitado = null;

if(idUsuario){
    this.inicioSesion = true;
    cambiarUsuario(idUsuario);
}else{
    generearPublicaciones();
}

function reenderizarUsuario(idUsuario){
    axios({
        method: 'GET',
        url: `../../backend/api/usuarios.php?idUsuario=${idUsuario}`,
        responseType: 'json'
    }).then(res=>{
        usuario = res.data;
        document.getElementById("datos-usuario").innerHTML = 
        `
        <div class="row mt-4">
            <div class="col-12"><h6 class="usuario ">${usuario.nombre} ${usuario.apellido}</h6></div>
            <div class="col-12"><h6 class="usuario">${usuario.nombreUsuario}</h6></div>
        </div>
        `
        document.getElementById("imagen-usuario").innerHTML = 
        `
        <img src="${usuario.imagen}" style="width: 120px; height: 120px; border-radius: 50%;" alt="">
        `
        generarCuentasRecomendadas();
        generarTendencias();
        generarPublicaciones(idUsuario);
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
        document.getElementById("datos-usuario").innerHTML = 
        `
        <div class="row mt-4">
            <div class="col-12"><h6 class="usuario ">${usuario.nombre} ${usuario.apellido}</h6></div>
            <div class="col-12"><h6 class="usuario">${usuario.nombreUsuario}</h6></div>
        </div>
        `
        document.getElementById("imagen-usuario").innerHTML = 
        `
        <img src="${usuario.imagen}" style="width: 120px; height: 120px; border-radius: 50%;" alt="">
        `
        generarCuentasRecomendadas();
        generarTendencias();
        generarPublicaciones();
    }).catch(error=>{
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
                                <h6 onclick="reenderizarUsuario(${res.data[i].idUsuario})" class="usuario pl-2" style="font-size: 17px; font-weight: 600;">${nombre}</h6>
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
    }).catch(error=>{
        console.error(error); 
    });
    

}

function generarPublicaciones(idUsuario = this.idUsuario){
    console.log("Se generararan las publicaciones de los usuarios a los que sigues");
    axios({
        method: 'GET',
        url: `../../backend/api/usuarios.php?idUsuario=${idUsuario}`,
        responseType: 'json'
    }).then(res=>{
        publicaciones = res.data.publicaciones;
        let imgUsuario = res.data["imagen"];
        let nombre = `${res.data.nombre} ${res.data.apellido}`;
        let nombreUsuario = "@"+res.data.nombreUsuario;
        
        for(let i = 0; i < publicaciones.length; i++){
            const descripcion = publicaciones[i].leyenda;
            const sonido = "Sonido original-"+nombre
            const video = publicaciones[i].urlVideo;
            const comentarios = publicaciones[i].comentarios;
            const compartidos = publicaciones[i].compartidos;
            const likes = publicaciones[i].likes;
            document.getElementById("publicaciones").innerHTML = "";
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
                                <td><i onclick="$('#modal-comentario').modal('show'); " class="far fa-comment-dots ml-3" style="font-size: 30px; cursor: pointer;"></i></td>
                                <td class="pl-1">${comentarios.length}</td>
                                <td class="pl-2"><img src="../img/recursos/share.svg" style="width: 30px; cursor: pointer;" alt=""></td>
                                <td class="pl-1">${compartidos.length}</td>
                            </tr>
                        </table>
                    </div>
                </div>               
            </div>                            
        </div>
        <hr>
            `;
        }


    }).catch(error=>{
        console.error(error); 
    });
    
}