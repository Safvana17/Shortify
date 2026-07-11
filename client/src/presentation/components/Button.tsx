import React from 'react'


interface ButtonProps {
    children: React.ReactNode;
    type: "button" | "submit" | "reset"
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type= "button"}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='cursor-pointer w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600'
    >
        {children}
    </button>
  )
}

export default Button
