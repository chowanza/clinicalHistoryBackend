import Doctor from '../models/doctor.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {nombre, correo, clave} = req.body;
    
    try{

        const claveHash = await bcrypt.hash(clave, 10)
        const newDoctor = new Doctor({
            nombre, 
            correo, 
            clave: claveHash,
        });

        const doctorSaved = await newDoctor.save();
        const token = await createAccessToken({id: doctorSaved._id})
        res.cookie('token', token)
        res.json({
            id: doctorSaved._id,
            nombre: doctorSaved.nombre,
            correo: doctorSaved.correo,
            updatedAt: doctorSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}
export const login =  (req, res) => res.send('login');