class Sistema{
    constructor(){
        this.paseadores = [
            new Paseador(1, 'mrodriguez', 'Mro12', 'Martin Rodriguez', 12),
            new Paseador(2, 'lpereira', 'Lp452', 'Luciano Pereira', 20),
            new Paseador(3, 'mrojas', 'Mrj93', 'Martina Rojas', 12),
            new Paseador(4, 'lzapata', 'Lz334', 'Leonardo Zapata', 8),
            new Paseador(5, 'jpinola', 'Jp617', 'Juan Pinola', 7),
        ];
        this.clientes = [
            new Cliente(1, 'tramirez', 'Tr908', 'Milo', 2),
            new Cliente(2, 'fcastro', 'Fc147', 'Kiara', 4),
            new Cliente(3, 'mlopez', 'Ml385', 'Toby', 4),
            new Cliente(4, 'jnavarro', 'Jn276', 'Coco', 2), 
            new Cliente(5, 'dcabrera', 'Dc863', 'Bruno', 2), 
            new Cliente(6, 'mluna', 'Ml563', 'Lola', 4),
            new Cliente(7, 'rgarcia', 'Rg802', 'Chispa', 1),
            new Cliente(8, 'ccardozo', 'Cc194', 'Bobby', 4),
            new Cliente(9, 'jmartinez', 'Jm478', 'Sasha', 1),
            new Cliente(10, 'rmorales', 'Rm253', 'Pancho', 2), 
            new Cliente(11, 'alopez', 'Al243', 'Mango', 4),
            new Cliente(12, 'mramirez', 'Mr406', 'Rosqui', 1),
            new Cliente(13, 'cpardo', 'Cp244', 'Lima', 2),
            new Cliente(14, 'vrodriguez', 'Vr298', 'Gema', 1),
            new Cliente(15, 'srivas', 'Sr183', 'Pompon', 2),
            new Cliente(16, 'vnunez', 'Vn133', 'Pichon', 4),
            new Cliente(17, 'mherrera', 'Mh118', 'Zeus', 4),
            new Cliente(18, 'jfernandez', 'Jf925', 'Chiqui', 1),
            new Cliente(19, 'rramirez', 'Rr200', 'Morte', 4),
            new Cliente(20, 'jracedo', 'Jr492', 'Dora', 2)
        ];
        this.contrataciones = [
            new Contratacion(1, {'id': 2, 'usuario': 'lpereira', 'pass': 'Lp452', 'nombre': 'Luciano Pereira', 'cupos': 36, 'rol': 'paseador'},
                                {'id': 10, 'usuario': 'rmorales', 'pass': 'Rm253', 'nombrePerro': 'Pancho', 'tamanoPerro': 2 }, 'Aceptado'),
            new Contratacion(3, {'id': 2, 'usuario': 'lpereira', 'pass': 'Lp452', 'nombre': 'Luciano Pereira', 'cupos': 36, 'rol': 'paseador'}, 
                                {'id': 15, 'usuario': 'srivas', 'pass': 'Sr183', 'nombrePerro': 'Pompon', 'tamanoPerro': 2 },'Rechazada'),
            new Contratacion(5, {'id': 2, 'usuario': 'lpereira', 'pass': 'Lp452', 'nombre': 'Luciano Pereira', 'cupos': 36, 'rol': 'paseador'},
                                {'id': 17, 'usuario': 'mherrera', 'pass': 'Mh118', 'nombrePerro': 'Zeus', 'tamanoPerro': 4 },'Pendiente'),
            new Contratacion(7, {'id': 2, 'usuario': 'lpereira', 'pass': 'Lp452', 'nombre': 'Luciano Pereira', 'cupos': 36, 'rol': 'paseador'},
                                {'id': 4, 'usuario': 'jnavarro', 'pass': 'Jn276', 'nombrePerro': 'Coco', 'tamanoPerro': 2 }, 'Aceptado'),
            new Contratacion(8, {'id': 3, 'usuario': 'mrojas', 'pass': 'Mrj93', 'nombre': 'Martina Rojas', 'cupos': 12, 'rol': 'paseador'},
                                {'id': 15, 'usuario': 'srivas', 'pass': 'Sr183', 'nombrePerro': 'Pompon', 'tamanoPerro': 2 },'Pendiente'),
            new Contratacion(11, {'id': 2, 'usuario': 'lpereira', 'pass': 'Lp452', 'nombre': 'Luciano Pereira', 'cupos': 36, 'rol': 'paseador'},
                                 {'id': 13, 'usuario': 'cpardo', 'pass': 'Cp244', 'nombrePerro': 'Lima', 'tamanoPerro': 2 },'Pendiente'),
            new Contratacion(12, {'id': 2, 'usuario': 'lpereira', 'pass': 'Lp452', 'nombre': 'Luciano Pereira', 'cupos': 36, 'rol': 'paseador'},
                                 {'id': 3, 'usuario': 'mlopez', 'pass': 'Ml385', 'nombrePerro': 'Toby', 'tamanoPerro': 4 },'Aceptado'),
            new Contratacion(13, {'id': 2, 'usuario': 'lpereira', 'pass': 'Lp452', 'nombre': 'Luciano Pereira', 'cupos': 36, 'rol': 'paseador'},
                                 { 'id': 2, 'usuario': 'fcastro', 'pass': 'Fc147', 'nombrePerro': 'Kiara', 'tamanoPerro': 4 }, 'Pendiente'),
            new Contratacion(15, {'id': 2, 'usuario': 'lpereira', 'pass': 'Lp452', 'nombre': 'Luciano Pereira', 'cupos': 36, 'rol': 'paseador'},
                                 {'id': 8, 'usuario': 'ccardozo', 'pass': 'Cc194', 'nombrePerro': 'Bobby', 'tamanoPerro': 4 },'Aceptado'),
            new Contratacion(6, {'id': 3, 'usuario': 'mrojas', 'pass': 'Mrj93', 'nombre': 'Martina Rojas', 'cupos': 12, 'rol': 'paseador'},
                                {'id': 5, 'usuario': 'dcabrera', 'pass': 'Dc863', 'nombrePerro': 'Bruno', 'tamanoPerro': 2 },'Pendiente'),
            new Contratacion(9, {'id': 3, 'usuario': 'mrojas', 'pass': 'Mrj93', 'nombre': 'Martina Rojas', 'cupos': 12, 'rol': 'paseador'},
                                { 'id': 7, 'usuario': 'rgarcia', 'pass': 'Rg802', 'nombrePerro': 'Chispa', 'tamanoPerro': 1 },'Pendiente'),
            new Contratacion(14, {'id': 3, 'usuario': 'mrojas', 'pass': 'Mrj93', 'nombre': 'Martina Rojas', 'cupos': 12, 'rol': 'paseador'},
                                { 'id': 6, 'usuario': 'mluna', 'pass': 'Ml563', 'nombrePerro': 'Lola', 'tamanoPerro': 4 }, 'Pendiente'),
            new Contratacion(10, {'id': 4, 'usuario': 'lzapata', 'pass': 'Lz334', 'nombre': 'Leonardo Zapata', 'cupos': 8, 'rol': 'paseador'},
                                 {'id': 9, 'usuario': 'jmartinez', 'pass': 'Jm478', 'nombrePerro': 'Sasha', 'tamanoPerro': 1 }, 'Pendiente'),
            new Contratacion(4, {'id': 4, 'usuario': 'lzapata', 'pass': 'Lz334', 'nombre': 'Leonardo Zapata', 'cupos': 8, 'rol': 'paseador'}, 
                                {'id': 1, 'usuario': 'tramirez', 'pass': 'Tr908', 'nombrePerro': 'Milo', 'tamanoPerro': 2 }, 'Aceptado'),
            new Contratacion(2, {'id': 1, 'usuario': 'mrodriguez', 'pass': 'Mro12', 'nombre': 'Martin Rodriguez', 'cupos': 12, 'rol': 'paseador'},
                                {'id': 12, 'usuario': 'mramirez', 'pass': 'Mr406', 'nombrePerro': 'Rosqui', 'tamanoPerro': 1 },'Aceptado')
        ]
    }

