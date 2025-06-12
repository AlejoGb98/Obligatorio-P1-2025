class Cliente{
    constructor(usuario, pass, nombrePerro, tamanoPerro){
        this.usuario = usuario;
        this.pass = pass;
        this.nombrePerro = nombrePerro;
        this.tamanoPerro = tamanoPerro;
        this.rol = 'cliente';
        this.solicitudActiva = false;
    }

}

class Paseador{
    constructor(id, usuario, pass, nombre, cupos, contrataciones){
        this.id = id;
        this.usuario = usuario;
        this.pass = pass;
        this.nombre = nombre;
        this.cupos = cupos;
        this.contrataciones = contrataciones
        this.rol = 'paseador';
    }
}