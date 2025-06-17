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
            verPaseo();
            
        }else{
            ocultarSecciones('.navCliente');
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

function verSolicitudes(){ //Pronto, a testear
    ocultarSecciones('.articleCliente');
    mostrarSeccion('paseosPendientes');
    ocultarSecciones('.solicitudes');
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
        if(datosContratacion.estado === 'Aceptado'){
            document.querySelector("#btnCancelarSolicitud").disabled = true;
        }
    }else{
        mostrarSeccion('sinSolicitud')
    }
}

function cancelarSolicitud(){ //Pronto, a testear
    
    for(const contratacion of system.contrataciones){
        if(contratacion.datosCliente.id === userActive.id && contratacion.estado === 'Pendiente'){
            contratacion.estado = 'Cancelada';
            alert('Se ha cancelado la solicitud.')
            ocultarSecciones('.solicitudes');
            mostrarSeccion('sinSolicitud')
            document.querySelector('#btnProcesarSolicitud').disabled = false;
        }
    }
}

function verPaseadores(){ //Pronto, a testear
    ocultarSecciones('.articleCliente');
    mostrarSeccion('verPaseadores');
    document.querySelector('#tbodyCliente').innerHTML = ''

    for(const paseador of system.paseadores){
        let perros = 0;
        for(const contratacion of system.contrataciones){
            if(contratacion.idPaseador === paseador.id){
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

function mostrarPaseadores(){ //Pronto, dividir en funciones tamanoPerro y calcular cupos disponibles
    let paseadoresAptos = []
    
    for(const contratacion of system.contrataciones){
        if(contratacion.datosCliente.id === userActive.id){
            if(contratacion.estado === 'Aceptado' || contratacion.estado === 'Pendiente')
            document.querySelector('#btnProcesarSolicitud').disabled = true;
        }
    }

    for(const paseador of system.paseadores){
        let cuposCompletos = 0;
        let contratacionesPaseador = [];

        for(const contratacion of system.contrataciones){
            contratacionesPaseador.push(contratacion)
            if(paseador.id === contratacion.datosPaseador.id && contratacion.estado === 'Aceptado'){
                cuposCompletos += contratacion.tamanoPerro;
            }
        }

        if(cuposCompletos + userActive.tamanoPerro <= paseador.cupos){
            let apto = true;
            for(const contratacion of contratacionesPaseador){ 
                if(contratacion.tamanoPerro + userActive.tamanoPerro === 5){
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
    
    system.contrataciones.push(new Contratacion(contratacionId, datosPaseador, userActive, 'Pendiente'));
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


