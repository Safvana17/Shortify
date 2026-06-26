import { z } from 'zod'

export const userRegisterSchema = z.object({
    name: z
       .string()
       .trim()
       .min(1, 'Name is required')
       .max(50, 'Name must be atmost 50 characters')
       .regex(/^[A-Za-z]+( [A-Za-z]+)*$/),
    email: z
       .string()
       .trim()
       .min(1, 'Email is required')
       .email('Invalid email address'),
    password: z
       .string()
       .trim()
       .min(8, 'Password must conatin atleast 6 characters')
       .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%*&?])[a-zA-Z\d!@$%*&?]{8,}$/),
    confirmPassword: z
       .string()  
})
.refine(data => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword']
})

export const userVerifyOtpSchema = z.object({
   email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email address'),
   otp: z
      .string()
      .trim()
      .regex(/^\d{6}$/, 'OTP must contain only numbers')
      .min(6, "OTP must be exactly 6 digit")  
})
