import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { userRegisterSchema } from "../../../lib/validation/authValidator";
import { ZodError } from 'zod'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { registerUser } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState<Record<string, string>>({})

    const validate = () => {
        try {
            userRegisterSchema.parse(formData)
            setError({})
            return true
        } catch (error) {
            if(error instanceof ZodError){
                const errors: Record<string, string> = {}
                error.issues.forEach((issue) => {
                    const field = issue.path[0]
                    if(typeof field === 'string' || typeof field === 'number') {
                        errors[field] = issue.message
                    }
                })
                setError(errors)
            }
            return false
        }
    }

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault()
        if(!validate()) return
        try {
          await dispatch(registerUser(formData)).unwrap()
          toast.success('User Registered successfully')
          navigate(ROUTES.PUBLIC.VERIFY_OTP, { state: { email: formData.email}})
        } catch (error) {
          toast.error(typeof error === 'string' ? error : 'Failed to register user')
        }
    }
return (
    <AuthLayout title="Create an Account" subtitle="Enter your details to get started with shortify">
        <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <Input 
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                error={error.name}
            />
            <Input 
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={error.email}
            />
            <Input 
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={error.password}
                showPasswordToggle
            />
            <Input 
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                error={error.confirmPassword}
                showPasswordToggle
            />
            <Button
                type="submit"
            >
                Login
            </Button>
            <p className="text-center text-gray-600">
                Already have an account? <span className="text-indigo-600 ml-1 cursor-pointer" onClick={() => navigate(ROUTES.PUBLIC.LOGIN)}>Login</span>
            </p>
        </form>
    </AuthLayout>
)}


export default Signup;