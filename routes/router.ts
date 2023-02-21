
import {Router} from 'express';
import {check} from 'express-validator';

import { getUserDetails, getUsuarios, postUsuarios, putUsuario, deleteUsuario, login } from '../controllers/usuariosController';
import { validarCampos } from '../middlewares/validator-campos';


export const router = Router();


/**
 * Ruteo de usuarios 
 */
router.get('/usuario',getUsuarios);
router.get('/usuario/:id',getUserDetails);
router.post('/usuario',postUsuarios);
router.put('/usuario/:id',putUsuario);
router.delete('/usuario/:id',deleteUsuario);

/**
 * Autenticacion de usuarios
 */
router.post('/auth',login);

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

