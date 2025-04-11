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

};

export const login = async (req, res) => {
    const {correo, clave} = req.body;
    
    try{

        const doctorFound = await Doctor.findOne({correo});
        if (!doctorFound) return res.status(400).json({message: 'Usuario no encontrado'});
        const isMatch = await bcrypt.compare(clave, doctorFound.clave);
        if (!isMatch) return res.status(400).json({message: 'Contraseña incorrecta'});
        
        const token = await createAccessToken({id: doctorFound._id});
        res.cookie('token', token);
        res.json({
            id: doctorFound._id,
            nombre: doctorFound.nombre,
            correo: doctorFound.correo,
            updatedAt: doctorFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};

export const logout = async (req, res) => {
    try {
        res.cookie('token', "", {
            expires: new Date(0)
        });
        res.json({message: 'Logout exitoso'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const profile = async (req, res) => {
    
    const doctorFound = await Doctor.findById(req.decoded.id)

    if (!doctorFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: doctorFound._id,
        nombre: doctorFound.nombre,
        correo: doctorFound.correo,
        createdAt: doctorFound.createdAt,
        updatedAt: doctorFound.updatedAt
    });

    res.send("profile");

};