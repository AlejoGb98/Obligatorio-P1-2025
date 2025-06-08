class Sistema{
    constructor(){
        this.paseadores = [
            new Paseador('0', 'mrodriguez', '1189', 'Martin Rodriguez', 8, 'paseador'),
            new Paseador('1', 'lpereira', '4521', 'Luciano Pereira', 12, 'paseador'),
            new Paseador('2', 'mrojas', '7093', 'Martina Rojas', 6, 'paseador'),
            new Paseador('3', 'lzapata', '3348', 'Leonardo Zapata', 20, 'paseador'),
            new Paseador('4', 'jpinola', '6217', 'Juan Pinola', 15, 'paseador'),
        ];
        this.clientes = [
            new Cliente('crodriguez', '1189', 'Rocky', 3, 'cliente'),
            new Cliente('mgomez', '4521', 'Luna', 2, 'cliente'),
            new Cliente('spereira', '7093', 'Simba', 4, 'cliente'),
            new Cliente('lfernandez', '3348', 'Nala', 3, 'cliente'),
            new Cliente('vmorales', '6217', 'Max', 4, 'cliente'),
            new Cliente('tramirez', '9084', 'Milo', 2, 'cliente'),
            new Cliente('fcastro', '1472', 'Kiara', 3, 'cliente'),
            new Cliente('mlopez', '3850', 'Toby', 4, 'cliente'),
            new Cliente('jnavarro', '2765', 'Coco', 1, 'cliente'),
            new Cliente('dcabrera', '8632', 'Bruno', 3, 'cliente'),
            new Cliente('mluna', '5631', 'Lola', 4, 'cliente'),
            new Cliente('rgarcia', '8024', 'Chispa', 1, 'cliente'),
            new Cliente('ccardozo', '1947', 'Bobby', 4, 'cliente'),
            new Cliente('jmartinez', '4783', 'Sasha', 3, 'cliente'),
            new Cliente('adelgado', '6570', 'Rocco', 4, 'cliente'),
            new Cliente('nfernandez', '3405', 'Mora', 2, 'cliente'),
            new Cliente('emendez', '7209', 'Zeus', 4, 'cliente'),
            new Cliente('fpaz', '1332', 'Fiona', 3, 'cliente'),
            new Cliente('rsilva', '9846', 'Greta', 2, 'cliente'),
            new Cliente('jrios', '2517', 'Duke', 4, 'cliente'),
        ];
    }

    login(user, pass){
        let paseadores = this.paseadores;
        let clientes = this.clientes;
        let allUsers = [...paseadores, ...clientes];

        let access = false;
        for(let i = 0; i < allUsers.length; i++){
           if(allUsers[i].usuario === user){
                if(allUsers[i].pass === pass){
                    access = true;
                }
            }
        }

        console.log(access)
    }

}