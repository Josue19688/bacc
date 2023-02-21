import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Usuarios from '../models/usuario';



const generarToken = async(id:String)=>{
    return new Promise((resolve,reject)=>{
        const payload ={id};

        jwt.sign(payload,'CCdGc1AA12O23',{
            expiresIn:'4h'
        },(err:any,token:any)=>{
            if(err){
                reject('No se genero el token');
            }else{
                resolve(token);
            }
        })
    })
}

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

export default generarToken





