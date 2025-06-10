window.addEventListener('load', inicio);
let system = new Sistema()

let logged = false;
let userActive = null;


function inicio(){
    ocultarSecciones();
    document.querySelector("#logout").style.display = 'none';


    document.querySelector('#btnLogin').addEventListener('click', funcLogin);
    document.querySelector('#btnSignup').addEventListener('click', funcSignup);
    //document.querySelector("#btnLogout").addEventListener('click', logOut);


    document.querySelector("#login").style.display = 'block';
    document.querySelector("#btnToLogin").addEventListener('click', funcSwitchLog);
    document.querySelector("#btnToSignup").addEventListener('click', funcSwitchLog);
    document.querySelector("#logout").addEventListener('click', logOut);

}

//FUNCIONES DE MUESTREO
function ocultarSecciones(){
    let sections = document.querySelectorAll('section');
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
    console.log(log)
    return
    if(log.access){
        logged = true;
        userActive = log.userActive
        document.querySelector("#logout").style.display = 'block';

        ocultarSecciones();
        switch(log.userActive.userType){
            case 'cliente' : mostrarSeccion('interfazCliente');
                break;
            case 'paseador' : mostrarSeccion('interfazPaseador');
                break;
        }
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
    ocultarSecciones();
    mostrarSeccion('login');
}

function funcSwitchLog(){
    let idBtn = this.getAttribute('id');
    ocultarSecciones();
    
    switch(idBtn){
        case 'btnToLogin' : mostrarSeccion('login');
            break;
        case 'btnToSignup' : mostrarSeccion('signup');
            break;
    }
}





