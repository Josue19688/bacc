"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../mysql/connection"));
const Visitas = connection_1.default.define('TCC01_visitas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    dpi: {
        type: sequelize_1.DataTypes.STRING
    },
    personaVista: {
        type: sequelize_1.DataTypes.STRING
    },
    empresa: {
        type: sequelize_1.DataTypes.STRING
    },
    horaEntrada: {
        type: sequelize_1.DataTypes.STRING
    },
    horaSalida: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    timestamps: true
});
exports.default = Visitas;
