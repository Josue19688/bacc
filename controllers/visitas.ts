import { Request, Response } from "express";
import Visitas from "../models/visitas";


export const getVisita =async (req:Request, res:Response) => {
    
    const {id} = req.params;


    try {
        const existeVisita = await Visitas.findByPk(id);
        if(!existeVisita){
            return res.status(400).json({
                ok:false,
                msg:'El registro no existe'
            })
        }

        res.json({
            ok:true,
            existeVisita
        });


    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al obtener el registro'
        });
    }
}

export const getVisitas =async (req:Request, res:Response) => {

    const {proceso} = req.query;

    
    try {
        const visitas = await Visitas.findAll({
            where:{
                estado:proceso
            }
        });
        res.json({
            ok:true,
            visitas,
            proceso
        })
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Error al obtener el registro'
        })
    }
}


export const postVisitas =async (req:Request, res:Response) => {
    const {
        nombre, 
        dpi, 
        personaVista, 
        empresa, 
        horaEntrada, 
        horaSalida,
        descripcion } = req.body;


    try {

        Visitas.create({
            nombre:nombre,
            dpi:dpi,
            personaVista:personaVista,
            empresa:empresa,
            horaEntrada:horaEntrada,
            horaSalida:horaSalida,
            descripcion:descripcion
        }).then(()=>{
            res.json({
                ok:true,
                msg:'Visita Creada exitosamente'
            });
        }).catch(error=>{
            return res.status(400).json({
                ok:false,
                msg:'Error al crear el registro'
            })
        });

        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Error al crear el registro'
        })
    }
}


export const putVisita =async (req:Request, res:Response) => {
    
    const {id} = req.params;
    const {
        nombre, 
        dpi, 
        personaVista, 
        empresa, 
        horaEntrada, 
        horaSalida,
        descripcion } = req.body;

    try {
        

        const existeVisita = await Visitas.findByPk(id);

        if(!existeVisita){
            return res.status(400).json({
                ok:false,
                msg:'El registro no existe'
            })
        }


        const updateVisita =  await Visitas.update({
            nombre:nombre,
            dpi:dpi,
            personaVista:personaVista,
            empresa:empresa,
            horaEntrada:horaEntrada,
            horaSalida:horaSalida,
            descripcion:descripcion
        },{
            where:{
                id:id
            }
        });
        res.json({
            ok:true,
            updateVisita
        })

    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Error al actualizar el registro'
        })
    }
}


export const deleteVisita =async (req:Request, res:Response) => {
    const {id} = req.params;

    try {

        const existeVisita = await Visitas.findByPk(id);
        if(!existeVisita){
            return res.status(400).json({
                ok:false,
                msg:'El registro no existe.'
            })
        }

        const visita =  await Visitas.destroy({
            where:{
                id:id
            }
        })

        res.json({
            ok:false,
            msg:'Visita eliminada',
            visita
        })
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Error al eliminar el registro'
        })
    }
}