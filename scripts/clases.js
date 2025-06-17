class Cliente{
    constructor(id, usuario, pass, nombrePerro, tamanoPerro){
        this.id = id;
        this.usuario = usuario;
        this.pass = pass;
        this.nombrePerro = nombrePerro;
        this.tamanoPerro = tamanoPerro;
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

class Contratacion{
    constructor(idContratacion, datosPaseador, datosCliente, estado){
        this.id = idContratacion;
        this.datosPaseador = datosPaseador;
        this.datosCliente = datosCliente;
        this.estado = estado;
    }
}