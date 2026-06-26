import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Home from '../presentation/pages/home/Home'
import Signup from '../presentation/pages/auth/Signup'
import Login from '../presentation/pages/auth/Login'
import VerifyOtp from '../presentation/pages/auth/VerifyOtp'
import { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-center' />
       <Routes>
          <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
          <Route path={ROUTES.PUBLIC.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.PUBLIC.LOGIN} element={ <Login /> } />
          <Route path={ROUTES.PUBLIC.VERIFY_OTP} element={<VerifyOtp />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
