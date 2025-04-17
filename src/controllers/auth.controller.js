import Doctor from '../models/doctor.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    
    try {
        const userFound = await Doctor.findOne({email});
        if (userFound) return res.status(400).json(['The email is already in use']);
        const passwordHash = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            firstName, 
            lastName,
            email,
            password: passwordHash, // Solo guardamos el hash de la contraseña
        });

        const doctorSaved = await newDoctor.save();
        const token = await createAccessToken({id: doctorSaved._id});
        res.cookie('token', token);
        res.json({
            id: doctorSaved._id,
            firstName: doctorSaved.firstName,
            lastName: doctorSaved.lastName,
            email: doctorSaved.email,
            updatedAt: doctorSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    
    try{

        const doctorFound = await Doctor.findOne({email});
        if (!doctorFound) return res.status(400).json({message: 'Usuario no encontrado'});
        const isMatch = await bcrypt.compare(password, doctorFound.password);
        if (!isMatch) return res.status(400).json({message: 'Contraseña incorrecta'});
        
        const token = await createAccessToken({id: doctorFound._id});
        res.cookie('token', token);
        res.json({
            id: doctorFound._id,
            fistName: doctorFound.firstName,
            lastName: doctorFound.lastName,
            email: doctorFound.email,
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

    res.json({
        id: doctorFound._id,
        firstName: doctorFound.firstName,
        lastName: doctorFound.lastName,
        email: doctorFound.email,
        updatedAt: doctorFound.updatedAt,
        createdAt: doctorFound.updatedAt
    });


};