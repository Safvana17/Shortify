import React, { useState, useEffect, useRef} from "react";
import Logo from "../../components/Logo";
import { ROUTES } from "../../../constants/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import { resendOtp, verifyOtp } from "../../../redux/slices/authSlice";



const VerifyOtp: React.FC =()=>{

    const [time, setTime] = useState(120)
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
    const dispatch = useDispatch<AppDispatch>()
    const inputRef = useRef<(HTMLInputElement | null)[]>([])
    const { loading } = useSelector((state: RootState) => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state?.email

    useEffect(() => {
        if(!email) {
            navigate(ROUTES.PUBLIC.SIGNUP)
        }
    }, [email, navigate])

    useEffect(()=>{
        if(time <= 0)return

        const timer = setInterval(()=>{
            setTime(prev => prev - 1)
        }, 1000)

        return ()=>clearInterval(timer)
    },[time])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds/60)
        const reminingSeconds = Math.floor(seconds%60)
        return `0${minutes} :${reminingSeconds < 10 ? ' 0' : ' '}${reminingSeconds}`
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value
        if(isNaN(Number(value))) return false

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        if(index < 5 && value){
            inputRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key === 'Backspace'){
            if(otp[index]){
                const newOtp = [...otp]
                newOtp[index] = ''
                setOtp(newOtp)
            }else if(index > 0){
                inputRef.current[index - 1]?.focus()
            }
        }
    }

    const handleSubmit = async() => {
        const otpValue = otp.join('')
        try {
            await dispatch(verifyOtp({email, otp: otpValue})).unwrap()
            toast.success('Your OTP has been verified successfully, Please login to continue')
            navigate(ROUTES.PUBLIC.LOGIN)
        } catch (error) {
            toast.error(typeof error === 'string' ? error : 'Failed to verify otp')
        }
    }

    const handleResendOtp = async() => {
        try {
            await dispatch(resendOtp(email)).unwrap()
            toast.success('OTP Sent successfully, Please check your Email.')
            setTime(120)
        } catch (error) {
            toast.error(typeof error === 'string' ? error : 'Failed to resend otp')
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 6)
        if(!/^\d+$/.test(pasteData)) return 
        const newOtp = pasteData.split('')
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')])
        inputRef.current[Math.min(pasteData.length, 5)]?.focus()
    }

return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center">
        <div className="mt-20">
            <Logo/>
        </div>
        <div className="mt-10 w-[550px] bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-3xl font-semibold">
                Verify OTP
            </h1>
            <p className="text-gray-500 mt-3">
                Enter the 6 digit code sent to your email
            </p>
            <div className='flex justify-between gap-3'>
            { otp.map((data, index) => (
                <input 
                key={index}
                ref={(el) => {inputRef.current[index] = el}}
                type='text'
                data-index={index}
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e, index)}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className='w-12 h-14 bg-white border mt-5 border-gray-300 rounded-md text-center text-2xl font-bold text-black focus:outline-none transition focus:border-[#5C3C02]'
                />
            ))}
            </div>
            <p className="mt-6 text-gray-600">
                Time remaining: <span className="text-indigo-600 font-semibold ml-2">{formatTime(time)}</span>
            </p>
            <button
                onClick={handleResendOtp}
                disabled={time!==0}
                className={`cursor-pointer mt-5 w-full py-3 rounded-lg text-white ${time===0 ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-400"}`}>
                Resend OTP
            </button>
            <button 
                onClick={handleSubmit}
                className="cursor-pointer mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
                {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
        </div>
        <p 
            className="mt-12 cursor-pointer"
            onClick={() => navigate(ROUTES.PUBLIC.HOME)}
        >
            ← Back to home
        </p>
    </div>
)
}



export default VerifyOtp;