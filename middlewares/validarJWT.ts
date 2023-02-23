

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuarios from '../models/usuario';

interface JwtPayload {
    id: string

}


export const validarToken = async (req:Request, res:Response, next:any) => {
    
    
    const token =  req.header('x-token');
   

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No tiene autorización'
        })
    }
    
    try {

        const {id} = jwt.verify(token, 'CCdGc1AA12O23') as JwtPayload;

        const usuario = await Usuarios.findByPk(id);
        
        if(!usuario){
            return res.status(401).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }

        const {estado} = usuario?.dataValues;
       
        if(!estado){
            return res.status(401).json({
                ok:false,
                msg:'No tiene autorización para realizar la tarea'
            })
        }
        res.locals.usuario = usuario;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token invalido!'
        })
    }


    
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



//     } catch (error) {
//         res.status(401).json({
//             ok:false,
//             msg:'Token invalido!'
//         })
//     }    
