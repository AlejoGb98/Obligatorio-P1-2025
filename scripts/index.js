window.addEventListener('load', inicio);
let system = new Sistema()

let logged = false;
let userActive = null;
let contratacionId = 15;



function inicio(){
    ocultarSecciones('section');
    ocultarSecciones('#nav');
    document.querySelector("#login").style.display = 'block';

    //test cliente
    /* mostrarSeccion('interfazCliente');
    ocultarSecciones('.articleCliente');
    mostrarSeccion('solicitarPaseo');
    verPaseo();  */
    //document.querySelector("#logout").style.display = 'none';

 


    document.querySelector('#btnLogin').addEventListener('click', funcLogin);
    document.querySelector('#btnSignup').addEventListener('click', funcSignup);
    document.querySelector("#logout").addEventListener('click', logOut);
    document.querySelector("#btnToLogin").addEventListener('click', funcSwitchLog);
    document.querySelector("#btnToSignup").addEventListener('click', funcSwitchLog);
    document.querySelector("#logout").addEventListener('click', logOut);

    //Botones cliente
    document.querySelector("#paseo").addEventListener('click', verPaseo);
    document.querySelector("#solicitudes").addEventListener('click', verSolicitudes);
    document.querySelector("#paseadores").addEventListener('click', verPaseadores);
    document.querySelector("#btnProcesarSolicitud").addEventListener('click', solicitarPaseo);
    document.querySelector("#btnCancelarSolicitud").addEventListener('click', cancelarSolicitud);
}

//FUNCIONES DE MUESTREO
function ocultarSecciones(allIds){
    let sections = document.querySelectorAll(allIds);
    for(let i = 0; i < sections.length; i++){
        sections[i].style.display = 'none';
    }
}

function mostrarSeccion(seccion){
    document.querySelector(`#${seccion}`).style.display = 'block';
}

//FUNCIONES DE SESION
function funcLogin(){
    let user = document.querySelector('#txtUserLogin').value;
    let pass = document.querySelector('#txtPassLogin').value;

    let log = system.login(user, pass);

    if(log.access){
        logged = true;
        userActive = log.userActive
        document.querySelector("#logout").style.display = 'block';

        ocultarSecciones('section');
        mostrarSeccion('nav');

        if(log.userActive.rol === 'cliente'){
            ocultarSecciones('.navPaseador');
            ocultarSecciones('.articleCliente');
            mostrarSeccion('interfazCliente')
            mostrarSeccion('solicitarPaseo');
            
        }else{
            ocultarSecciones('.navCliente');
            ocultarSecciones('.articlePaseador');
            mostrarSeccion('interfazPaseador');
            mostrarSeccion('navPaseador');

        }
        document.querySelector('#txtUserLogin').value = '';
        document.querySelector('#txtPassLogin').value = '';

        if(userActive.solicitudActiva){
            document.querySelector('#btnProcesarSolicitud').disabled = true;
        }
        
    }else{
        document.querySelector('#msjErrorLogin').innerHTML = `${log.msj}`;
    }
}

function funcSignup(){
    let user = document.querySelector('#txtUserSignup').value;
    let pass = document.querySelector('#txtPassSignup').value;
    let mascota = document.querySelector('#txtNombreSignup').value;
    let tamano = Number(document.querySelector('#slcTamanoSignup').value);

    let log = system.signup(user, pass, mascota, tamano);

    if(!log.registroExitoso){
        document.querySelector('#msjErrorLoginSignup').innerHTML = `${log.msj}`;
    } else{
        //limpiar imputs y mostrar msj de registro exitoso
    }

}

function logOut(){
    logged = false;
    userActive = false;
    document.querySelector("#logout").style.display = 'none';
    ocultarSecciones('section');
    ocultarSecciones('nav');
    mostrarSeccion('login');

}

function funcSwitchLog(){
    let idBtn = this.getAttribute('id');
    ocultarSecciones('section');
    
    switch(idBtn){
        case 'btnToLogin' : mostrarSeccion('login');
            break;
        case 'btnToSignup' : mostrarSeccion('signup');
            break;
    }
}

