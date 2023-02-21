"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
exports.router = (0, express_1.Router)();
/**
 * Ruteo de usuarios
 */
exports.router.get('/usuario', usuariosController_1.getUsuarios);
exports.router.get('/usuario/:id', usuariosController_1.getUserDetails);
exports.router.post('/usuario', usuariosController_1.postUsuarios);
exports.router.put('/usuario/:id', usuariosController_1.putUsuario);
exports.router.delete('/usuario/:id', usuariosController_1.deleteUsuario);
/**
 * Autenticacion de usuarios
 */
exports.router.post('/auth', usuariosController_1.login);
// router.post('/login',[
//     check('correo','El correo es obligatorio').isEmail().notEmpty(),
//     check('password','La contraseña es obligatoria minimo de 6 digitos.').notEmpty(),
//     validarCampos],
//     getLogin
// );
// router.post('/mensajes',mensajes);
// router.get('/mensajes',getMensajes);
// router.post('/mensajes/:id',postMensajes);
// router.get('/usuarios/detalle',getUsuariosDetalles);
// router.get('/userdb',getUsuariosDB);
/*Rutas para los registros de seguridad */
// router.post('/registroseg',registroMovimiento);