    login(user, pass){ // funcion que usamos al iniciar sesion
        let userActive = null;
        let access = false;
        let msj = 'El usuario ingresado no es valido.';
        
        if(this.buscarObjeto(this.clientes, 'usuario', user)){
            userActive = this.buscarObjeto(this.clientes, 'usuario', user);
        } else if(this.buscarObjeto(this.paseadores, 'usuario', user)){
            userActive = this.buscarObjeto(this.paseadores, 'usuario', user);
        }
        
        if(userActive){  
            if(userActive.pass === pass){
                access = true;
            } else{
                msj = 'La contraseña es incorrecta.';
            }
        }
        
        return {access, userActive, msj}
    }

    signup(user, pass, mascota, tamano){ // funcion que usamos para registrarse
        let registroExitoso = false;
        let usuarioExiste = false;
        let msj = 'Debe ingresar un usuario';
        let idClienteNuevo = system.clientes.length + 1;

        if(user.length > 0){
            for(let i = 0; i < system.clientes.length; i++){
                if(system.clientes[i].usuario.toLowerCase() === user.toLowerCase()){
                    msj = 'El usuario ya existe. Por favor, elija otro.'
                    usuarioExiste = true;
                }
            }
            
            if(!usuarioExiste){
                if(this.comprobarContrasena(pass)){
                    if(mascota.length > 0){
                        if(tamano > 0){
                            this.clientes.push(new Cliente(idClienteNuevo, user, pass, mascota, tamano))
                            registroExitoso = true;
                            msj = 'Registro exitoso.'
                        } else{
                            msj = 'Debe seleccionar un tamaño.'
                        }
                    } else{
                        msj = 'Debe ingresar el nombre de su mascota.'
                    }
                } else{
                    msj = 'La contraseña debe tener al menos una mayuscula, una minuscula y un numero.'
                }
            }
        }
        return {registroExitoso, msj}
    }
    
