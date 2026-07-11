import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'


interface InputProps {
    type?: string
    value: string
    placeholder: string
    error?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    showPasswordToggle?: boolean
}

const Input: React.FC<InputProps> = ({
    type = "text",
    value,
    placeholder,
    error,
    onChange,
    showPasswordToggle = false
}) => {

  const [showPassword, setShowPassword] = useState(false)
  const inputType = showPasswordToggle && showPassword ? 'text' : type

  return (
    <div className='relative'>
      <input 
        type={inputType}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='w-full border-b p-3 outline-none'
      />
      {showPasswordToggle && (
        <button type='button' className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" onClick={() => setShowPassword((prev) => !prev)} >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      { error && (
        <p className='text-red-400 text-xs mt-1'>{error}</p>
      )}
    </div>
  )
}

export default Input
