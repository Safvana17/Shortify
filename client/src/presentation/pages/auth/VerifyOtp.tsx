import React,{useState,useEffect} from "react";
import Logo from "../../components/Logo";
import { ROUTES } from "../../../constants/routes";
import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../../../redux/store";


const VerifyOtp: React.FC =()=>{

    const [time, setTime] = useState(120)
    // const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
    // const dispatch = useDispatch<AppDispatch>()
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
            <div className="flex justify-center gap-4 mt-8">
            { [1,2,3,4,5,6].map(i=>(
                <input
                    key={i}
                    maxLength={1}
                    className="w-14 h-14 border rounded-lg text-center text-xl outline-none"
                />
            ))}
            </div>
            <p className="mt-6 text-gray-600">
                Time remaining: <span className="text-indigo-600 font-semibold ml-2">{formatTime(time)}</span>
            </p>
            <button
                disabled={time!==0}
                className={`cursor-pointer mt-5 w-full py-3 rounded-lg text-white ${time===0 ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-400"}`}>
                Resend OTP
            </button>
            <button className="cursor-pointer mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                Verify
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