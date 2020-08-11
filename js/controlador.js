
var publicaciones = [
    {
        "img-perfil":"../img/recursos/Keren.jpeg",
        "Nombre": "Keren Nohemi",
        "Usuario": "@keren_28",
        "Descripcion": "Mi primer video",
        "sonido": "Sonido original- Keren Nohemi",
        "video": "../img/recursos/video-ejemplo.mp4"
    },
    {
        "img-perfil":"../img/recursos/Larissa.jpg",
        "Nombre": "Larissa",
        "Usuario": "Larissa_18",
        "Descripcion": "Mi primer video",
        "sonido": "Sonido original- Larissa",
        "video": "../img/recursos/video-ejemplo.mp4"
    },
    {
        "img-perfil":"../img/recursos/marta.jpeg",
        "Nombre": "Marta González",
        "Usuario": "marta_gonzález16",
        "Descripcion": "Mi primer video",
        "sonido": "Sonido original- Marta González",
        "video": "../img/recursos/video-ejemplo.mp4"
    },
    {
        "img-perfil":"../img/recursos/usuario-0.png",
        "Nombre": "Usuario3",
        "Usuario": "Usuario_3",
        "Descripcion": "Mi primer video",
        "sonido": "Sonido original- Usuario3",
        "video": "../img/recursos/video-ejemplo.mp4"
    }
];

var cuentasRecomendadas = [
    {
        "img-perfil":"../img/recursos/Keren.jpeg",
        "nombre": "Keren Nohemi",
        "usuario": "@keren_28"
    },
    {
        "img-perfil":"../img/recursos/Larissa.jpg",
        "nombre": "Larissa",
        "usuario": "Larissa_18"
    },
    {
        "img-perfil":"../img/recursos/marta.jpeg",
        "nombre": "Marta González",
        "usuario": "marta_gonzález16",
    },
    {
        "img-perfil":"../img/recursos/usuario-0.png",
        "nombre": "Usuario3",
        "usuario": "Usuario_3"
    },
    {
        "img-perfil":"../img/recursos/usuario-0.png",
        "nombre": "Usuario4",
        "usuario": "Usuario_4"
    },
    {
        "img-perfil":"../img/recursos/usuario-0.png",
        "nombre": "Usuario5",
        "usuario": "Usuario_5"
    },
    {
        "img-perfil":"../img/recursos/usuario-0.png",
        "nombre": "Usuario6",
        "usuario": "Usuario_6"
    },
];


var tendencias = [
    
    {
        "img":"../img/recursos/game.jpg",
        "titulo":"#retogamer",
        "visualizaciones": "37.1 M"
    },
    {
        "img":"../img/recursos/game.jpg",
        "titulo":"#retogamer",
        "visualizaciones": "37.1 M"
    },
    {
        "img":"../img/recursos/game.jpg",
        "titulo":"#retogamer",
        "visualizaciones": "37.1 M"
    },
    {
        "img":"../img/recursos/game.jpg",
        "titulo":"#retogamer",
        "visualizaciones": "37.1 M"
    },
    {
        "img":"../img/recursos/game.jpg",
        "titulo":"#retogamer",
        "visualizaciones": "37.1 M"
    },
    {
        "img":"../img/recursos/game.jpg",
        "titulo":"#retogamer",
        "visualizaciones": "37.1 M"
    },
    {
        "img":"../img/recursos/game.jpg",
        "titulo":"#retogamer",
        "visualizaciones": "37.1 M"
    }

];



function generearPublicaciones(){

    for(var i = 0; i< publicaciones.length; i++){
        let imgUsuario = publicaciones[i]["img-perfil"];
        let nombre = publicaciones[i].Nombre;
        let nombreUsuario = publicaciones[i].Usuario;
        let descripcion = publicaciones[i].Descripcion;
        let sonido = publicaciones[i].sonido;
        let video = publicaciones[i].video;
        
<<<<<<< HEAD

=======
        console.log("Hola");
>>>>>>> 5cf0eae86f836584d06f5771e12e161720c51339
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

<<<<<<< HEAD
                        <video class="" controls  style="height: 348px; height: 520px; border-radius: 15px; margin-right: auto;" >
=======
                        <video class="" controls autoplay style="height: 348px; height: 520px; border-radius: 15px; margin-right: auto;" >
>>>>>>> 5cf0eae86f836584d06f5771e12e161720c51339
                            <source src="${video}"  type="video/mp4">
                        </video>
                    </div>
                </div>
                <div class="col-12">
                    <table>
                        <tr>
                            <td><i class="far fa-heart" style="font-size: 30px; cursor: pointer;"></i></td>
                            <td class="pl-1">1234</td>
                            <td><i class="far fa-comment-dots ml-3" style="font-size: 30px; cursor: pointer;"></i></td>
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


function generarCuentasRecomendadas(){
    document.getElementById("cuentas-recomendadas").innerHTML += "";
    for(var i = 0; i < cuentasRecomendadas.length; i++ ){
        document.getElementById("cuentas-recomendadas").innerHTML += `
        <tr>
            <td><img src="${cuentasRecomendadas[i]["img-perfil"]}" style="width: 50px; height: 50px; border-radius: 50%;" alt=""></td>
            <td>
                <h6 class="usuario pl-2" style="font-size: 17px; font-weight: 600;">${cuentasRecomendadas[i].nombre}</h6>
                <h6 class="pl-2" style="font-size: 10px;" >@${cuentasRecomendadas[i].usuario}</h6>
            </td>
            <td class=""><input class="btn btn-outline-danger btn-seguir-usuario" type="button" value="Seguir" style="margin-left: 95%;"></td>
        </tr>        
        
        `;
    }
}

function generarTendencias(){

    document.getElementById("tendencias").innerHTML="";
    for(var i = 0; i < tendencias.length; i++){
        document.getElementById("tendencias").innerHTML+=`
        
        <tr>
            <td><img src="${tendencias[i].img}" style="width: 50px; height: 50px; border-radius:15px;" alt=""></td>
            <td>
                <h6 class="usuario pl-2" style="font-size: 17px; font-weight: 600;">${tendencias[i].titulo}</h6>
                <h6 class="pl-2" style="font-size: 10px;" >${tendencias[i].visualizaciones} visualizaciones</h6>
            </td>

            <td class="flecha-tendencias"><i class="fas fa-chevron-right"></i></td>
        </tr>        
        
        `;
    }
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

<<<<<<< HEAD
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
=======
//generearPublicaciones();

>>>>>>> 5cf0eae86f836584d06f5771e12e161720c51339
generarCuentasRecomendadas();
generarTendencias();