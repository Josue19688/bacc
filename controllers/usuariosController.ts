import { Request, Response} from 'express';
import bcryptjs from 'bcryptjs'

import Usuarios from '../models/usuario';
import generarToken from '../helpers/generarWJT';





export const getUserDetails =async (req:Request, res:Response) => {
    const {id} = req.params;

    const user= await Usuarios.scope('withoutPassword').findByPk(id);

    if(!user){
        return res.status(400).json({
            ok:false,
            msg:'El usuario no existe'
        })
    }

    res.json({
        ok:true,
        user
    })
};

export const getUsuarios =async (req:Request, res:Response) => {

   
    const usuarios = await Usuarios.scope('withoutPassword').findAll();
    res.json({
        ok:true,
        usuarios
    })
}

export const postUsuarios =async(req:Request, res:Response) => {
    const {nombre, email, password,rol,estado} = req.body;

    const existeEmail = await Usuarios.findOne({
        where:{
            email:email
        }
    });

    if(existeEmail){
        return res.status(400).json({
            ok:false,
            msg:'El usuario ya existe'
        })
    }

    const salt =  bcryptjs.genSaltSync(10);
    const passEncrypt=bcryptjs.hashSync(password,salt);

    Usuarios.create({ nombre:nombre,
        email:email,
        password:passEncrypt,
        rol:rol,
        estado:estado})
    .then(()=>{
        res.json({
            ok:true,
            msg:'Usuario creado correctamente!!'
        })
    })
    .catch(error=>{
        return res.status(400).json({
            ok:false,
            error
        })
    });
       
}

export const putUsuario =async (req:Request, res:Response) => {
    const {id}=req.params;
    const {nombre, email, password,rol,estado} = req.body;

    try {
        const user= await Usuarios.scope('withoutPassword').findByPk(id);

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:'El usuariono existe'
            })
        }
    
        
        const salt =  bcryptjs.genSaltSync(10);
        const passEncrypt=bcryptjs.hashSync(password,salt);
        const updateUser = await Usuarios.update({
            nombre:nombre,
            email:email,
            password:passEncrypt,
            rol:rol,
            estado:estado
        },{
            where:{
                id:id
            }
        });



        res.json({
            ok:true,
            updateUser
        })
    } catch (error) {
        return  res.status(400).json({
            ok:false,
            msg:'Error al actualizar el usuario',
            error
        })
    }


}

export const deleteUsuario =async (req:Request, res:Response) => {
    
    const {id}=req.params;

    try {

        const user= await Usuarios.scope('withoutPassword').findByPk(id);

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:'El usuariono existe'
            })
        }

        const usuario = await Usuarios.destroy({
            where:{
                id:id
            }
        });

        res.json({
            ok:true,
            mgs:'Usuario eliminado.',
            usuario
        })
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Error al eliminar el usuario',
            error
        })
    }
}

export const login = async (req:Request, res:Response) => {
    const {correo, contrasena}= req.body;
    
    try {

        
            //TODO: VERIFICAR EL EMAEL
            const usuario = await Usuarios.findOne({
                where:{
                    email:correo
                }
            });

            const {estado} = usuario?.dataValues;

            if(!usuario){
                return res.status(400).json({
                    ok:false,
                    msg:'Usuario o Contraseña no son válidos!!'
                });
            }
    
            //TODO: VERIFICAR SI EL USUARIO ESTA ACTIVO
            
            if(estado==false){
                return res.status(400).json({
                    ok:false,
                    msg:'Usuario Invalido'
                });
            }
    
            //TODO: VERIFICAR LA CONTRASEÑA
            
            const validPassword= bcryptjs.compare(contrasena,usuario.dataValues.password);
            if(!validPassword){
                return res.status(400).json({
                    ok:false,
                    msg:'Usuario o Contraseña no son válidos-pass'
                });
            }
    
            //TODO: GENERAR EL JWT
    
            const token = await generarToken(usuario.dataValues.id);
    
            
    
            res.json({
                ok:true,
                usuario,
                token
            })
       
    
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Error al Autenticarse',
           
        })
    }
}



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





