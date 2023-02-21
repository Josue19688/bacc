

import { DataTypes,Sequelize } from "sequelize";
import db from "../mysql/connection";


const Usuarios = db.define('TCC01_usuarios',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    rol:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    created_at: {
        type:DataTypes.DATEONLY
    },
   
},{
    timestamps: false,
    scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] },
        }
    }
});


export default Usuarios