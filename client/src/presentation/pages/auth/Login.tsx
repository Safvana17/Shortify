import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { userLoginSchema } from "../../../lib/validation/authValidator";
import { ZodError } from "zod";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { login } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";


const Login: React.FC = ()=>{
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState<Record<string, string>>({})
    const dispatch = useDispatch<AppDispatch>()

    const validate = () => {
        try {
            userLoginSchema.parse(formData)
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!validate()) return false
        try {
            await dispatch(login(formData)).unwrap()
            toast.success('Welcome Back!')
            navigate(ROUTES.USER.DASHBOARD)
        } catch (error) {
            toast.error(typeof error === 'string' ? error : 'User login failed')
        }
    }

return (
    <AuthLayout 
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
    >
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
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
            <Button 
                type="submit"
            >
                Login
            </Button>
            <p className="text-center text-gray-600">
                Don't have an account? <span className="text-indigo-600 cursor-pointer" onClick={() => navigate(ROUTES.PUBLIC.SIGNUP)}>Sign up</span>
            </p>
        </form>
    </AuthLayout>
)}


export default Login;