import React from "react";
import Logo from "../../components/Logo";


const Login: React.FC = ()=>{


return (

<div className="min-h-screen bg-gradient-to-br from-indigo-50
                via-white to-purple-50 flex flex-col items-center">


<div className="mt-20">
<Logo/>
</div>



<div className="mt-10 w-[550px] bg-white rounded-2xl
shadow-xl border p-8">


<h1 className="text-3xl text-center font-semibold">
Welcome back
</h1>


<p className="text-center mt-3 text-gray-500">
Enter your credentials to access your account
</p>




<div className="mt-8 space-y-6">


<input
className="w-full border-b p-3 outline-none"
placeholder="Email"
/>



<input
type="password"
className="w-full border-b p-3 outline-none"
placeholder="Password"
/>



<div className="flex justify-between">


<label className="flex gap-2 text-gray-600">

<input type="checkbox"/>

Remember me

</label>



<span className="text-indigo-600">
Forgot password?
</span>


</div>




<button
className="w-full py-3 rounded-lg text-white
font-semibold bg-gradient-to-r from-indigo-500 to-purple-600"
>

Login

</button>




<p className="text-center text-gray-600">

Don't have an account?

<span className="text-indigo-600">
Sign up
</span>

</p>


</div>


</div>




<p className="mt-12">
← Back to home
</p>


</div>


)

}


export default Login;