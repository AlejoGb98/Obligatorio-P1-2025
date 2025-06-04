class Cliente{
    constructor(usuario, pass, nombrePerro, tamañoPerro, rol){
        this.usuario = usuario;
        this.pass = pass;
        this.nombrePerro = nombrePerro;
        this.tamañoPerro = tamañoPerro;
        this.rol = rol;
    }

}

class Paseador{
    constructor(id, usuario, pass, nombre, cupos, rol){
        this.id = id;
        this.usuario = usuario;
        this.pass = pass;
        this.nombre = nombre;
        this.cupos = cupos;
        this.rol = rol;
    }
}