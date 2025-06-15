class Sistema{
    constructor(){
      this.paseadores = [
            new Paseador('0', 'mrodriguez', 'Mro12', 'Martin Rodriguez', 12, 
                [
                    ,
                    {'id': 4, 'nombrePerro': 'Milo', 'tamanoPerro': 2, 'estado': true}
                ]),
            new Paseador('1', 'lpereira', 'Lp452', 'Luciano Pereira', 36,
                [
                    {'id': 7, 'nombrePerro': 'Coco', 'tamanoPerro': 2, 'estado': true}, 
                    {'id': 1, 'nombrePerro': 'Max', 'tamanoPerro': 4, 'estado': true },
                    {'id': 3, 'nombrePerro': 'Luna', 'tamanoPerro': 2, 'estado': true },
                    {'id': 8, 'nombrePerro': 'Simba', 'tamanoPerro': 4, 'estado': false },
                    {'id': 11, 'nombrePerro': 'Nala', 'tamanoPerro': 2, 'estado': false },
                    {'id': 15, 'nombrePerro': 'Rocky', 'tamanoPerro': 2, 'estado': true },
                    {'id': 12, 'nombrePerro': 'Toby', 'tamanoPerro': 4, 'estado': true },
                    {'id': 13, 'nombrePerro': 'Kiara', 'tamanoPerro': 4, 'estado': false },
                    {'id': 5, 'nombrePerro': 'Zeus', 'tamanoPerro': 4, 'estado': false },

                ] 
             ),
            new Paseador(2, 'mrojas', 'Mrj93', 'Martina Rojas', 12,[]
            ),
            new Paseador(3, 'lzapata', 'Lz334', 'Leonardo Zapata', 8,
                [
                    {'id': 6, 'nombrePerro': 'Bruno', 'tamanoPerro': 2, 'estado': true},
                    {'id': 14, 'nombrePerro': 'Lola', 'tamanoPerro': 1, 'estado': false },
                    {'id': 9, 'nombrePerro': 'Chispa', 'tamanoPerro': 1, 'estado': false }
                ]
            ),
            new Paseador(4, 'jpinola', 'Jp617', 'Juan Pinola', 7,
                [
                    {'id': 10, 'nombrePerro': 'Sasha', 'tamanoPerro': 1, 'estado': false}
                ]
            ),
        ];
            this.clientes = [
            new Cliente('tramirez', 'Tr908', 'Milo', 2),
            new Cliente('fcastro', 'Fc147', 'Kiara', 4),
            new Cliente('mlopez', 'Ml385', 'Toby', 4),
            new Cliente('jnavarro', 'Jn276', 'Coco', 2), 
            new Cliente('dcabrera', 'Dc863', 'Bruno', 2), 
            new Cliente('mluna', 'Ml563', 'Lola', 1),
            new Cliente('rgarcia', 'Rg802', 'Chispa', 1),
            new Cliente('ccardozo', 'Cc194', 'Bobby', 4),
            new Cliente('jmartinez', 'Jm478', 'Sasha', 1)
        ]
    }

    login(user, pass){
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

    signup(user, pass, mascota, tamano){
        let registroExitoso = false;
        let usuarioExiste = false;
        let msj = 'Debe ingresar un usuario';

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
                            this.clientes.push(new Cliente(user, pass, mascota, tamano))
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
    
    comprobarContrasena(pass){
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

    buscarObjeto(array, parametro, busqueda){
        for(let i = 0; i < array.length; i++){
            if(array[i][parametro] === busqueda){
                return array[i]
            }
        }
        return false;
    }

    

}