import React, { useState } from "react";
import Logo from "../../components/Logo"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { userRegisterSchema } from "../../../lib/validation/authValidator";
import { ZodError } from 'zod'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { registerUser } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center">
        <div className="mt-10">
            <Logo/>
        </div>
        <div className="mt-10 w-[550px] bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl text-center font-semibold">
                Create an account
            </h1>
            <p className="text-center text-gray-500 mt-3">
                Enter your details to get started with Shortify
            </p>
            <div className="mt-8 space-y-5">
                <input
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-b p-3 outline-none"
                    placeholder="Name"
                />
                {error.name && <p className='text-[#FBBEBE] text-xs mt-1'>{error.name}</p>}
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
                <input
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    type="password"
                    className="w-full border-b p-3 outline-none"
                    placeholder="Confirm Password"
                />
                {error.confirmPassword && <p className='text-[#FBBEBE] text-xs mt-1'>{error.confirmPassword}</p>}
                <button 
                    className="cursor-pointer w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600"
                    onClick={handleRegister}
                >
                    Create Account
                </button>
                <p className="text-center text-gray-600">
                    Already have an account? <span className="text-indigo-600 ml-1 cursor-pointer" onClick={() => navigate(ROUTES.PUBLIC.LOGIN)}>Login</span>
                </p>
            </div>
        </div>
        <p 
           className="mt-12 text-gray-600 cursor-pointer"
           onClick={() => navigate(ROUTES.PUBLIC.HOME)}
        >
            ← Back to home
        </p>
    </div>
)}


export default Signup;