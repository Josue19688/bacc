"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUsuario = exports.putUsuario = exports.postUsuarios = exports.getUsuarios = exports.getUserDetails = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const generarWJT_1 = __importDefault(require("../helpers/generarWJT"));
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield usuario_1.default.scope('withoutPassword').findByPk(id);
    if (!user) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'
        });
    }
    res.json({
        ok: true,
        user
    });
});
exports.getUserDetails = getUserDetails;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.scope('withoutPassword').findAll();
    res.json({
        ok: true,
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const postUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol, estado } = req.body;
    const existeEmail = yield usuario_1.default.findOne({
        where: {
            email: email
        }
    });
    if (existeEmail) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe'
        });
    }
    const salt = bcryptjs_1.default.genSaltSync(10);
    const passEncrypt = bcryptjs_1.default.hashSync(password, salt);
    usuario_1.default.create({ nombre: nombre,
        email: email,
        password: passEncrypt,
        rol: rol,
        estado: estado })
        .then(() => {
        res.json({
            ok: true,
            msg: 'Usuario creado correctamente!!'
        });
    })
        .catch(error => {
        return res.status(400).json({
            ok: false,
            error
        });
    });
});
exports.postUsuarios = postUsuarios;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, email, password, rol, estado } = req.body;
    try {
        const user = yield usuario_1.default.scope('withoutPassword').findByPk(id);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuariono existe'
            });
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const passEncrypt = bcryptjs_1.default.hashSync(password, salt);
        const updateUser = yield usuario_1.default.update({
            nombre: nombre,
            email: email,
            password: passEncrypt,
            rol: rol,
            estado: estado
        }, {
            where: {
                id: id
            }
        });
        res.json({
            ok: true,
            updateUser
        });
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al actualizar el usuario',
            error
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield usuario_1.default.scope('withoutPassword').findByPk(id);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuariono existe'
            });
        }
        const usuario = yield usuario_1.default.destroy({
            where: {
                id: id
            }
        });
        res.json({
            ok: true,
            mgs: 'Usuario eliminado.',
            usuario
        });
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al eliminar el usuario',
            error
        });
    }
});
exports.deleteUsuario = deleteUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena } = req.body;
    try {
        //TODO: VERIFICAR EL EMAEL
        const usuario = yield usuario_1.default.findOne({
            where: {
                email: correo
            }
        });
        const { estado } = usuario === null || usuario === void 0 ? void 0 : usuario.dataValues;
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o Contraseña no son válidos!!'
            });
        }
        //TODO: VERIFICAR SI EL USUARIO ESTA ACTIVO
        if (estado == false) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario Invalido'
            });
        }
        //TODO: VERIFICAR LA CONTRASEÑA
        const validPassword = bcryptjs_1.default.compare(contrasena, usuario.dataValues.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o Contraseña no son válidos-pass'
            });
        }
        //TODO: GENERAR EL JWT
        const token = yield (0, generarWJT_1.default)(usuario.dataValues.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al Autenticarse',
        });
    }
});
exports.login = login;
// function generarWJT(id: any) {
//     throw new Error('Function not implemented.');
// }
//metodod para obtener los usuarios conectados via socket
// export const getUsuarios=((req:Request,res:Response)=>{
//     const server  =  ServerSocket.instance;
//     const data:any[] = [];
//     server.io.fetchSockets()
//         .then(resp=>{
//             for(let i in resp){
//                 data.push(resp[i].id);
//             }   
//             res.json({
//                 ok:true,
//                dato:data
//             })
//         }).catch(function(e) {
//             console.log('Error al mostra el id del usuarios:',e); // "oh, no!"
//         });
// });
//obtener usuarios por id y sus nombres
// export const getUsuariosDetalles=((req:Request,res:Response)=>{
//     res.json({
//         ok:true,
//         data:usuarioConectados.getLista()
//     })
// })
