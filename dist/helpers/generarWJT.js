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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, 'CCdGc1AA12O23', {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('No se genero el token');
            }
            else {
                resolve(token);
            }
        });
    });
});
// const validarJWT =async (req:Request, res:Response,next:any) => {
//     const token= req.header('x-token');
//     if(!token){
//         return res.status(401).json({
//             ok:false,
//             msg:'No tiene autorización para realizar la tarea'
//         })
//     }
//     try {
//         const payload = jwt.verify(token, 'CCdGc1AA12O23');
//         const usuario = await Usuarios.findByPk(payload.);
//         if(!usuario){
//             return res.status(401).json({
//                 ok:false,
//                 msg:'El usuario no existe'
//             })
//         }
//         console.log(payload);
//         //TODO: VERIFICAR EL ESTADO DEL USUARIO
//         // if(!usuario.estado){
//         //     return res.status(401).json({
//         //         ok:false,
//         //         msg:'No tiene autorización para realizar la tarea'
//         //     })
//         // }
//         //req.usuario=usuario;
//         next();
//     } catch (error) {
//         res.status(401).json({
//             ok:false,
//             msg:'Token invalido!'
//         })
//     }    
// }
exports.default = generarToken;
