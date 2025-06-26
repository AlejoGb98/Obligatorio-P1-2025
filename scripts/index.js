window.addEventListener('load', inicio);
let system = new Sistema()

let logged = false;
let userActive = null;
let contratacionId = 15;


function inicio(){
    ocultarSecciones('section');
    ocultarSecciones('.nav');
    document.querySelector("#login").style.display = 'block';

    document.querySelector('#btnLogin').addEventListener('click', funcLogin);
    document.querySelector('#btnSignup').addEventListener('click', funcSignup);
    document.querySelector("#btnToLogin").addEventListener('click', funcSwitchLog);
    document.querySelector("#btnToSignup").addEventListener('click', funcSwitchLog);
    document.querySelector("#logoutCliente").addEventListener('click', logOut);
    document.querySelector("#logoutPaseador").addEventListener('click', logOut);

    //Botones cliente
    document.querySelector("#paseo").addEventListener('click', verPaseo);
    document.querySelector("#solicitudes").addEventListener('click', verSolicitudes);
    document.querySelector("#paseadores").addEventListener('click', verPaseadores);
    document.querySelector("#btnProcesarSolicitud").addEventListener('click', solicitarPaseo);
    document.querySelector("#btnCancelarSolicitud").addEventListener('click', cancelarSolicitud);

    //Botones paseador
    document.querySelector('#paseosPendientesNav').addEventListener('click', verPaseosPendientes);
    document.querySelector('#paseosAceptadosNav').addEventListener('click', verPaseosAceptados);
    document.querySelector('.aceptarContrataciones').addEventListener('click', procesarSolicitud);

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
        document.querySelector('#msjErrorLogin').innerHTML = ``;

        ocultarSecciones('section');

        if(log.userActive.rol === 'cliente'){
            document.querySelector("#logoutCliente").style.display = 'block';
            mostrarSeccion('navCliente')
            mostrarSeccion('interfazCliente')
            ocultarSecciones('.articleCliente');
            mostrarSeccion('solicitarPaseo');
            verPaseo();
            
        }else{
            document.querySelector("#logoutPaseador").style.display = 'block';
            mostrarSeccion('navPaseador')
            mostrarSeccion('interfazPaseador');
            mostrarSeccion('navPaseador');
            verPaseosPendientes();

        }
        document.querySelector('#txtUserLogin').value = '';
        document.querySelector('#txtPassLogin').value = '';
        
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
        document.querySelector('#txtUserSignup').value = '';
        document.querySelector('#txtPassSignup').value = '';
        document.querySelector('#txtNombreSignup').value = '';
        document.querySelector('#slcTamanoSignup').value = '0';
        document.querySelector('#msjErrorLoginSignup').innerHTML = '';
        alert('Te has registrado con exito')
    }
}

function logOut(){
    logged = false;
    userActive = false;
    document.querySelector("#logoutCliente").style.display = 'none';
    document.querySelector("#logoutPaseador").style.display = 'none';

    ocultarSecciones('section');
    ocultarSecciones('.nav');
    mostrarSeccion('login');
}

function funcSwitchLog(){
    let idBtn = this.getAttribute('id');
    ocultarSecciones('section');
    document.querySelector('#msjErrorLogin').innerHTML = ``;
    document.querySelector('#msjErrorLoginSignup').innerHTML = ``;
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
    document.querySelector("#btnCancelarSolicitud").disabled = false;
    let datosContratacion = false;

    for(const contratacion of system.contrataciones){
        if(contratacion.datosCliente.id === userActive.id){
            datosContratacion = contratacion;
        }
    }
   
    if(datosContratacion){
        mostrarSeccion('conSolicitud');
        document.querySelector("#estadoSolicitud").innerHTML = `El estado de tu solicitud es: ${datosContratacion.estado}`;
        document.querySelector("#paseadorSolicitud").innerHTML = `El paseo estara a cargo de ${datosContratacion.datosPaseador.nombre}`;
        if(datosContratacion.estado === 'Aceptado' || datosContratacion.estado === 'Rechazada'){
            document.querySelector("#btnCancelarSolicitud").disabled = true;
            
            if(datosContratacion.estado === 'Rechazada'){
                document.querySelector("#paseadorSolicitud").innerHTML = `Elige otro paseador.`;
            }
        }
    }else{
        mostrarSeccion('sinSolicitud')
    }
}

function cancelarSolicitud(){ 
    let estado = system.obtenerEstadoContratacion(userActive.id);
    if(estado === 'Pendiente'){
        alert('Se ha cancelado la solicitud.')
        ocultarSecciones('.solicitudes');
        mostrarSeccion('sinSolicitud')
        document.querySelector('#btnProcesarSolicitud').disabled = false;
        system.cancelarContratacion(userActive.id);
    }
    
}

function verPaseadores(){ 
    ocultarSecciones('.articleCliente');
    mostrarSeccion('verPaseadores');
    document.querySelector('#tbodyCliente').innerHTML = ''

    for(const paseador of system.paseadores){
        let perros = 0;
        for(const contratacion of system.contrataciones){
            if(contratacion.datosPaseador.id === paseador.id && contratacion.estado === 'Aceptado'){
                perros++
            }
        }
        
        document.querySelector('#tbodyCliente').innerHTML += `
            <tr>
                <td><p>${paseador.nombre}</p></td>
                <td><p>${perros}</p></td>
            </tr>`
    }
}

