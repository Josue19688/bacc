

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
    descripcion:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    created_at: {
        type:DataTypes.DATE
    },
   
},{
    timestamps: false
});

export default Visitas