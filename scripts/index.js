window.addEventListener('load', inicio);
let system = new Sistema()

let logged = false;
let userActive = null;
let contratacionId = 15;


function inicio(){
    ocultarSecciones('section');
    ocultarSecciones('#nav');
    document.querySelector("#login").style.display = 'block';
    
  

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

    //Botones paseador
    //document.querySelector('#paseosPendientesNav').addEventListener('click', verPaseosPendientes);
    //document.querySelector('#paseosAceptadosNav').addEventListener('click', verPaseosAceptados);
    //document.querySelector('.aceptarContrataciones').addEventListener('click', procesarSolicitud);

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
            mostrarSeccion('interfazCliente')
            ocultarSecciones('.articleCliente');
            mostrarSeccion('solicitarPaseo');
            mostrarPaseadores();
            
        }else{
            ocultarSecciones('.navCliente');
            mostrarSeccion('interfazPaseador');
            mostrarSeccion('navPaseador');
            verPaseosPendientes();

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

    let log = system.signup(user, pass, mascota, tamano, false);

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
    document.querySelector('#tbodyCliente').innerHTML = '';
    for(const paseador of paseadores){
        document.querySelector('#tbodyCliente').innerHTML += `
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
        //comprobar tamanoPerro vs cuposDisponibles
        if(paseador.cupos >= userActive.tamanoPerro){
            let apto = true;
            for(const contratacion of paseador.contrataciones){ 
                if(contratacion.estado && contratacion.tamanoPerro + userActive.tamanoPerro === 5){
                apto = false; 
               }
            }

        if(apto){ 
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

//FUNCIONES DEL PASEADOR
function verPaseosPendientes(){
    ocultarSecciones('.articlePaseador');
    mostrarSeccion('paseosPendientesPaseador');

    document.querySelector('#tbodyPendientes').innerHTML = '';
    const contratacionesPaseador = system.paseadores[userActive.id].contrataciones;
    for(const contratacion of contratacionesPaseador){
        if(!contratacion.estado){
            document.querySelector('#tbodyPendientes').innerHTML += `
            <tr>
                <td>${contratacion.id}</td>
                <td>${contratacion.nombrePerro}</td>
                <td>${contratacion.tamanoPerro}</td>
                <td><input type='button' class='aceptarContrataciones' id=${contratacion.id} value='Procesar'></td>
            </tr>`
        }
    }

    let btnContrataciones = document.querySelectorAll('.aceptarContrataciones');
    for(const btn of btnContrataciones){
        btn.addEventListener('click', procesarSolicitud);
    }
}

function procesarSolicitud(){
    let id = Number(this.getAttribute('id'));
    
    for(const contratacion of system.paseadores[userActive.id].contrataciones){
        if(contratacion.id === id){
            contratacion.estado = true;
            alert(`Se ha procesado con exito la solicitud número ${contratacion.id}`)
        }
    }

    limpiarListaTamanos();
}

function limpiarListaTamanos(){
    let tamano = 0;
    let contratacionesLimpias = []
    for(const contratacion of system.paseadores[userActive.id].contrataciones){
        if(contratacion.tamanoPerro === 4 || contratacion.tamanoPerro === 1){
            if(contratacion.estado === true){
                tamano = contratacion.tamanoPerro;
            }
        }
    }

    if(tamano !== 0){
        for(const contratacion of system.paseadores[userActive.id].contrataciones){
            if(contratacion.tamanoPerro === 2 || contratacion.tamanoPerro === tamano){
                contratacionesLimpias.push(contratacion);
            }
        }
        system.paseadores[userActive.id].contrataciones = contratacionesLimpias;
    }
        
    verPaseosPendientes()
}

function verPaseosAceptados(){
    ocultarSecciones('.articlePaseador');
    mostrarSeccion('paseosAceptadosPaseador');

    let cuposOcupados = 0;
    document.querySelector('#tbodyAceptados').innerHTML = '';
    
    for(const contratacion of system.paseadores[userActive.id].contrataciones){
        if(contratacion.estado){
            cuposOcupados += contratacion.tamanoPerro;
            document.querySelector("#tbodyAceptados").innerHTML += `<tr>
            <td>${contratacion.nombrePerro}</td>
            <td>${contratacion.tamanoPerro}</td>
            </tr>`
        }
    }
    let porcentajeOcupado = (cuposOcupados * 100) / userActive.cupos;

    document.querySelector('#cuposOcupados').innerHTML = `Cupos Ocupados: ${cuposOcupados}`;
    document.querySelector("#cuposMaximo").innerHTML = `Limite de Cupos: ${userActive.cupos}`;
    document.querySelector("#porcentajeOcupado").innerHTML = `Ocupacion: ${porcentajeOcupado}%`;

}


