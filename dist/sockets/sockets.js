"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje2 = exports.mensaje = exports.desconectar = exports.obtenerUsuarios = exports.loginWS = exports.conectarClinte = exports.usuarioConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
const visitas_1 = __importDefault(require("../models/visitas"));
exports.usuarioConectados = new usuarios_lista_1.UserList();
const conectarClinte = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuarioConectados.agregar(usuario);
    io.emit('usuarios-activos', exports.usuarioConectados.getLista());
};
exports.conectarClinte = conectarClinte;
const loginWS = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuarioConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuarioConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
exports.loginWS = loginWS;
//obtener usuarios para cuando entramos nos cargue toda la lista
const obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuarioConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        exports.usuarioConectados.borrarUsuario(cliente.id);
    });
};
exports.desconectar = desconectar;
//TODO: agarraremos este metodo como modelo para manipular datos entre la base de dtos y el backend
/**
 *  Escuchar el metodo para crear y retornar VISITAS SOCKET
 * @param cliente Cliente conectado via socket
 * @param io Instancia de socket
 */
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        visitas_1.default.create({
            nombre: payload.nombre,
            dpi: payload.dpi,
            personaVista: payload.personaVista,
            empresa: payload.empresa,
            horaEntrada: payload.horaEntrada,
            horaSalida: payload.horaSalida,
            descripcion: payload.descripcion
        }).then(() => {
            console.log('Insertado Correctamente!!');
            io.emit('mensaje-nuevo', payload);
        })
            .catch(error => console.log(error));
    });
};
exports.mensaje = mensaje;
///metodo socket para seguridad y su vista de datos en tiempo real 
////registro de ingreso de personal 
const mensaje2 = (cliente, io) => {
    cliente.on('mensaje2', (payload) => {
        console.log('Mensaje recibido', payload); //esto nos trae el nombre de usuarios qeu dira presente
        io.emit('mensaje2-nuevo', payload);
    });
};
exports.mensaje2 = mensaje2;