//FUNCIONES DE CLIENTE
function verPaseo(){
    ocultarSecciones('.articleCliente');
    document.querySelector('#msjBienvenida').innerHTML = `Nos encanta que ${userActive.nombrePerro} quiera salir a pasear hoy!`;

    mostrarSeccion('solicitarPaseo');
    mostrarPaseadores();
}

function verSolicitudes(){
    ocultarSecciones('.articleCliente');
    mostrarSeccion('paseosPendientes');
    ocultarSecciones('.solicitudes');

    if(userActive.solicitudActiva){
        mostrarSeccion('conSolicitud')
        let paseador = system.paseadores[userActive.solicitudActiva.idPaseador];
        let datosContratacion;
        for(const contratacion of paseador.contrataciones){
            if(contratacion.id == userActive.solicitudActiva.idContratacion){
                datosContratacion = contratacion;
            }
        }
        
        if(datosContratacion.estado){
            document.querySelector("#estadoSolicitud").innerHTML = `El estado de tu solicitud es: Aprobado`;
            document.querySelector("#btnCancelarSolicitud").disabled = true;
        }else{
            document.querySelector("#estadoSolicitud").innerHTML = `El estado de tu solicitud es: Pendiente`;
        }
        
        document.querySelector("#paseadorSolicitud").innerHTML = `Estara a cargo de: ${paseador.nombre}`
    }else{
        mostrarSeccion('sinSolicitud')
    }
}

function cancelarSolicitud(){
    if(!userActive.solicitudActiva.estado){
        let contratacionesActualizadas = [];
        let paseadorId = userActive.solicitudActiva.idPaseador
     
        let contratacionesPaseador = system.paseadores[paseadorId].contrataciones
        console.log(contratacionesPaseador)
        for(const contratacion of contratacionesPaseador){
          
            if(contratacion.id !== userActive.solicitudActiva.idContratacion){
                contratacionesActualizadas.push(contratacion);
            }
        }
        system.paseadores[paseadorId].contrataciones = contratacionesActualizadas;
        console.log(system.paseadores[paseadorId].contrataciones)

        userActive.solicitudActiva = false;
        ocultarSecciones('.solicitudes');
        mostrarSeccion('sinSolicitud')
        document.querySelector('#btnProcesarSolicitud').disabled = false;
    }
}

function verPaseadores(){
    ocultarSecciones('.articleCliente');
    mostrarSeccion('verPaseadores');

    let paseadores = system.paseadores
    document.querySelector('#tbody').innerHTML = '';
    for(const paseador of paseadores){
        document.querySelector('#tbody').innerHTML += `
            <tr>
                <td><p>${paseador.nombre}</p></td>
                <td><p>${paseador.contrataciones.length}</p></td>
            </tr>
        `
    }
}

function mostrarPaseadores(){
    let paseadoresAptos = []

    for(const paseador of system.paseadores){
        if(paseador.cupos >= userActive.tamanoPerro){

            let apto = true;
            for(const contratacion of paseador.contrataciones){ 
                if(contratacion.estado && contratacion.tamanoPerro + userActive.tamanoPerro === 5){
                apto = false; //no es apto
               }
            }

        if(apto){ //si es apto, lo pusheo
            paseadoresAptos.push(paseador)
        }
       }
    }
   
    document.querySelector('#slcPaseador').innerHTML = ''
    for(const paseador of paseadoresAptos){
        document.querySelector('#slcPaseador').innerHTML += `<option value=${paseador.id}>${paseador.nombre}</option>`
    }
}

function solicitarPaseo(){
    contratacionId++;
    let idPaseador = Number(document.querySelector('#slcPaseador').value);
    userActive.solicitudActiva = {idContratacion: contratacionId, idPaseador: idPaseador, 'estado': false};
    system.paseadores[idPaseador].contrataciones.push({'id': contratacionId ,'nombrePerro': userActive.nombrePerro, 'tamanoPerro': userActive.tamanoPerro, 'estado': false});
    document.querySelector('#btnProcesarSolicitud').disabled = true;
}



