import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // confirmPassword no se almacena, solo se usa para validación
}, {
    timestamps: true
});

export default mongoose.model("Doctor", doctorSchema);