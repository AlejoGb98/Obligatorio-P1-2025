class Cliente{
    constructor(usuario, pass, nombrePerro, tamañoPerro){
        this.usuario = usuario;
        this.pass = pass;
        this.nombrePerro = nombrePerro;
        this.tamañoPerro = tamañoPerro;
        this.rol = 'cliente';
    }

}

class Paseador{
    constructor(id, usuario, pass, nombre, cupos){
        this.id = id;
        this.usuario = usuario;
        this.pass = pass;
        this.nombre = nombre;
        this.cupos = cupos;
        this.rol = 'paseador';
    }
}