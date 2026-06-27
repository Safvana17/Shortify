import React, { useState } from "react";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { userLoginSchema } from "../../../lib/validation/authValidator";
import { ZodError } from "zod";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { login } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";


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
        if(!validate) return false
        try {
            await dispatch(login(formData)).unwrap()
            toast.success('Welcome Back!')
            navigate(ROUTES.USER.DASHBOARD)
        } catch (error) {
            toast.error(typeof error === 'string' ? error : 'User login failed')
        }
    }

return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center">
        <div className="mt-20">
            <Logo/>
        </div>
        <div className="mt-10 w-[550px] bg-white rounded-2xl shadow-xl border p-8">
            <h1 className="text-3xl text-center font-semibold">
                Welcome back
            </h1>
            <p className="text-center mt-3 text-gray-500">
                Enter your credentials to access your account
            </p>
            <div className="mt-8 space-y-6">
                <input
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-b p-3 outline-none"
                    placeholder="Email"
                />
                {error.email && <p className='text-[#FBBEBE] text-xs mt-1'>{error.email}</p>}
                <input
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    type="password"
                    className="w-full border-b p-3 outline-none"
                    placeholder="Password"
                />
                {error.password && <p className='text-[#FBBEBE] text-xs mt-1'>{error.password}</p>}
                <button 
                    className="cursor-pointer w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <p className="text-center text-gray-600">
                    Don't have an account? <span className="text-indigo-600 cursor-pointer" onClick={() => navigate(ROUTES.PUBLIC.SIGNUP)}>Sign up</span>
                </p>
            </div>
        </div>
        <p className="mt-12 cursor-pointer" onClick={() => navigate(ROUTES.PUBLIC.HOME)}>
            ← Back to home
        </p>
    </div>
)}


export default Login;