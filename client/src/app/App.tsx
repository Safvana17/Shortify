import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Home from '../presentation/pages/home/Home'
import Signup from '../presentation/pages/auth/Signup'
import Login from '../presentation/pages/auth/Login'
import VerifyOtp from '../presentation/pages/auth/VerifyOtp'
import { Toaster } from 'react-hot-toast'
import Dashboard from '../presentation/pages/user/Dashboard'
import PublicRoute from '../components/publicRoutes'
import PrivateRoute from '../components/PrivateRoute'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import { checkAuth } from '../redux/slices/authSlice'
import UrlRedirect from '../presentation/pages/user/UrlRedirect'

const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  
  return (
    <BrowserRouter>
      <Toaster position='top-center' />
      <Suspense fallback={
        <div className='flex h-screen items-center justify-content'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-600'></div>
        </div>
       }>
       <Routes>
          <Route path={ROUTES.PUBLIC.HOME} element={<PublicRoute><Home /></PublicRoute>} />
          <Route path={ROUTES.PUBLIC.SIGNUP} element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path={ROUTES.PUBLIC.LOGIN} element={ <PublicRoute><Login /></PublicRoute> } />
          <Route path={ROUTES.PUBLIC.VERIFY_OTP} element={<PublicRoute><VerifyOtp /></PublicRoute>} />
          <Route path={ROUTES.USER.DASHBOARD} element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path={ROUTES.USER.URL_REDIRECT} element={<UrlRedirect />} />
       </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