    comprobarContrasena(pass){ // funcion para comprobar que la contrasena sea valida
        let mayus = false;
        let minus = false;
        let num = false;
    
        for(let i = 0; i < pass.length; i++){
            if(pass.charCodeAt(i) > 47 && pass.charCodeAt(i) < 58){
                num = true;
            } else if(pass.charAt(i) === pass.charAt(i).toUpperCase()){
                mayus = true;
            } else if(pass.charAt(i) === pass.charAt(i).toLowerCase()){
                minus = true;   
            }
        }
    
        if(mayus && minus && num){
            return true;
        }
    
        return false;
    }

    buscarObjeto(array, parametro, busqueda){ // funcion que busca y retorna un objeto
        for(let i = 0; i < array.length; i++){
            if(array[i][parametro] === busqueda){
                return array[i]
            }
        }
        return false;
    }

    obtenerPaseosConEstado(idPaseador, estado){
        let paseosConEstado = [];
        for(const contratacion of this.contrataciones){
            if(idPaseador === contratacion.datosPaseador.id && contratacion.estado === estado){
                paseosConEstado.push(contratacion)
            }
        }

        return paseosConEstado;
    }

    obtenerCuposOcupados(idPaseador){
        let cuposOcupados = 0;

        for(const contratacion of this.contrataciones){
            if(idPaseador === contratacion.datosPaseador.id && contratacion.estado === 'Aceptado'){
                cuposOcupados += contratacion.datosCliente.tamanoPerro;
            }
        }

        return cuposOcupados
    }

    obtenerEstadoContratacion(idCliente){
        let estado = false;
        for(const contratacion of this.contrataciones){
            if(contratacion.datosCliente.id === idCliente){
                estado = contratacion.estado; 
            }
        }
        return estado
    }    
    
    cancelarContratacion(idCliente){
        for(const contratacion of system.contrataciones){
            if(contratacion.datosCliente.id === idCliente && contratacion.estado === 'Pendiente'){
                contratacion.estado = 'Cancelada';
            }
        }
    }
    
    agregarContratacion(contratacion){
        this.contrataciones.push(contratacion);
    }
}