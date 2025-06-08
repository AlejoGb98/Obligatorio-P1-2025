window.addEventListener('load', inicio);
let system = new Sistema()

function inicio(){
    document.querySelector('#loginBtn').addEventListener('click', funcLogin);
} 

function funcLogin(){
    let user = document.querySelector('#txtUser').value;
    let pass = document.querySelector('#txtPass').value;

    system.login(user, pass);
    
}