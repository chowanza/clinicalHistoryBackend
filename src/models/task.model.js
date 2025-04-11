import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true

    }
}, {
    timestamps: true
})

export default mongoose.model("Task", taskSchema);