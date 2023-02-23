

import { DataTypes,Sequelize } from "sequelize";
import db from "../mysql/connection";


const Visitas = db.define('TCC01_visitas',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    dpi:{
        type:DataTypes.STRING
    },
    personaVista:{
        type:DataTypes.STRING
    },
    empresa:{
        type:DataTypes.STRING
    },
    horaEntrada:{
        type:DataTypes.STRING
    },
    horaSalida:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.STRING,
        defaultValue:'DENTRO'
    }
},{
    timestamps: true
});

export default Visitas