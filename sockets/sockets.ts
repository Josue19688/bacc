

import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UserList } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";
import Visitas from "../models/visitas";


export const usuarioConectados=new UserList();


export const conectarClinte=(cliente:Socket,io:socketIO.Server)=>{

    const usuario = new Usuario(cliente.id);
    usuarioConectados.agregar(usuario);
    io.emit('usuarios-activos',usuarioConectados.getLista());
}



export const loginWS=(cliente:Socket,io:socketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string}, callback:Function)=>{
       
        usuarioConectados.actualizarNombre(cliente.id,payload.nombre);
        io.emit('usuarios-activos',usuarioConectados.getLista());
        callback({
            ok:true,
            mensaje:`Usuario ${payload.nombre}, configurado`
        })
    })
}

//obtener usuarios para cuando entramos nos cargue toda la lista

export const obtenerUsuarios=(cliente:Socket,io:socketIO.Server)=>{
    cliente.on('obtener-usuarios',()=>{
       
        io.to(cliente.id).emit('usuarios-activos',usuarioConectados.getLista());
    
    })
}


export const desconectar = (cliente:Socket,io:socketIO.Server)=>{
    cliente.on('disconnect',()=>{
        usuarioConectados.borrarUsuario(cliente.id);
       
    })
}


//TODO: agarraremos este metodo como modelo para manipular datos entre la base de dtos y el backend

/**
 *  Escuchar el metodo para crear y retornar VISITAS SOCKET
 * @param cliente Cliente conectado via socket
 * @param io Instancia de socket 
 */

export const mensaje=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('mensaje',(payload:{nombre:string, 
        dpi:string, 
        personaVista:string,
        empresa:string,
        horaEntrada:string,
        horaSalida:string,
        descripcion:string})=>{
        console.log('Mensaje recibido', payload);
    

        Visitas.create({
            nombre:payload.nombre,
            dpi:payload.dpi,
            personaVista:payload.personaVista,
            empresa:payload.empresa,
            horaEntrada:payload.horaEntrada,
            horaSalida:payload.horaSalida,
            descripcion:payload.descripcion
        }).then(()=>{
            console.log('Insertado Correctamente!!');
            io.emit('mensaje-nuevo',payload);
        })
        .catch(error=>console.log(error));
    })
}
///metodo socket para seguridad y su vista de datos en tiempo real 
////registro de ingreso de personal 
export const mensaje2=(cliente:Socket, io:socketIO.Server)=>{
    cliente.on('mensaje2',(payload:{de:string, cuerpo:string})=>{
        console.log('Mensaje recibido', payload);//esto nos trae el nombre de usuarios qeu dira presente
        
      

        io.emit('mensaje2-nuevo',payload);
    })
}
