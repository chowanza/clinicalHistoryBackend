import Doctor from '../models/doctor.model.js';

export const register = async (req, res) => {
    const {nombre, correo, clave} = req.body;
    
    try{
        const newDoctor = new Doctor({
            nombre, 
            correo, 
            clave
        });
        const doctorSaved = await newDoctor.save();
        res.json(doctorSaved)
    } catch (error) {
        console.log(error);
    }

}
export const login =  (req, res) => res.send('login');