import {z} from 'zod'

export const registerSchema = z.object({
    firstName: z.string({
        required_error: 'First Name is required',
    }),
    lastName: z.string({
        required_error: 'Last Name is required',
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters'
    }),
    confirmPassword: z.string({
        required_error: 'Confirm Password is required'
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"] // Esto muestra el error en el campo confirmPassword
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: 'Invalid email',
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: 'Password must be at least 6 characters'
    }),
});