function mostrarPaseadores(){ 
    let paseadoresAptos = []

    let estado = system.obtenerEstadoContratacion(userActive.id);

    switch(estado){
        case 'Aceptado':
        case 'Pendiente':
            document.querySelector('#btnProcesarSolicitud').disabled = true;
            break;
        default: document.querySelector('#btnProcesarSolicitud').disabled = false;
            break;  
    }

    for(const paseador of system.paseadores){
        let cuposCompletos = system.obtenerCuposOcupados(paseador.id);
        let contratacionesPaseador = system.obtenerPaseosConEstado(paseador.id ,'Aceptado');
        
        if(cuposCompletos + userActive.tamanoPerro <= paseador.cupos){
            let apto = true;
            for(const contratacion of contratacionesPaseador){ 
                if(contratacion.datosCliente.tamanoPerro + userActive.tamanoPerro === 5){
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
    let datosPaseador = system.buscarObjeto(system.paseadores, 'id', idPaseador);

    system.agregarContratacion(new Contratacion(contratacionId, datosPaseador, userActive, 'Pendiente'));
    document.querySelector('#btnProcesarSolicitud').disabled = true;
}

//FUNCIONES DEL PASEADOR
function verPaseosPendientes(){ 
    ocultarSecciones('.articlePaseador');
    mostrarSeccion('paseosPendientesPaseador');

    document.querySelector('#tbodyPendientes').innerHTML = '';
    let existenContrataciones = false;

    for(const contratacion of system.contrataciones){
        if(contratacion.datosPaseador.id === userActive.id && contratacion.estado === 'Pendiente'){
            existenContrataciones = true;
            document.querySelector('#tbodyPendientes').innerHTML += `
            <tr>
                <td>${contratacion.id}</td>
                <td>${contratacion.datosCliente.nombrePerro}</td>
                <td>${contratacion.datosCliente.tamanoPerro}</td>
                <td><input type='button' class='aceptarContrataciones' id=${contratacion.id} value='Procesar'></td>
            </tr>`
        }
    }

    if(!existenContrataciones){
        document.querySelector('#tbodyPendientes').innerHTML += `
            <tr>
                <td>No existen contrataciones pendientes</td><td></td><td></td>
            </tr>`
    }

    let btnContrataciones = document.querySelectorAll('.aceptarContrataciones');
    for(const btn of btnContrataciones){
        btn.addEventListener('click', procesarSolicitud);
    }
}

function procesarSolicitud(){ 
    let id = Number(this.getAttribute('id'));
    
    for(const contratacion of system.contrataciones){
        if(contratacion.id === id){
            contratacion.estado = 'Aceptado';
            alert(`Se ha procesado con exito la solicitud número ${contratacion.id}`)
        }
    }

    limpiarLista();
}

function limpiarLista(){ // funcion que limpia la tabla en base a contrataciones ya aceptadas
    let cuposOcupados = system.obtenerCuposOcupados(userActive.id);
    let tamano = 0;

    // en caso de que tamanoPerro = 1 o 4 guardamos el tamano para comparar en if abajo
    for(const contratacion of system.contrataciones){
        if(contratacion.datosPaseador.id === userActive.id && contratacion.estado === 'Aceptado'){
            if(contratacion.datosCliente.tamanoPerro === 4 || contratacion.datosCliente.tamanoPerro === 1){
                tamano = contratacion.datosCliente.tamanoPerro;
            }
            
        }
    }

    for(const contratacion of system.contrataciones){
        if(contratacion.datosPaseador.id === userActive.id){
                // si existe una contratacion aceptada con tamano 4 eliminamos la de tamano 1 pendiente y viceversa
                if(tamano !== 0){
                    if(contratacion.datosCliente.tamanoPerro !== 2 && contratacion.datosCliente.tamanoPerro !== tamano){
                        contratacion.estado = 'Rechazada';
                    }
                }

                // si la contratacion pendiente excede los cupos disponibles, se rechaza
                if(contratacion.estado === 'Pendiente' && contratacion.datosCliente.tamanoPerro + cuposOcupados > userActive.cupos){
                    contratacion.estado = 'Rechazada';
                }
            }
        }
        
    verPaseosPendientes()
}

function verPaseosAceptados(){
    ocultarSecciones('.articlePaseador');
    mostrarSeccion('paseosAceptadosPaseador');
    document.querySelector('#tbodyAceptados').innerHTML = '';

    let cuposOcupados = system.obtenerCuposOcupados(userActive.id);
    let porcentajeOcupado = (cuposOcupados * 100) / userActive.cupos;
    
    for(const contratacion of system.contrataciones){
        if(contratacion.datosPaseador.id === userActive.id){
            if(contratacion.estado === 'Aceptado'){
                document.querySelector("#tbodyAceptados").innerHTML += `<tr>
                <td>${contratacion.datosCliente.nombrePerro}</td>
                <td>${contratacion.datosCliente.tamanoPerro}</td>
                </tr>`
            }
        }
    }
    
    document.querySelector('#cuposOcupados').innerHTML = `Cupos Ocupados: ${cuposOcupados}`;
    document.querySelector("#cuposMaximo").innerHTML = `Limite de Cupos: ${userActive.cupos}`;
    document.querySelector("#porcentajeOcupado").innerHTML = `Ocupacion: ${porcentajeOcupado}%`;
}

