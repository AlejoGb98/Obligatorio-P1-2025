window.addEventListener('load', inicio);
let system = new Sistema()

//let logged = false;
//let userActive = null;
let logged = true;
let userActive = {
    "usuario": "crodriguez",
    "pass": "Cr235",
    "nombrePerro": "Robert",
    "tamanoPerro": 4,
    "rol": "cliente",
    'solicitudActiva': false
}

let contratacionId = 15;



function inicio(){
    ocultarSecciones('section');
    ocultarSecciones('nav');
    //document.querySelector("#login").style.display = 'block';

    //test cliente
        mostrarSeccion('interfazCliente');
        mostrarSeccion('navCliente');
        ocultarSecciones('.articleCliente');
        mostrarSeccion('solicitarPaseo');
        verPaseo();
    //document.querySelector("#logout").style.display = 'none';

    if(userActive.solicitudActiva){
        document.querySelector('#btnProcesarSolicitud').disabled = true;
    }


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
        console.log(userActive)
        document.querySelector("#logout").style.display = 'block';

        ocultarSecciones('section');
        if(log.userActive.rol === 'cliente'){
            mostrarSeccion('interfazCliente');
            mostrarSeccion('navCliente');
            ocultarSecciones('.articleCliente');
            mostrarSeccion('solicitarPaseo');
            
        }else{
            mostrarSeccion('interfazPaseador');
            mostrarSeccion('navPaseador');
        }
        document.querySelector('#txtUserLogin').value = '';
        document.querySelector('#txtPassLogin').value = '';
        
    }else{
        document.querySelector('#msjError').innerHTML = `${log.msj}`;
    }

    
}

function funcSignup(){
    let user = document.querySelector('#txtUserSignup').value;
    let pass = document.querySelector('#txtPassSignup').value;
    let nombre = document.querySelector('#txtNombreSignup').value;
    let tamano = document.querySelector('#slcTamanoSignup').value;

    system.signup(user, pass, nombre, tamano);
}

function logOut(){
    logged = false;
    document.querySelector("#logout").style.display = 'none';
    ocultarSecciones('section');
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

    console.log(userActive.solicitudActiva)

}

function verPaseadores(){
    ocultarSecciones('.articleCliente');
    mostrarSeccion('verPaseadores');
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
    let idPaseador = Number(document.querySelector('#slcPaseador').value);
    userActive.solicitudActiva = {idContratacion: contratacionId, idPaseador: idPaseador, 'estado': false};
    system.paseadores[idPaseador].contrataciones.push({'id': contratacionId + 1 ,'nombrePerro': userActive.nombrePerro, 'tamanoPerro': userActive.tamanoPerro, 'estado': false});
    document.querySelector('#btnProcesarSolicitud').disabled = true;
}



