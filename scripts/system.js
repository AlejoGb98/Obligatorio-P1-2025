class Sistema{
    constructor(){
        this.paseadores = [
            new Paseador('0', 'mrodriguez', 'Mro12', 'Martin Rodriguez', 8, 'paseador'),
            new Paseador('1', 'lpereira', 'Lp452', 'Luciano Pereira', 12, 'paseador'),
            new Paseador('2', 'mrojas', 'Mrj93', 'Martina Rojas', 6, 'paseador'),
            new Paseador('3', 'lzapata', 'Lz334', 'Leonardo Zapata', 20, 'paseador'),
            new Paseador('4', 'jpinola', 'Jp617', 'Juan Pinola', 15, 'paseador'),
        ];

        this.clientes = [
            new Cliente('crodriguez', 'Cr235', 'Rocky', 2, 'cliente'),
            new Cliente('mgomez', 'Mg352', 'Luna', 2, 'cliente'),
            new Cliente('spereira', 'Sp368', 'Simba', 4, 'cliente'),
            new Cliente('lfernandez', 'Lf178', 'Nala', 2, 'cliente'),
            new Cliente('vmorales', 'Vm261', 'Max', 4, 'cliente'),
            new Cliente('tramirez', 'Tr908', 'Milo', 2, 'cliente'),
            new Cliente('fcastro', 'Fc147', 'Kiara', 4, 'cliente'),
            new Cliente('mlopez', 'Ml385', 'Toby', 4, 'cliente'),
            new Cliente('jnavarro', 'Jn276', 'Coco', 1, 'cliente'),
            new Cliente('dcabrera', 'Dc863', 'Bruno', 2, 'cliente'),
            new Cliente('mluna', 'Ml563', 'Lola', 4, 'cliente'),
            new Cliente('rgarcia', 'Rg802', 'Chispa', 1, 'cliente'),
            new Cliente('ccardozo', 'Cc194', 'Bobby', 4, 'cliente'),
            new Cliente('jmartinez', 'Jm478', 'Sasha', 1, 'cliente'),
            new Cliente('adelgado', 'Ad657', 'Rocco', 1, 'cliente'),
            new Cliente('nfernandez', 'Nf340', 'Mora', 2, 'cliente'),
            new Cliente('emendez', 'Em720', 'Zeus', 4, 'cliente'),
            new Cliente('fpaz', 'Fp133', 'Fiona', 4, 'cliente'),
            new Cliente('rsilva', 'Rs984', 'Greta', 1, 'cliente'),
            new Cliente('jrios', 'Jr251', 'Duke', 4, 'cliente'),
        ];
    }

    login(user, pass){
        let allUsers = [...paseadores, ...clientes];
        let clientes = this.clientes;
        let paseadores = this.paseadores;

        let access = false;
        let userType;

        for(let i = 0; i < allUsers.length; i++){
           if(allUsers[i].usuario === user){
                if(allUsers[i].pass === pass){
                    access = true;
                    userType = allUsers[i].rol;
                }
            }
        }

        return {access, userType}
    }

    signup(user, pass, mascota, tamano){
        let existe = false;
        console.log(...paseadores)
        //let allUsers = [...paseadores, ...clientes];


        for(let i = 0; i < allUsers.length; i++){
            if(allUsers[i].usuario != user){
                console.log('no existen dos usuarios iguales')
            }
        }
    }




}

function comprobarContraseña(pass){
    let mayus = false;
    let minus = false;
    let num = false;

    for(let i = 0; i < pass.length; i++){
        if(pass.charAt[i] === pass.charAt[i].toUpperCase()){
            mayus = true;
        } else if(pass.charAt[i] === pass.charAt[i].toLowerCase()){
            minus = true;
        } else if(pass.charCodeAt(i) > 47 && pass.charCodeAt(i) < 58){
            num = true;
        }
    }

    if(mayus && minus && num){
        return true;
    }
}