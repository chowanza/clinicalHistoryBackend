import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    clave: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

export default mongoose.model("Doctor", doctorSchema);