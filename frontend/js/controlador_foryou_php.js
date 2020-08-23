var idUsuario;




function login(){
    console.log("Iniciando sesión..");
    axios({
        method: 'post',
        url: `../../backend/api/login.php`,
        responseType: 'json', //el tipo de la respuesta
        data:{
            correo: document.getElementById("correo-usuario").value,
            contrasena: document.getElementById("contrasena").value,
            admi:"false"
        }
    }).then(res=>{
        console.log(res.data);
        if(res.data){
            console.log("Inicio de sesión correcto");
            window.location.href = "../tiktok.php";
        }else{
            document.getElementById("error").style.display = 'block';
            document.getElementById("error").innerHTML = "Correo o contraseña incorrectos";
            
        }

    }).catch(error=>{
        console.error(error); 
    });

}

function generearPublicacionesSeguidos(){
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
            // Me quede aqui.
            ultimoIndice = usuariosSeguidos[i].publicaciones.length;
            if(ultimoIndice > 0){

                let descripcion = usuariosSeguidos[i].publicaciones[ultimoIndice-1].leyenda;
                let sonido = "sonido original - "+ nombre;
                let video = usuariosSeguidos[i].publicaciones[ultimoIndice-1].urlVideo;


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
        
                <div class="col-1 col-sm-1 col-md-12 col-lg-2 col-xl-2 ">
        
                    <input class="btn btn-outline-danger btn-seguir-usuario" type="button" value="Seguir" >
                    
                </div>             
            </div>
            <hr>
                `;
                }
        }

    }).catch(error=>{
        console.error(error); 
    });
    
}
function generearPublicaciones(){
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
            // Me quede aqui.
            ultimoIndice = usuarios[i].publicaciones.length;
            if(ultimoIndice > 0){

                let descripcion = usuarios[i].publicaciones[ultimoIndice-1].leyenda;
                let sonido = "sonido original - "+ nombre;
                let video = usuarios[i].publicaciones[ultimoIndice-1].urlVideo;


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
        
                <div class="col-1 col-sm-1 col-md-12 col-lg-2 col-xl-2 ">
        
                    <input class="btn btn-outline-danger btn-seguir-usuario" type="button" value="Seguir" >
                    
                </div>             
            </div>
            <hr>
                `;
                }
        }

    }).catch(error=>{
        console.error(error); 
    });
    
}


function generarCuentasRecomendadas(){

    axios({
        method: 'GET',
        url: `../../backend/api/usuarios.php`,
        responseType: 'json' //el tipo de la respuesta
    }).then(res=>{
        document.getElementById("cuentas-recomendadas").innerHTML += "";
        for(let i = 0; i < res.data.length; i++){
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

generearPublicaciones();
fmAsignarDias();
fmAsignarAños();
generarCuentasRecomendadas();
generarTendencias();
